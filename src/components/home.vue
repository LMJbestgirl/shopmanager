<template>
   <el-container class="bigBox">
  <el-header class="hearder">
  <el-row>
  <el-col :span="4">
  <img src="../assets/logo.png" alt="图片加载失败">
  </el-col>
  <el-col :span="19">
  <h2>电商后台管理系统</h2>
  </el-col>
  <el-col :span="1">
  <a href="#" class="logout" @click.prevent="logout()">退出</a>
  </el-col>
</el-row>
  </el-header>
  <el-container>
    <el-aside width="200px" class="left">Aside</el-aside>
    <el-main class="mian">Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  methods: {
    logout () {

    }
  }
}
</script>

<style>
.bigBox {
    height: 100%;
    background-color: #b3c0d1;
}
.left {
    background-color: #666;

}
.mian {
    background-color: pink;

}
h2 {
    color: #ffffff;
    text-align: center;
    line-height: 60px;
    height: 60px;
}
.logout {
line-height: 60px;
text-decoration: none
}
</style>
