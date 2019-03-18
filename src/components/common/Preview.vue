<!--
 * @Description: 
    props >> fileArray 已存在数组对象
 * @Author: zhuzhida
 * @Date: 2019-01-21 18:37:18
 * @LastEditTime: 2019-02-22 23:53:22
 * @LastEditors: Please set LastEditors
 -->
<template lang="pug">
  .preview
    p(style="text-align: right;padding-right: 10px;padding-top: 10px;") 
      Icon(type="md-close-circle" @click="alertCloseChange")
    Carousel(v-if="imgSrcArray.length")
      CarouselItem(v-for="(item,index) in imgSrcArray" :key="item.url")
        .demo-carousel
          img(:src="item.url")

</template>
<script>
export default {
  props: {
    fileArray: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    fileArray(fileArray) {
      this.imgSrcArray = fileArray;
    }
  },
  data() {
    return {
      imgSrcArray: this.fileArray
    };
  },
  methods: {
    alertCloseChange() {
      this.$emit("closealert", false);
    }
  }
};
</script>
<style lang="stylus" scoped>
.preview {
  width: 50%;
  height: 250px;
  position: absolute;
  z-index: 100;
  margin-left: -16%;
  margin-top: -16%;
  top: 50%;
  left: 50%;
  background-color: rgba(55, 55, 55, 0.6);

  i {
    font-size: 30px !important;
    cursor: pointer;
    color #ffffff;
  }
}

.ivu-carousel-item {
  width: 100%;
  left: 0px;
}

.demo-carousel {
  height: 200px;
  line-height: 200px;
  text-align: center;
  color: #fff;

  // font-size: 20px;
  // background: #506b9e;
  img {
    width: auto;
    height: 100%;
  }
}
</style>
