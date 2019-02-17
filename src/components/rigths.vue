<template>
  <el-card>
    <CusBread level1="权限管理" level2="权限列表"></CusBread>
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
      this.list = data;
    }
  }
};
</script>

<style>
</style>
