<template>
    <div class="img-preview" v-show="opened" ref="imgPreview">

        <div class="img-content" v-if="opened">
            <div class="add">
                <img src="@/assets/imgs/imgPreview/enlarge.png" @click="add">
            </div>
            <div class="reduce">
                <img src="@/assets/imgs/imgPreview/narrow.png" @click="reduce">
            </div>
            <div class="close">
              <i class="el-icon-close" @click="close"></i>
            </div>
            <img :src="src" ref="img" v-if="src" @dragstart="mousedown" @drag="mousemove" @dragend="mouseup">  
            <div class="img-model" @click="close">

            </div>           
        </div>
    </div>
</template>

<script>
export default {
  name: "img-preview",
  props: {
    src: {
      type: String,
      dafault: ""
    },
    value: {
      type: Boolean,
      dafault: false
    }
  },
  created() {
    //   document.body.clientWidth;
  },
  data() {
    return {
      opened: this.value,
      move: {
        x: 0,
        y: 0,
        l: 0,
        t: 0,
        isDown: false
      }
    };
  },
  methods: {
    close() {
      this.$emit("input", false);
    },
    add() {
      let width = this.$refs.img.width;
      let height = this.$refs.img.height;
      this.$refs.img.width = width * 1.2;
      this.$refs.img.height = height * 1.2;
      this.$refs.img.style.maxWidth = "none";
    },
    reduce() {
      let width = this.$refs.img.width;
      let height = this.$refs.img.height;
      this.$refs.img.width = width * 0.8;
      this.$refs.img.height = height * 0.8;
    },
    mousedown(e) {
      //获取x坐标和y坐标
      this.move.x = e.clientX;
      this.move.y = e.clientY;

      //获取左部和顶部的偏移量
      this.move.l = this.$refs.img.offsetLeft;
      this.move.t = this.$refs.img.offsetTop;
      //开关打开
      this.move.isDown = true;
    },
    mousemove(e) {
      e.preventDefault();
      if (this.move.isDown == false) {
        return;
      }
    },
    mouseup(e) {
      //开关关闭
      //获取x和y
      if (this.move.isDown == false) {
        return;
      }
      let nx = e.clientX;
      let ny = e.clientY;
      let nl = nx - (this.move.x - this.move.l);
      let nt = ny - (this.move.y - this.move.t);
      this.$refs.img.style.left = nl + "px";
      this.$refs.img.style.top = nt + "px";
      this.move.isDown = false;
    }
  },
  watch: {
    value(val) {
      this.move = {
        x: 0,
        y: 0,
        l: 0,
        t: 0,
        isDown: false
      };

      this.opened = val;
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.img-preview {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;

  .img-model {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    cursor: move;
  }
  .img-content {
    position: relative;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    & > img {
      position: absolute;
      z-index: 2;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      cursor: move;
      max-width: 50%;
    }
    .add,
    .reduce,
    .close {
      width: 100px;
      height: 50px;
      position: absolute;
      z-index: 3;
      top: 30px;
      img {
        cursor: pointer;
      }
    }
    .add {
      right: 150px;
    }
    .reduce {
      right: 250px;
    }
    .close{
      right: 50px;
      font-size: 30px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
