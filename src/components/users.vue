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
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select" clearable>
          <el-button slot="append" icon="el-icon-search" @click="searchUsers()"></el-button>
        </el-input>
        <el-button type="info" plain class="btn" @click="showUsers()">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%" class="tableBox" v-loading="loading">
      <el-table-column prop="id" label="id" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="140"></el-table-column>
      <el-table-column label="日期" width="150">
        <template slot-scope="scope">{{scope.row.create_time | fmtDate}}</template>
      </el-table-column>
      <el-table-column label="用户状态" width="140">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="UsersChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="180">
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
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form label-position="left" label-width="80px" :model="formData">
        <el-form-item label="用户名：">
          <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="formData.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="formData.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="电话：">
          <el-input v-model="formData.mobile" placeholder="请输入电话"></el-input>
        </el-form-item>v
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="AddUsers()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form label-position="left" label-width="80px" :model="formData">
        <el-form-item label="用户名：">
          <el-input v-model="formData.username" placeholder="请输入用户名" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="formData.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="电话：">
          <el-input v-model="formData.mobile" placeholder="请输入电话"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="EditUsers()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 下拉框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleSelect">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="用户名">{{userCur}}</el-form-item>
        <el-form-item label="人物角色">
          <el-select v-model="selectVal" placeholder="请选择">
            <el-option label="请选择" value="1"></el-option>
            <el-option
              v-for="item in Userlist"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleSelect = false">取 消</el-button>
        <el-button type="primary" @click="changeRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: true,
      query: "",
      pagenum: 1,
      pagesize: 2,
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleSelect: false,
      formData: {
        username: "",
        email: "",
        password: "",
        mobile: ""
      },
      selectVal: 1,
      total: -1,
      Userlist: [],
      userCur: "",
      usersId: -1
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async showUsersSelect(users) {
      this.usersId = users.id;
      this.userCur = users.username;
      this.dialogFormVisibleSelect = true;
      const res = await this.$http.get(`roles`);
      console.log(res);
      const { data } = res.data;
      this.Userlist = data;
      const res1 = await this.$http.get(`users/${users.id}`);
      console.log(res1);
      const {
        data: { rid }
      } = res1.data;
      console.log(rid);
      this.selectVal = rid;
    },
    async changeRole() {
      const res = await this.$http.put(`users/${this.usersId}/role`, {
        rid: this.selectVal
      });
      console.log(res);
    },
    async UsersChange(users) {
      const res = await this.$http.put(
        `users/${users.id}/state/${users.mg_state}`
      );

      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
      }
    },

    async EditUsers() {
      const res = await this.$http.put(`users/${this.formData.id}`);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        this.dialogFormVisibleEdit = false;
      }
    },
    showUsersEdie(users) {
      this.dialogFormVisibleEdit = true;
      this.formData = users;
    },
    async showdeleteUsers(users) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${users.id}`);
          console.log(res);
          const {
            meta: { msg, status }
          } = res.data;
          if (status === 200) {
            this.pagenum = 1;
            this.$message({
              type: "success",
              message: msg
            });
            this.getList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async AddUsers() {
      const res = await this.$http.post("users", this.formData);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 201) {
        this.dialogFormVisibleAdd = false;
        this.getList();
        this.formData = {};
      }
    },
    showUsers() {
      console.log(1111);
      this.dialogFormVisibleAdd = true;
    },

    searchUsers() {
      this.pagenum = 1;
      this.getList();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagenum = 1;
      this.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getList();
    },
    async getList() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      console.log(res);
      this.loading = false;
      const {
        data,
        meta: { msg, status }
      } = res.data;
      this.list = data.users;
      this.total = data.total;
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
.tableBox {
  margin-bottom: 30px;
}
</style>
