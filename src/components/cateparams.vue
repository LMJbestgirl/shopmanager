<template>
  <el-card class="box">
    <cus-bread level1="商品管理" level2="分类参数"></cus-bread>
    <el-alert class="alert" title="注意:只允许为第三级分类设置参数" type="warning" show-icon></el-alert>
    <!-- 级联 -->
    <el-form :model="form" class="form" label-position="left" label-width="120px">
      <el-form-item label="请选择商品分类">
        {{selectedOptions}}
        <el-cascader
          clearable
          :show-all-levels="false"
          expand-trigger="hover"
          :options="options"
          :props="defaultProp"
          v-model="selectedOptions"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>

      <!-- tabs -->
      <el-tabs type="border-card" v-model="active" @tab-click="changeTab()">
        <el-tab-pane label="动态参数" name="1">
          <el-button disabled>设置动态参数</el-button>

          <!-- 表格 -->
          <el-table height="450px" border stripe :data="arrDy" style="width: 100%">
            <el-table-column type="expand" width="120">
              <template slot-scope="scope">
                <el-tag
                  :key="i"
                  v-for="(item,i) in scope.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(scope.row,item)"
                >{{item}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index" label="#" width="120"></el-table-column>
            <el-table-column prop="attr_name" label="属性名称"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="静态参数" name="2">
          <el-table height="350px" border stripe :data="arrStatic" style="width: 100%">
            <el-table-column type="index" label="#" width="120"></el-table-column>

            <el-table-column prop="attr_name" label="属性名称"></el-table-column>
            <el-table-column prop="attr_vals" label="属性值"></el-table-column>

            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      options: [],
      selectedOptions: [],
      defaultProp: {
        label: "cat_name",
        value: "cat_id"
      },
      active: "1",
      arrDy: [],
      arrStatic: [],
      inputVisible: false,
      inputValue: ""
    };
  },
  created() {
    this.getarrDylist();
  },
  methods: {
    async changeTab() {
      this.getDyorStatic();
    },
    async handleClose(obj, item) {
      obj.attr_vals.splice(obj.attr_vals.indexOf(item), 1);
      const res = await this.$http.put(
        `categories/${this.selectedOptions[2]}/attributes/${obj.attr_id}`,
        {
          attr_name: obj.attr_name,
          attr_sel: obj.attr_sel,
          attr_vals: obj.attr_vals.join(",")
        }
      );
      const {
        meta: { msg, status }
      } = res.data;
      if (status == 200) {
        this.$message.success(msg);
      }
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    async handleInputConfirm(obj) {
      let inputValue = this.inputValue;
      if (inputValue) {
        obj.attr_vals.push(inputValue);
      }
      const res = await this.$http.put(
        `categories/${this.selectedOptions[2]}/attributes/${obj.attr_id}`,
        {
          attr_name: obj.attr_name,
          attr_sel: obj.attr_sel,
          attr_vals: obj.attr_vals.join(",")
        }
      );
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    async getDyorStatic() {
      if (this.selectedOptions.length !== 3) {
        this.$message.warning("请选择三级分类!!");
        if (this.active === "1") {
          this.arrDy = [];
        }
        if (this.active === "2") {
          this.arrStatic = [];
        }
        return;
      }
      if (this.active === "1") {
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        const {
          meta: { msg, status },
          data
        } = res.data;
        if (status === 200) {
          this.arrDy = data;
          // console.log(this.arrDy);?
          this.arrDy.forEach(item => {
            item.attr_vals =
              item.attr_vals.trim().length === 0
                ? []
                : item.attr_vals.trim().split(",");
          });
        }
      }

      if (this.active === "2") {
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=only`
        );
        console.log(res);
        const {
          meta: { msg, status },
          data
        } = res.data;
        if (status === 200) {
          this.arrStatic = data;
          console.log("静态参数数组--");
          console.log(this.arrStatic);
        }
      }
    },
    async handleChange() {
      this.getDyorStatic();
    },

    async getarrDylist() {
      const res = await this.$http.get(`categories?type=3`);
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.options = data;
      }
    }
  }
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
