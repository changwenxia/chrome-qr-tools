# chrome-qr-tools
谷歌浏览器插件-二维码生成器
使用vue2+element ui开发，参考：
https://blog.csdn.net/qq_35606400/article/details/123183420


### 开发过程：


```
1.将package.json里的main入口改为要修改的页面地址，如qrCode里的main.js;
2.vue.config.js里的pages注释掉；
3.多入口打包：vue.config.js里的chromeName里，添加要增加的页面；
4.popup里app.vue写插件点击后的功能，如增加跳转等；
```

### 测试插件效果
```
1. pnpm run build，将插件打包；
2.谷歌浏览器中输入chrome://extensions/，打开开发者模式，将dist文件整个拖入到页面中即已加载插件；
3.在右上角控制栏中可看到插件，点击开始运行插件；
4.每次更改页面代码后，需重新打包，然后再重新点击插件看效果；
```
