<template>
  <div class="body-warp">
    <el-form label-position="top" label-width="80px" :model="formData" class="formBox">
      <h2>用户登录</h2>
      <el-form-item label="邮箱">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button type="primary" plain @click.prevent="loginHome()">主要按钮</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async loginHome () {
      const res = await this.$http.post('login', this.formData)
      if (res.data.data === null) {
        this.$message.error(res.data.meta.msg)
      }
      console.log(res)
      const {
        data: {
          data: { token },
          meta: { msg, status }
        }
      } = res
      console.log(token)
      if (status === 200) {
        console.log('状态码')
        localStorage.setItem('token', token)
        this.$router.push({
          name: 'home'
        })
      } else {
        this.$message.error(msg)
      }
    }
  }
}

</script>

<style>
.body-warp {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: darkslategrey;
}
.formBox {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 5px;
  width: 400px;
}
button {
  width: 100%;
}
</style>
