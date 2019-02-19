<template>
  <el-card class="box">
    <CusBread level1="商品管理" level2="商品列表"></CusBread>
    <el-alert title="添加商品信息" type="info" center show-icon class="alert"></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="active*1" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- tab切换 -->
    <el-form :model="form" class="form" label-position="top" label-width="80px">
      <el-tabs tab-position="left" v-model="active" @tab-click="changeTab()">
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              clearable
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions"
              :props="defaultProp"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数" @click="getmanyList()">
          <el-form-item :label="item.attr_name" v-for="(item) in arrDy" :key="item.attr_id">
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox border :label="item2" v-for="(item2,i) in item.attr_vals" :key="i"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">3</el-tab-pane>
        <el-tab-pane name="4" label="商品图片">4</el-tab-pane>
        <el-tab-pane name="5" label="商品内容">5</el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      active: "1",
      form: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: "",
        attrs: ""
      },
      arrDy: [],
      selectedOptions: [1, 3, 6],
      options: [],
      defaultProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      checkList: []
    };
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
    async changeTab() {
      const res = await this.$http.get(
        `categories/${this.selectedOptions[2]}/attributes?sel=many`
      );
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.arrDy = data;
        this.arrDy.forEach(item => {
          item.attr_vals =
            item.attr_vals.trim().length === 0
              ? []
              : item.attr_vals.trim().split(",");
        });
      }

      console.log(this.arrDy);
    },
    handleChange() {},
    async getGoodsCate() {
      const res = await this.$http.get(`categories?type=3`);
      console.log(res);
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
.alert {
  margin-top: 20px;
  margin-bottom: 20px;
}
.box {
  height: 100%;
}
.form {
  overflow: auto;
  margin-top: 20px;
  height: 350px;
}
</style>
