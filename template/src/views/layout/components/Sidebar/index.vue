<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#373D41"
      text-color="#fff"
      active-text-color="#fff"
      >
      <div class="menu-wrapper logo-menu">
          <router-link to="/">
            <img class="logo-show" src="@/assets/imgs/logo.png" />
          </router-link>
      </div>
      <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .logo-menu{
      border-bottom: 1px solid #31363A;
      .logo-show{
        width: 140px;
        height: 35px;
        margin: 23px 45px;
        @media all and (max-width: 1440px) { 
          margin: 23px 20px;
        }
      }
      .logo-hide{
        width: 30px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3D(-50%,-50%,0);
      }
  }

</style>

