<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%;"
                :header-cell-style="headClass"
                :cell-style="rowClass">
            <el-table-column
                    prop="id"
                    label="id" style="text-align: center">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="证书名称">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态">
            </el-table-column>
            <el-table-column
                    prop="count"
                    label="扣除共有池">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="添加时间">
            </el-table-column>
            <el-table-column
                    prop="expireTime"
                    label="过期时间">
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="备注">
            </el-table-column>
            <el-table-column
                    prop="md5"
                    label="开始签名">
                <template slot-scope="scope">
                    <el-button  @click="sign(scope.row.md5)"  type="text" size="small">开始签名</el-button>
                </template>
            </el-table-column>

            <el-table-column
                    prop="md5"
                    label="操作" v-if="admin">
                <template slot-scope="scope">
                    <el-button  @click="editDgf(scope.row)" type="text" icon="el-icon-edit" size="small">编辑</el-button>
                    <el-button  @click="deleteCert(scope.row.md5)" type="text"  icon="el-icon-delete" size="small">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination
                style="text-align: center;margin-top: 20px"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[5, 40, 80, 100]"
                :page-size="count"
                layout="total, sizes, prev, pager, next, jumper"
                :page-count="pages"
                :total="total">
        </el-pagination>

        <el-dialog
                :visible.sync="dialogVisible"
                center
                width="30%">
            <span slot="footer" class="dialog-footer">
                <el-upload
                        :data="data"
                        :on-success="success"
                        class="uploadHead"
                        with-credentials
                        drag
                        :action="this.$http.defaults.baseURL + '/EnterpriseSign/uploadIpa'"
                        name="ipa"
                        accept=".ipa"
                        :multiple="false">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传ipa文件，且不超过2048MB</div>
            </el-upload>
           </span>
        </el-dialog>

        <el-dialog
                :visible.sync="editDg"
                width="30%">
            <el-form status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="证书名" >
                    <el-input type="account" v-model="cert.name" :disabled="true" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所需公有池">
                    <el-input v-model="cert.count" oninput="cert.count=value.replace(/[^(\-)0-9]/g,'')"   placeholder="请输入内容" ></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="cert.remark" oninput="cert.remark"   placeholder="请输入内容" ></el-input>
                </el-form-item>

            </el-form>
            <el-button @click="editDg = false">取 消</el-button>
            <el-button type="primary" @click="editF()">确定</el-button>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        created() {
            this.update(this.page,this.count);
            const user = JSON.parse(window.sessionStorage.getItem('user'))
            console.log(user)
            if(user.type == 0){
                this.admin = false
            }else {
                this.admin = true
            }
        },
        methods: {
            editDgf(cert){
              this.cert = cert
              this.editDg = true
            },
            deleteCert(md5){
                var that = this
                this.$http.post('/EnterpriseSign/deleteCert?md5=' + md5)
                    .then(function (response) {
                        that.$load(0)
                        if(response.data.code == 0){
                            that.update(that.page,that.count);
                            that.$message.success(response.data.message)
                        }else {
                            that.$message.error(response.data.message)
                        }
                    })
            },
            editF(){
                this.editDg = false
                var that = this
                this.$http.post('/EnterpriseSign/edit?remark=' + this.cert.remark + '&count=' + this.cert.count  +  '&md5=' + this.cert.md5 )
                    .then(function (response) {
                        that.$load(0)
                        if(response.data.code == 0){
                            that.update(that.page,that.count);
                            that.$message.success(response.data.message)
                        }else {
                            that.$message.error(response.data.message)
                        }
                    })
            },
            sign(md5){
                console.log("md5" + md5)
                var that = this
                this.dialogVisible = true
                this.data.md5 = md5
            },
            handleSizeChange(val) {
                console.log("每页数量" + val)
                this.count = val
                this.update(this.page,this.count);
            },
            handleCurrentChange(val) {
                this.page = val
                this.update(this.page,this.count);
                console.log(`当前页: ${val}`);
            },
            handleClick(row) {
                var that = this
                this.$http.post('/iis/deleIis?iis=' + row)
                    .then(function (response) {
                        that.$load(0)
                        if(response.data.code == 0){
                            that.update(that.page,that.count);
                        }else {
                            that.$message.error(response.data.message)
                        }
                    })
                    .catch(function (error) {
                        that.$load(0)
                        that.$message,error("删除失败")
                    });
            },
            update(pageNum,pageSize){
                var that = this
                that.$load(1,"查询中")
                this.$http.get('/EnterpriseSign/queryAllCert?pageNum=' + pageNum + '&pageSize=' + pageSize)
                    .then(function (response) {
                        that.$load(0)
                        if(response.data.code == 0){
                            console.log(response.data.data)
                            that.tableData = response.data.data
                            that.pages = response.data.pages
                            that.total = response.data.total
                        }else {
                            that.$message.error(response.data.message)
                        }
                    })
                    .catch(function (error) {
                        that.$load(0)
                        that.$message,error("查询失败")
                    });
            },
            headClass() { //表头居中显示
                return "text-align:center"
            },
            rowClass() { //表格数据居中显示
                return "text-align:center"
            },
            success(e){
                if (e.code === 4){
                    this.$message.error(e.message)
                    window.sessionStorage.removeItem("user")
                    this.$router.push("/login")
                }else if(e.code === 0){
                    this.$message.success(e.message)
                    this.dialogVisible = false
                    this.update(this.page,this.count)
                }else {
                    this.dialogVisible = false
                    this.$message.error(e.message)
                }
            }
        },
        data() {
            return {
                tableData: [],
                count: 5,
                page: 1,
                pages: 0,
                total: 1,
                dialogVisible:false,
                url:"",
                data:{md5:''},
                admin:false,
                editDg:false,
                cert:{}
            }
        }
    }
</script>

<style lang="less" >
    .el-pagination{
        .el-input__inner{
            height: 30px;
        }
    }
</style>
