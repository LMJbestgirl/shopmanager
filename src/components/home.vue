<template>
  <el-container class="bigBox">
    <el-header class="hearder">
      <el-row>
        <el-col :span="4">
          <img src="../assets/logo.png" alt="图片加载失败">
        </el-col>
        <el-col :span="19">
          <h2 class="bt">电商后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <a href="#" class="logout" @click.prevent="logout()">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="left">
        <el-menu
          default-active="2"
          :unique-opened="true"
          :router="true"
          class="el-menu-vertical-demo"
        >
          <!-- 1 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>
              用户列表
            </el-menu-item>
          </el-submenu>
          <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              选项1
            </el-menu-item>
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>
              选项1
            </el-menu-item>
          </el-submenu>
          <!-- 3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              选项1
            </el-menu-item>
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>
              选项1
            </el-menu-item>
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>
              选项1
            </el-menu-item>
          </el-submenu>
          <!-- 4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              选项1
            </el-menu-item>
          </el-submenu>
          <!-- 5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统一</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              选项1
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="mian">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  beforeMount() {
    if (!localStorage.getItem("token")) {
      localStorage.clear();
      this.$router.push({
        name: "Login"
      });
      this.$message.warning("请先登录");
    }
  },
  methods: {
    logout() {
      this.$router.push({
        name: "Login"
      });
    }
  }
};
</script>

<style>
.bigBox {
  height: 100%;
  background-color: #b3c0d1;
}
.left {
  background-color: #ffffff;
}
.mian {
  /* background-color: pink; */
}
.bt {
  color: #ffffff;
  text-align: center;
  line-height: 60px;
  height: 60px;
}
.logout {
  line-height: 60px;
  text-decoration: none;
}
</style>
