<template>
  <div>
    <el-form label-position="top" label-width="80px" :model="formData">
    <h2>用户登录</h2>
      <el-form-item label="邮箱">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.passworld"></el-input>
      </el-form-item>
       <el-button type="primary" plain>主要按钮</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        username: '',
        passworld: ''
      }
    }
  }
}
</script>

<style>
</style>
