<template>
  <el-breadcrumb class="app-breadcrumb"  separator-class="el-icon-arrow-right" separator="/">
    <!-- <transition-group name="breadcrumb"> -->
      <el-breadcrumb-item v-for="(item,index)  in levelList" :class="item.redirect==='noredirect'||index==levelList.length-1?'no-redirect':''" :to="item.redirect||item.path" :key="item.path" v-if='item.meta.title'>
        <span v-if='item.redirect==="noredirect"||index==levelList.length-1'>\{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">\{{item.meta.title}}</router-link>
      </el-breadcrumb-item>

    <!-- </transition-group> -->
  </el-breadcrumb>
</template>

<script>
let fullRouter = [];
export default {
  name:'breadcrumb',
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      levelList: null,
    }
  },
  watch:{
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    getBreadcrumb() {
      if(this.$route.meta.clearBreadcrumb){
         fullRouter = [];
         sessionStorage.removeItem('breadcrumb')
      }else{
        let breadcrumb = sessionStorage.getItem('breadcrumb');
        if(breadcrumb){
          fullRouter = JSON.parse(breadcrumb);
        }
      }
      if(fullRouter.length>0){
        fullRouter[fullRouter.length-1]!=this.$route.meta.title;
        for(var i=0; i<fullRouter.length; i++){
          if(fullRouter[i].meta.title==this.$route.meta.title){
            fullRouter.splice(i);
          }
        }
      }
      let path = this.$route.fullPath;
      if(path.indexOf('?')>0&&!this.$route.query.cache){
        path +='&cache=true';
      }else if(!this.$route.query.cache){
        path +='?cache=true';
      }
      fullRouter.push({path:path,meta:{title:this.$route.meta.title},query:{cache:true}});
      sessionStorage.setItem('breadcrumb',JSON.stringify(fullRouter));
      this.levelList = fullRouter
    }
  },
  beforeDestroy() {
    sessionStorage.removeItem('breadcrumb')
  },
}
</script>

<style rel="stylesheet/less" lang="less">
  .app-breadcrumb.el-breadcrumb {

    font-size: 14px;
    line-height: 50px;
    font-size: 14px;
    color: #373D41;
    border-bottom: 1px solid #EBEEF5;
    background: #fff;
    width: 100%;
    padding-left: 40px;
    .no-redirect {
      cursor: text;
      border-bottom: 2px solid #373D41;
    }
    .el-breadcrumb__separator{
      color: #373D41;
      font-weight: bold;
    }
  }
</style>
