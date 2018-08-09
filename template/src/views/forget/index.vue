<template>
    <div class="forget user-bg">
        <div class="layout-top-nomenu">
            <img src="@/assets/imgs/logo.png" />
            <div class="line">

            </div>
        </div>
        <div class="user-bg-left"></div>
         <div  class="user-content-nologin" v-if="step==0" @keydown.enter="next">
            <el-form class="user-form" :model="form" label-width="0">
                <div class="user-tit">
                    <span>找回密码</span>
                    <div class="user-form-error" v-if="error">
                        <span class="iconfont icon-jingshiicon"></span>
                        <span>/{{error}}</span>
                    </div>
                </div>
                <el-form-item prop="userName">
                    <el-input v-model="form.userName" maxlength="11" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="imageCode">
                    <div class="img-code clearfix">
                        <input type="text" v-model="form.imageCode" placeholder="请输入图形验证码" maxlength="4">
                        <div class="img-code-text" @click="changeImg">
                            <img :src="imageCodeSrc" v-if="imageCodeSrc" @click="captcha">
                        </div>
                    </div>
                </el-form-item>
                <el-form-item prop="smsCode">
                    <div class="sms-code clearfix">
                        <input type="text" v-model="form.smsCode" placeholder="请输入验证码">
                        <div class="sms-code-text" @click="sendCode" v-if="smsFlag" >
                            /{{smsText}}
                        </div>
                        <div class="sms-code-text disabled" v-else>
                            /{{timeCode}}s
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="next"  class="user-btn" :class="nextFlag?'':'disabled'" :loading="nextLoading">下一步</el-button>
                </el-form-item>
                <el-form-item class="from-left">
                    <router-link to="/login">返回登录</router-link>
                </el-form-item>
            </el-form>
            
        </div>
        <div class="user-content-nologin" style="height:352px;" v-if="step==1" @keydown.enter="submit">
            <el-form class="user-form" :model="form" label-width="0">
                <div class="user-tit">
                    <span>密码重置</span>
                    <div class="user-form-error" v-if="errorpw">
                        <span class="iconfont icon-jingshiicon"></span>
                        <span>/{{errorpw}}</span>
                    </div>
                </div>
                <el-form-item prop="password">
                    <el-input v-model="form.password" type="password" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <el-input v-model="form.confirmPassword" type="password" placeholder="请确认新密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit"  class="user-btn" :class="pwFlag?'':'disabled'" :loading="loading">立即重置</el-button>
                </el-form-item>
                <el-form-item class="from-left">
                    <span @click="step=0">返回上一步</span>
                </el-form-item>
            </el-form>
            <div class="toast" v-if="toast">
                <span class="toast-text">密码重置成功</span>
            </div>
        </div>
    </div>
</template>

<script>
import validate from "@/utils/validate";
export default {
  data() {
    return {
      form: {
        userName: "",
        imageCode: "",
        smsCode: "",
        password: "",
        confirmPassword: "",
        imageToken: ""
      },
      loading: false,
      error: "",
      errorpw: "",
      smsText: "获取验证码",
      timeCode: 60,
      timeNum: 0,
      smsFlag: true,
      step: 0,
      nextLoading: false,
      imageCodeSrc: "",
      toast: false,
      times: ""
    };
  },
  created() {
    let mobile = this.$route.query.mobile;
    // if(mobile){
    //   this.form.userName = mobile;
    // }
    this.captcha();
  },
  methods: {
    submit() {
      let _this = this;
      if (!this.pwFlag) {
        return;
      }
      if (!_this.form.password) {
        _this.errorpw = "请输入密码";
        return;
      } else if (!validate.Password(_this.form.password)) {
        _this.errorpw = "请输入8到16位包含数字和字母的密码";
        return;
      }

      if (_this.form.password != _this.form.confirmPassword) {
        _this.errorpw = "新密码和确认新密码不一致";
        return;
      }

      _this.errorpw = "";
      _this.loading = true;
      _this.$ajax
        .resetPassword(_this.form)
        .then(res => {
          _this.loading = false;
          if (res.status == 2000) {
            _this.toastTime();
          } else {
            _this.$message.error(res.msg);
          }
        })
        .catch(error => {
          _this.loading = false;
        });
    },
    changeImg() {},
    toastTime() {
      this.toast = true;
      this.times = setTimeout(() => {
        this.toast = false;
        clearTimeout(this.times);
        this.$router.push("login");
      }, 1500);
    },
    sendCode() {
      if (!this.form.imageCode) {
        this.error = "请输入图形验证码";
        return;
      } else if (this.form.imageCode.length != 4) {
        this.error = "请输入4位图形验证码";
        return;
      }

      this.error = "";
      this.$ajax.getSms(this.form).then(res => {
        if (res.status == 2000) {
          this.smsFlag = false;
          this.timeCode = 60;
          this.time();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    time() {
      this.timeNum = setInterval(() => {
        if (this.timeCode == 1) {
          this.smsFlag = true;
          this.timeCode = 60;
          clearInterval(this.timeNum);
          this.timeNum = "";
        } else {
          this.timeCode--;
        }
      }, 1000);
    },
    next() {
      let _this = this;
      if (!this.nextFlag) {
        return;
      }
      if (!_this.form.userName) {
        _this.error = "请输入手机号";
        return;
      } else if (!validate.Mobile(_this.form.userName)) {
        _this.error = "请输入正确的手机号";
        return;
      }
      _this.error = "";
      _this.nextLoading = true;
      _this.$ajax
        .smsVerify(_this.form)
        .then(res => {
          _this.nextLoading = false;
          if (res.status == 2000) {
            this.step = 1;
          } else {
            _this.$message.error(res.msg);
          }
        })
        .catch(() => {
          _this.nextLoading = false;
        });
    },
    //图片验证码
    captcha() {
      let _this = this;
      _this.$ajax.captcha().then(res => {
        if (res.status == 2000) {
          _this.imageCodeSrc = res.data.image;
          _this.form.imageToken = res.data.token;
        } else {
          _this.$message.error(res.msg);
        }
      });
    }
  },
  computed: {
    nextFlag() {
      if (
        !this.form.userName ||
        !this.form.smsCode ||
        !this.form.imageCode ||
        this.form.userName.length != 11 ||
        this.form.imageCode.length != 4 ||
        this.form.smsCode.length != 6
      ) {
        return false;
      }
      return true;
    },
    pwFlag() {
      if (!this.form.password || !this.form.confirmPassword) {
        return false;
      }
      return true;
    }
  },
  beforeDestroy() {
    if (this.timeNum) {
      clearInterval(this.timeNum);
      this.timeNum = "";
    }
    if (this.times) {
      clearTimeout(this.times);
      this.times = "";
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.forget {
  position: relative;
  & > img {
    max-width: 100%;
  }
  .user-content-nologin {
    height: 422px;
  }
  input::-webkit-input-placeholder {
    color: #c0c4cc;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #c0c4cc;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #c0c4cc;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #c0c4cc;
  }
}
</style>
