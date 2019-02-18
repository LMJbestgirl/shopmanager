<template>
  <el-card>
    <CusBread level1="权限管理" level2="权限列表"></CusBread>
    <el-table :data="list" style="width: 100%" class="tableBox">
      <el-table-column type="expand" width="80"></el-table-column>
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="100"></el-table-column>
      <el-table-column prop="path" label="权限路径" width="140"></el-table-column>
      <el-table-column prop="level" label="权限级别" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">级别一</span>
          <span v-if="scope.row.level==='1'">级别二</span>
          <span v-if="scope.row.level==='2'">级别三</span>
        </template>
      </el-table-column>
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
      const res = await this.$http.get("rights/list");
      console.log(res);
      const { data } = res.data;
      this.list = data;
    }
  }
};
</script>

<style>
</style>
