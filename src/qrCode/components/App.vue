<template>
    <div id="qrCode">
        <el-row>
            <!-- 机器、页面选择 -->
            <el-col :span="18">
                <div class="origin-set">
                    <h3>机器[域名]：</h3>
                    <el-radio-group v-model="currentOriginIndex">
                        <el-radio
                            v-for="(item, index) in originOpts"
                            :key="index"
                            :label="index"
                            class="origin-item"
                            border
                        >
                            {{ item.label }}
                        </el-radio>
                    </el-radio-group>
  
                    <div class="custom-origin">
                        <span>自定义：</span>
                        <el-input
                            v-model="customOrigin"
                            placeholder="例：http://didian.baidu.com:8080"
                            @input="onInputOrigin"
                        >
                        </el-input>
                    </div>
                </div>
  
                <div class="path-set">
                    <h3>页面[path]：</h3>
                    <el-radio-group v-model="currentPathIndex" size="default">
                        <el-radio-button
                            v-for="(item, index) in pathOpts"
                            :key="index"
                            :label="index"
                            size="default"
                            border
                            class="path-item"
                        >
                            {{ item.name }}
                        </el-radio-button>
                    </el-radio-group>
                </div>
  
                <div class="query-set">
                    <h3>参数[query]：</h3>
                    <div
                        class="query-item"
                        v-for="(item, index) in queryOpts[currentPathIndex]"
                        :key="index"
                    >
                        <span class="query-key">{{ item.key }}：</span>
                        <el-input
                            class="query-value"
                            v-model="item.val"
                            :placeholder="item.demo"
                            :disabled="item.is_disabled"
                            size="default"
                        >
                        </el-input>
                    </div>
                </div>
  
                <div class="set-btn">
                    <el-button
                        type="success"
                        class="btn"
                        @click="getUrl"
                    >生成二维码</el-button>
                </div>
            </el-col>
  
            <!-- 二维码、链接区域 -->
            <el-col :span="6" class="qrcode-area">
                <h3>二维码</h3>
                <el-image
                    class="qrcode-img"
                    style="width: 250px; height: 250px;margin:10px 0"
                    :src="imgSrc"
                    fit="fill"
                >
                    <div slot="error"
                        class="image-slot"
                        style="
                            background-color: #d0d3d9;
                            width: 100%;
                            height: 100%;
                            box-sizing: border-box;
                            padding-top: 145px;
                            text-align: center;
                        "
                    >
                        未生成
                    </div>
                </el-image>
                <div class="link-btn">
                    <a :href="imgSrc" download class="btn download">下载</a>
                    <div
                          class="btn copy"
                          v-clipboard:copy="finaUrl"
                          v-clipboard:success="onCopySuccess"
                          v-clipboard:error="onCopyError"
                      >
                          复制链接
                </div>
                </div>
  
                    <el-input v-model="finaUrl" type="textarea" rows="5" size="default" @blur="getQrCode" class="link-url"></el-input>
            </el-col>
        </el-row>
    </div>
  </template>
  
  <script>
  import Vue from 'vue';
  import QRCode from 'qrcode';
  import VueClipboard from 'vue-clipboard2';
  import {
      Row,
      Col,
      Button,
      Radio,
      RadioButton,
      RadioGroup,
      Image,
      Input,
      Notification
  } from 'element-ui';
  // Vue.use(Notification);
  Vue.use(VueClipboard);
  
  import {
    ORIGIN_OPTS,
    PATH_OPTS,
    QUERY_OPTS
  } from './constants';
  
  export default {
      components: {
          'el-row': Row,
          'el-col': Col,
          'el-button': Button,
          'el-radio': Radio,
          'el-radio-button': RadioButton,
          'el-radio-group': RadioGroup,
          'el-image': Image,
          'el-input': Input,
          // 'el-notification': Notification
      },
      data() {
          return {
              originOpts: ORIGIN_OPTS,
              pathOpts: PATH_OPTS,
              queryOpts: QUERY_OPTS,
  
              currentOriginIndex: 0,
              customOrigin: '',
              currentPathIndex: 0,
              imgSrc: '',
              finaUrl: '',
          }
      },
      watch: {
          // 选中域名radio时，清空自定义输入框中的内容
          currentOriginIndex(index) {
              if (index !== 100) {
                  this.customOrigin = '';
              }
          },
      // url改变时，右侧二维码清空
          finaUrl() {
          this.imgSrc = '';
          }
      },
      methods: {
          // 输入自定义的域名
          onInputOrigin() {
          this.currentOriginIndex = 100; // 清空域名选中项
          },
          getUrl() {
          // 计算域名
          let originStr = this.currentOriginIndex !== 100 ? this.originOpts[this.currentOriginIndex].origin : this.customOrigin;
          // 计算path
          let pathStr = this.pathOpts[this.currentPathIndex].path;
          // 计算query
          let queryStr = '';
          const queryArr = this.queryOpts[this.currentPathIndex].filter(item => item.val);
  
          if (queryArr.length) {
              let arr = [];
              queryArr.map((item, index) => {
                  if (item.val) {
                      let str = index === 0 ? `?${item.key}=${item.val}` : `&${item.key}=${item.val}`;
                      arr.push(str);
                  }
              });
              queryStr = arr.join('');
          }
          this.finaUrl = originStr + pathStr + queryStr;
          this.getQrCode();
          },
          getQrCode() {
          // return originStr + pathStr + queryStr;
          QRCode.toDataURL(this.finaUrl).then((src) => {
              this.imgSrc = src;
          }).catch((err) => {
              console.error(err)
          })
          },
          onCopySuccess() {
              Notification({
                  title: '已复制到剪贴板',
                  duration: 3000,
                  position: 'bottom-right'
              });
          },
          onCopyError() {
              Notification({
                  title: '复制失败',
                  duration: 3000,
                  position: 'bottom-right'
              })
          }
      }
  }
  </script>
  
  <style lang="less" scoped>
  #qrCode {
      height: 100%;
      overflow: auto;
      background-color: #fff;
      padding: 10px 60px;
      box-sizing: border-box;
      .origin-set {
          .origin-item {
              margin-top: 10px;
              margin-left: 0;
              width: 16%;
              // height: 30px;
              font-weight: 400;
          }
          .custom-origin {
              margin-top: 10px;
              .el-input {
                  width: 40%
              }
          }
      }
      .path-set {
          margin-top: 40px;
          .path-item {
              margin-top: 6px
          }
      }
      .query-set {
          margin-top: 40px;
          .query-item {
              margin-top: 10px;
              display: flex;
              align-items: center;
  
              .query-key {
                  margin-right: 10px;
                  text-align: right;
                  min-width: 130px;
              }
              .query-value {
                  width: 220px
              }
          }
      }
  
      .set-btn {
          padding-top: 30px;
          .btn {
              position: relative;
              left: 150px;
              width: 100px;
              background-color: green
          }
      }
      .qrcode-area {
          .link-btn {
              display: flex;
              margin-bottom: 10px;
              .btn {
                  width: 70px;
                  height: 30px;
                  background-color: green;
                  color: #fff;
                  text-align: center;
                  line-height: 30px;
                  border-radius: 4px;
                  cursor: pointer;
              }
              .copy {
                  margin-left: 6px;
              }
          }
  
          .link-url {
              margin-top: 6px
          }
  
      }
  
  }
  </style>
  