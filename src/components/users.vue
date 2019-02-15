<template>
  <el-card class="cardBox">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="#">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="seacherInput">
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="info" plain class="btn">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="姓名" width="180"></el-table-column>
      <el-table-column prop="username" label="日期" width="180"></el-table-column>
      <el-table-column prop="email" label="日期" width="180"></el-table-column>
      <el-table-column prop="mobile" label="日期" width="180">
        <template slot-scope="scope">
          <el-table-column prop="name" label="日期" width="180">{{scope.row.create_time | fmtDate}}</el-table-column>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="日期" width="180"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      query: "",
      pagenum: 1,
      pagesize: 2,
      formData: {
        username: "",
        email: "",
        id: "",
        mobile: ""
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const AUTH_TOKEN = localStorage.getItem("token");
      console.log(AUTH_TOKEN);
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      console.log(res);
      //  create_time: 1486720211
      // email: "adsfad@qq.com"
      // id: 500
      // mg_state: true
      // mobile: "12345678"
      // role_name: "主管"
      // username:
      const {
        data,
        meta: { msg, status }
      } = res.data;
      this.list = data.users;
    }
  }
};
</script>

<style>
.cardBox {
  height: 100%;
}
.seacherInput {
  margin-top: 30px;
}
.input-with-select {
  width: 350px;
}
.btn {
  width: 100px;
}
</style>
