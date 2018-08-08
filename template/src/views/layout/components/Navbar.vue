<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item" :show-timeout="100">
        <div class="avatar-wrapper">
          <span>{{name}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <ul class="menu-dropdown">
            <li>
              <router-link to="/userCenter">
              <span class="iconfont icon-gerenicon"></span>
                个人中心
              </router-link>
            </li>
            <li>
              <span class="iconfont icon-tuichuicon"></span>
              <span @click="logout">退出登录</span>
            </li>
          </ul>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar"])
  },
  methods: {
    logout() {
      this.$store.dispatch("FedLogOut").then(() => {
        this.$router.push("login");
      });
    }
  },
  computed: {
    name() {
      return this.$store.getters.name;
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.navbar {
  padding: 15px 0;
  border-radius: 0px !important;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  padding-left: 180px;
  z-index: 5;
  .logo {
    width: 200px;
    height: 30px;
    background: #333;
    float: left;
  }
  .hamburger-container {
    // line-height: 58px;
    // height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: auto !important;

      padding-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        font-size: 14px;
        color: #626669;
        // .user-avatar {
        //   width: 40px;
        //   height: 40px;
        //   border-radius: 10px;
        // }
        // .el-icon-arrow-down {
        //   position: absolute;
        //   right: -15px;
        //   top: 50%;
        //   transform: translateY(-50%);
        //   font-size: 12px;
        // }
        .el-icon-arrow-down {
          transform: rotate(0);
          transition: transform 0.3s;
        }
        &:hover {
          .el-icon-arrow-down {
            transform: rotate(-180deg);
          }
        }
      }
    }
    .el-dropdown-menu {
      top: 50px !important;
    }

    ul.dropdown {
      li {
        padding: 0 10px;
        text-align: center;
      }
    }
  }
}
.menu-dropdown {
  padding: 11px 0;
  li {
    padding: 0 22px;
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #5a5e66;
    font-weight: bold;
    cursor: pointer;
    &:first-child {
      margin-top: 0;
    }
    &:hover {
      font-size: 14px;
      color: #5088e5;
    }
    & .iconfont {
      padding-right: 5px;
    }
  }
}
</style>
