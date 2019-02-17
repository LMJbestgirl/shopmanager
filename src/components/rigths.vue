<template>
  <el-card>
    <CusBread level1="权限管理" level2="权限列表"></CusBread>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="authName" label="日期" width="180"></el-table-column>
      <el-table-column prop="id" label="姓名" width="180"></el-table-column>
      <el-table-column prop="level" label="地址"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get("rights/list");
      const { data } = res.data;
      console.log(data);
      this.list = data;
    }
  }
};
</script>

<style>
</style>
