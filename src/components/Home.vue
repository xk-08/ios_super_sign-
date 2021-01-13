<template>
        <el-container style="height: 100%">
            <el-header>
                <div>
                    <img src="../assets/login.jpg" alt="">
                    <span>超级签名分发系统</span>
                </div>
            </el-header>

            <el-container>
                <el-aside width="200px">
                    <el-menu
                            unique-opened
                            router
                            default-active="/Personal"
                            class="el-menu-vertical-demo"
                            background-color="#373d41"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-user"></i>
                                <span>基本操作</span>
                            </template>
                                <el-menu-item index="/Personal">个人中心</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-goods"></i>
                                <span>应用管理</span>
                            </template>
                            <el-menu-item index="/AppAll">应用列表</el-menu-item>
                            <el-menu-item index="/UploadApp">上传应用</el-menu-item>
                            <el-menu-item index="/DownCode">下载密码</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3" >
                            <template slot="title">
                                <i class="el-icon-s-order"></i>
                                <span>证书管理</span>
                            </template>
                            <el-menu-item index="/CertAll">证书列表</el-menu-item>
                            <el-menu-item index="/UploadCert">上传证书</el-menu-item>
                        </el-submenu>
                        <el-submenu index="4" v-if="admin">
                            <template slot="title">
                                <i class="el-icon-s-custom"></i>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item index="/UserAll">用户列表</el-menu-item>
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title">
                                <i class="el-icon-download"></i>
                                <span>下载管理</span>
                            </template>
                            <el-menu-item index="/DownRecord">下载记录</el-menu-item>
                        </el-submenu>
                        <el-submenu index="6" >
                            <template slot="title">
                                <i class="el-icon-present"></i>
                                <span>免签封装</span>
                            </template>
                            <el-menu-item index="/startPack">开始打包</el-menu-item>
                            <el-menu-item index="/PackRecord">打包记录</el-menu-item>
                        </el-submenu>
                        <el-submenu index="7" >
                            <template slot="title">
                                <i class="el-icon-office-building"></i>
                                <span>企业签名</span>
                            </template>
                            <el-menu-item index="/UploadAppSign">开始签名</el-menu-item>
                            <el-menu-item index="/SignRecord">签名记录</el-menu-item>
                            <el-menu-item v-if="admin" index="/UploadEnterpriseCert">上传证书</el-menu-item>
                        </el-submenu>
                        <el-submenu index="8" >
                            <template slot="title">
                                <i class="el-icon-shopping-cart-full"></i>
                                <span>自助分发</span>
                            </template>
                            <el-menu-item index="/SoftwareDistribute">开始分发</el-menu-item>
                            <el-menu-item index="/DistributeRecord">分发记录</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>

        </el-container>
</template>

<script>
    export default {
        name: "Home",
        created() {
            const user = JSON.parse(window.sessionStorage.getItem('user'))
            console.log(user)
            this.account = user.account
            if(user.type == 0){
                this.admin = false
            }else {
                this.admin = true
            }
        },
        data(){
            return{
                admin:false
            }
        }
    }
</script>

<style lang="less" scoped>
.el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #dddddd;
    font-size: 20px;
    > div{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
            margin-left: 15px;
        }
        img{
            height: 100%;
        }
    }
}
.el-aside{
    background-color: #333744;
    .el-menu{
        border-right: none;
    }
}
.el-man{
    background-color: #eaedf1;
}
</style>
