<!--
 * @Description: 
    event >> @fileChange 文件上传成功事件 返回数组 
             @fileRemoveChange 文件删除成功后返回item事件 
             @fileAddSuccess 文件删除成功后返回item事件
    props >> fileLength 文件最大上传数量
             fileArray 已存在数组对象
 * @Author: zhuzhida
 * @Date: 2019-01-21 18:37:18
 * @LastEditTime: 2019-02-18 18:28:54
 * @LastEditors: Please set LastEditors
 -->
<template lang="pug">
  div(class="common-upload")
    Modal(title="预览图片" v-model="visible")
      img(:src="viewImgUrl" v-if="visible" style="width: 100%")
    .add-img
      span.add-btn1(v-for="(item,index) in imgSrcArray" :key="index")
        img(:src="item.thumbUrl")
        .demo-upload-list-cover
          Icon(type="ios-eye-outline" @click.native="handleView(item)")
          Icon(type="ios-trash-outline" @click.native="handleRemove(item)")
      span.add-btn(v-show="imgSrcArray.length<uploadLength")
        input(type="file" class="upload" @change="uploadImg")
        file-upload(
          :input-id='inputId'
          name="resource"
          :multiple="true"
          class="upload"
          ref="upload"
          v-model="files"
          :post-action="uploadHostUrl"
          @input-file="inputFile"
          @input-filter="inputFilter"
        ) 上传文件
</template>
<script>
import FileUpload from "vue-upload-component";
export default {
  components: {
    FileUpload
  },
  props: {
    fileLength: {
      type: String,
      default: "5"
    },
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
      inputId: Math.random()
        .toString(36)
        .substr(2), //input file id 唯一标识，（解决否则组件会互相影响，不可删除）
      uploadLength: this.fileLength * 1,
      viewImgUrl: "",
      visible: false,
      imgSrcArray: this.fileArray,
      files: [],
      uploadHostUrl: "/slowlife/api/oss/upload/"
    };
  },
  methods: {
    fileChange() {
      this.$emit("fileChange", this.imgSrcArray);
    },
    handleView(item) {
      this.viewImgUrl = item.url;
      this.visible = true;
    },
    handleRemove(item) {
      let index = this.imgSrcArray.findIndex(i => i.name == item.name);
      this.imgSrcArray.splice(index, 1);
      this.$emit("fileRemoveChange", item);
      this.fileChange();
    },
    // 上传图片
    uploadImg(event) {
      var _this = this;
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = function() {
        var dataAF = reader.result;
        _this.imgSrc = dataAF;
      };
      reader.readAsDataURL(file);
    },
    /**
     * Has changed
     * @param  Object|undefined   newFile   只读
     * @param  Object|undefined   oldFile   只读
     * @return undefined
     */
    inputFile: function(newFile, oldFile) {
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        this.$Spin.hide();
        console.log("upId:", this.inputId);
        // 获得相应数据
        // console.log("response", newFile.response);
        if (newFile.response.errcode != 0) {
          this.$Message.warning(newFile.response.errmsg);
          return;
        }
        this.imgSrcArray.push(newFile.response.data);
        this.$emit("fileAddSuccess", newFile.response.data);
        this.fileChange();
        if (newFile.xhr) {
          //  获得响应状态码
          console.log("status", newFile.xhr.status);
        }
      }
      this.$refs.upload.files.forEach(element => {
        element.headers = {
          TOKEN: JSON.parse(localStorage.getItem("userInfo")).token
        };
      });
      if (this.$refs.upload.files.length > 5) {
        this.$Message.warning("最多上传5张图片");
        this.$refs.upload.files.splice(4, this.$refs.upload.files.length - 5);
      }
      // 自动上传
      if (
        Boolean(newFile) !== Boolean(oldFile) ||
        oldFile.error !== newFile.error
      ) {
        if (!this.$refs.upload.active) {
          this.$refs.upload.active = true;
          this.$Spin.show();
        }
      }
    },
    /**
     * Pretreatment
     * @param  Object|undefined   newFile   读写
     * @param  Object|undefined   oldFile   只读
     * @param  Function           prevent   阻止回调
     * @return undefined
     */
    inputFilter: function(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // 过滤不是图片后缀的文件
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          return prevent();
        }
      }
      // 创建 blob 字段 用于图片预览
      newFile.blob = "";
      let URL = window.URL || window.webkitURL;
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file);
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.add-img {
  width: 100%;
  // height 2.4rem
  padding: 30px;
  background: #fff;
  // border-top: 1px solid #e5e5e5;
  // border-bottom: 1px solid #e5e5e5;

  .add-btn1 {
    position: relative;
    display: inline-block;
    margin-right: 10px;
    height: 180px;
    width: 180px;
    line-height: 180px;
    text-align: center;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .demo-upload-list-cover {
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
    }

    &:hover .demo-upload-list-cover {
      display: block;
    }

    .demo-upload-list-cover i {
      color: #fff;
      font-size: 32px;
      cursor: pointer;
      margin: 0 2px;
    }
  }

  .upload {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .add-btn {
    position: relative;
    display: inline-block;
    height: 180px;
    width: 180px;
    margin-right: 10px;
    background: url('../../assets/image/addImg.png') no-repeat;
    background-size: cover;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  .upload {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>
