<template>
  <el-card class="cardBox">
    <CusBread level1="权限管理" level2="角色列表"></CusBread>
    <el-button type="primary" class="btn">添加角色</el-button>
    <el-table :data="list" style="width: 100%" class="tableBox">
      <el-table-column type="expand" width="80">
        <template slot-scope="scope">
          <el-row v-for="(item1) in scope.row.children" :key="item1.id">
            <el-col :span="4">
              <el-tag
                @close="deleRights(scope.row,item1)"
                closable
                type="success"
              >{{item1.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2) in item1.children" :key="item2.id">
                <el-col :span="4">
                  <el-tag
                    @close="deleRights(scope.row,item2)"
                    closable
                    type="warning"
                  >{{item2.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    @close="deleRights(scope.row,item3)"
                    type="info"
                    v-for="(item3) in item2.children"
                    :key="item3.id"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length===0">
            <span>未分配权限</span>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            plain
            @click="showUsersEdie(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            plain
            @click="showdeleteUsers(scope.row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            size="mini"
            plain
            @click="showUsersSelect(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog title="角色分配" :visible.sync="dialogFormVisible">
      <el-tree
        :data="treeList"
        node-key="id"
        ref="treeDom"
        show-checkbox
        :default-checked-keys="arrcheck"
        :props="defaultProps"
        default-expand-all
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRights()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],

      dialogFormVisible: false,
      treeList: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      arrcheck: [],
      currId: ""
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    async setRights() {
      const arr1 = this.$refs.treeDom.getCheckedKeys();
      const arr2 = this.$refs.treeDom.getHalfCheckedKeys();
      const arr = [...arr1, ...arr2];
      console.log(arr, this.currId);
      const res = await this.$http.post(`roles/${this.currId}/rights`, {
        rids: arr.join(",")
      });
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.dialogFormVisible = false;
        this.$message.success(msg);
        this.getRolesList();
      }
    },
    async showUsersSelect(roles) {
      this.currId = roles.id;
      this.dialogFormVisible = true;
      const res = await this.$http.get(`rights/tree`);
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.treeList = data;
        const temp2 = [];
        roles.children.forEach(item1 => {
          //   temp2.push(item1.id);
          item1.children.forEach(item2 => {
            // temp2.push(item2.id);
            item2.children.forEach(item3 => {
              temp2.push(item3.id);
            });
          });
        });
        this.arrcheck = temp2;
      }
    },
    async deleRights(roles, rigths) {
      const res = await this.$http.delete(
        `roles/${roles.id}/rights/${rigths.id}`
      );
      console.log(res);
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        roles.children = data;
      }
    },
    async getRolesList() {
      const res = await this.$http.get("roles");
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.list = data;
      }
    }
  }
};
</script>

<style>
.cardBox {
  width: 100%;
  margin-top: 20px;
}
.btn {
  margin-top: 20px;
}
</style>
