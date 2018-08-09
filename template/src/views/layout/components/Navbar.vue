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

