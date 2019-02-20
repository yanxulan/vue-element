<template>
    <div class="header-app">
        <el-menu :default-active="activeIndex" class="el-menu-header" mode="horizontal" background-color="#409EFF" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
            <el-menu-item :index="String(index)" v-for="(item, index) in navArr" :key="item.id">{{item.authorityName}}</el-menu-item>
        </el-menu>
        <el-dropdown class="header-center" trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                个人中心<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="changePsd">修改密码</el-dropdown-item>
                <el-dropdown-item command="longinOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: 'headerApp',
        props: ["navArr"],
        data (){
            return {
                activeIndex: '0'
            }
        },
        mounted() {
        },
        methods: {
            handleSelect(key, keyPath) {
                this.$emit("left-aside", this.navArr[Number(key)]);
            },
            handleCommand(val){
                if(val == 'longinOut'){  // 退出登录
                    this.$confirm('是否确定退出登录?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.push("/");
                        this.$message({
                            type: 'success',
                            message: '退出登录成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });          
                    });
                }else if(val == 'changePsd'){  // 修改密码

                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .header-app {
        width: 100%;
        height:60px;
        background-color: #409EFF;
        padding: 0 40px;
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-end;
        align-items: center;
        .el-menu-header{
            background-color: #409EFF;
            border-bottom: none;
        }
        .header-center{
            margin-left: 80px;
            color: #fff;
            font-size: 14px;
        }
    }
</style>
