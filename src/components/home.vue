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
          <el-submenu :index="item.order+''" v-for="(item) in menusList" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="(item2) in item.children" :key="item2.id">
              <i class="el-icon-menu"></i>
              <span>{{item2.authName}}</span>
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
  data() {
    return {
      menusList: []
    };
  },
  beforeMount() {},
  created() {
    this.getMenus();
  },
  methods: {
    async getMenus() {
      const res = await this.$http.get(`menus`);
      console.log(res);
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.menusList = data;
      }
    },
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
