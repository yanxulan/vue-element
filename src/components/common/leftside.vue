<template>
    <el-menu class="leftside-app" :collapse="isCollapse" :router="true" :unique-opened="true" @select="handleSelectMenu">
        <el-submenu :index="item.routerName ? item.routerName : item.id" v-for="(item, index) in leftArr" v-if="item.childAuthorities && item.childAuthorities.length > 0" :key="item.id">
            <template slot="title">
                <img class="nav-icon" :src='item.imageUrl ? require("../../assets/img/leftside/"+ item.imageUrl + ".png") :""' />
                <span>{{item.authorityName}}</span>
            </template>
            <el-menu-item v-for="i in item.childAuthorities" :key="i.id" :index="i.routerName ? i.routerName : i.id">{{i.authorityName}}</el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.routerName ? item.routerName : item.id">
            <img class="nav-icon" :src='item.imageUrl ? require("../../assets/img/leftside/"+ item.imageUrl + ".png") :""' />
            <span slot="title">{{item.authorityName}}</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: 'leftside',
        props: ["leftArr", "isCollapse"],
        data (){
            return {

            }
        },
        mounted() {
			this.$nextTick(function() {
                
            });
        },
        methods: {
            handleSelectMenu(index, indexPath){
                let indexMenu = {};
                this.leftArr.forEach(element => {
					if(element.routerName == index && !element.childAuthorities) {
                        indexMenu = element;
					} else if(element.childAuthorities && element.childAuthorities.length > 0) {
						element.childAuthorities.forEach(e => {
							if(e.routerName == index) {
                                indexMenu = e;
							}
						});
					}
                });
                this.$emit('select-menu', indexMenu);
            }
        }
    }
</script>

<style lang="less" scoped>
    .leftside-app {
        height: 100%;
        .nav-icon{
            width: 16px;
            height: 16px;
            margin-right:10px;
            vertical-align: middle;
        }   
    }
</style>
