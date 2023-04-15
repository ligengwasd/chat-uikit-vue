<template>
    <el-container>
        <el-header>
            <h1>IM & 智能机器人 & 工作流 缝合怪</h1>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu>
                    <el-menu-item index="/home/chat">
                        <router-link to="/home/chat">即时通信</router-link>
                    </el-menu-item>
                    <el-menu-item index="/home/formGenerator">
                        <router-link to="/home/formGenerator">表单设计器</router-link>
                    </el-menu-item>
                    <el-menu-item index="/home/formParser">
                        <router-link to="/home/formParser">表单解析器</router-link>
                    </el-menu-item>
                    <el-menu-item>流程设计器</el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script lang="ts">

</script>

<style lang="scss" scoped>
//.el-header, .el-footer {
//    background-color: #B3C0D1;
//    color: #333;
//    text-align: center;
//    line-height: 60px;
//}
//
//.el-aside {
//    background-color: #D3DCE6;
//    color: #333;
//    text-align: center;
//    line-height: 200px;
//}
//
//.el-main {
//    background-color: #E9EEF3;
//    color: #333;
//    text-align: center;
//    line-height: 160px;
//}
//
//body > .el-container {
//    margin-bottom: 40px;
//}
//
//.el-container:nth-child(5) .el-aside,
//.el-container:nth-child(6) .el-aside {
//    line-height: 260px;
//}
//
//.el-container:nth-child(7) .el-aside {
//    line-height: 320px;
//}
</style>
