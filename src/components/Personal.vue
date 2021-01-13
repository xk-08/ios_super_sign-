<template>
    <div>
        <!--        居中盒子-->
        <div class="center_box">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>用户信息</span>
                    <el-button style="float: right; padding: 3px 10px" type="text" @click="quit">退出</el-button>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">修改密码</el-button>
                </div>
                <div class="text item">
                    账号:  {{account}}
                </div>
                <div class="text item">
                    类型:  {{type}}
                </div>
                <div class="text item">
                    公有池:  {{count}} 台
                </div>
            </el-card>
        </div>

        <!--      修改密码的表单-->
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
            <el-form >
                <el-form-item label="密码">
                    <el-input v-model="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="newPassword" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        created () {
            // const  user = window.sessionStorage.getItem("user")
            // this.account = user.account
            const user = JSON.parse(window.sessionStorage.getItem('user'))
            console.log(user)
            this.account = user.account
            this.count = user.count
            if(user.type == 0){
                this.type = "普通用户"
            }else {
                this.type = "管理员"
            }
        },
        name: 'Personal',
        data () {
            return {
                account: '获取失败',
                type: '获取失败',
                count: '获取失败',
                dialogFormVisible: false,
                password: '',
                newPassword: '',
                formLabelWidth: '120px'
            }
        },
        methods: {
            ok () {
                var that = this
                if (this.password === '' || this.newPassword === '') {
                    that.$message.success('请填写完整信息')
                } else {
                    this.$http.post('/user/updatePassword', 'account=' + this.account + '&password=' + this.password + '&newPassword=' +
                        this.newPassword).then(function (result) {
                        if(result.data.code === 0){
                            that.$message.success(result.data.message)
                            that.$router.push('/login')
                        }else {
                            that.$message.error(result.data.message)
                        }

                    })
                }
            },
            quit () {
                var that = this
                this.$http.get('/user/quit').then(function (result) {
                    that.$message.success(result.data.message)
                    window.sessionStorage.removeItem('user')
                    that.$router.push('/login')
                })
            }
        }
    }
</script>

<style scoped>
    .center_box{

    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
</style>
