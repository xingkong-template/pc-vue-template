<template>
    <div class="login user-bg" @keydown.enter="submit">
        <!-- <img src="@/assets/imgs/user/bg.png"> -->
        <div class="layout-top-nomenu">
            <img src="@/assets/imgs/logo.png" />
            <div class="line">
            </div>
        </div>
        <div class="user-bg-left"></div>
        <div  class="user-content-nologin">
            <el-form ref="form" class="user-form" :model="form" label-width="0">
                <div class="user-tit">
                    <span>用户登录</span>
                    <div class="user-form-error" v-if="error">
                        <span class="iconfont icon-jingshiicon"></span>
                        <span>\{{error}}</span>
                    </div>
                </div>
                <el-form-item prop="username">
                    <el-input v-model="form.username" maxlength="11" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit" class="user-btn" :class="btnFlag?'':'disabled'" :loading="loading">立即登录</el-button>
                </el-form-item>
                <el-form-item class="from-right">
                    <router-link :to="forgetUrl">忘记密码？</router-link>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
import validate from "@/utils/validate";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      loading: false,
      error: ""
    };
  },
  methods: {
    submit() {
      let _this = this;
      if(!_this.btnFlag){
          return;
      }
      if (!_this.validate(1)) {
        return;
      }
      _this.loading = true;

      _this.$ajax
        .login(_this.form)
        .then(res => {
          _this.loading = false;
          if (res.status == 2000) {
            _this.$store.commit("SET_TOKEN", res.data.token);
            let redirect = this.$route.query.redirect;
            if (redirect && redirect != "/") {
              this.$router.replace({ path: redirect });
            } else {
              this.$router.push("home");
            }
          } else {
            // _this.$message.error(res.msg);
            _this.error = res.msg;
          }
        })
        .catch(error => {
          _this.loading = false;
        });
    },
    validate(type) {
      let _this = this;
      if (!_this.form.username) {
        if (type) _this.error = "请输入手机号";
        return false;
      } else if (!validate.Mobile(_this.form.username)) {
        if (type) _this.error = "请输入正确的手机号";
        return false;
      }
      if (!_this.form.password) {
        if (type) _this.error = "请输入密码";
        return false;
      }
      return true;
      _this.error = "";
    }
  },
  computed: {
    btnFlag() {
      let _this = this;
      if (!_this.form.username) {
        return false;
      } else if (_this.form.username.length != 11) {
        return false;
      }
      if (!_this.form.password) {
          return false;
      }
      return true;
    },
    forgetUrl(){
      if (!this.form.username) {
        return '/forget';
      } else if (!validate.Mobile(this.form.username)) {
        return '/forget';
      }else{
        return '/forget?mobile='+this.form.username;
      }
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.login {
    &>img{
        max-width: 100%;
    }
}
</style>
