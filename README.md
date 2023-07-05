# vue-manage-system

<a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-3.1.2-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vuejs/pinia">
    <img src="https://img.shields.io/badge/pinia-2.0.14-brightgreen.svg" alt="pinia">
  </a>
  <a href="https://github.com/lin-xin/vue-manage-system/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
  <a href="https://github.com/lin-xin/vue-manage-system/releases">
    <img src="https://img.shields.io/github/release/lin-xin/vue-manage-system.svg" alt="GitHub release">
  </a>
  <a href="https://lin-xin.gitee.io/example/work/#/donate">
    <img src="https://img.shields.io/badge/%24-donate-ff69b4.svg" alt="donate">
  </a>

基于 Vue3 + pinia + Element Plus 的后台管理系统解决方案。[线上地址](https://lin-xin.gitee.io/example/work/)

> Vue2 版本请看 [tag-V4.2.0](https://github.com/lin-xin/vue-manage-system/tree/V4.2.0)

[English document](https://github.com/lin-xin/manage-system/blob/master/README_EN.md)

## 赞助商

### 好问

[`<img src="https://static.bestqa.net/logo/bestqa_haowen.png" width="220" height="100">`](https://www.bestqa.net/home/index.html)

专业问卷服务，一对一客服，按需定制

## 支持作者

请作者喝杯咖啡吧！(微信号：linxin_20)

![微信扫一扫](https://lin-xin.gitee.io/images/weixin.jpg)

## 前言

该方案作为一套多功能的后台框架模板，适用于绝大部分的后台管理系统开发。基于 Vue3 + pinia + typescript，引用 Element Plus 组件库，方便开发。实现逻辑简单，适合外包项目，快速交付。

## 功能

- [X] Element Plus
- [X] vite 3
- [X] pinia
- [X] typescript
- [X] 登录/注销
- [X] Dashboard
- [X] 表格
- [X] Tab 选项卡
- [X] 表单
- [X] 图表 📊
- [X] 富文本/markdown编辑器
- [X] 图片拖拽/裁剪上传
- [X] 权限管理
- [X] 三级菜单
- [X] 自定义图标

## 安装步骤

> 因为使用vite3，node版本需要 14.18+

```
git clone https://github.com/lin-xin/vue-manage-system.git      // 把模板下载到本地
cd vue-manage-system    // 进入模板目录
npm install         // 安装项目依赖，等待安装完成之后，安装失败可用 cnpm 或 yarn

// 运行
npm run dev

// 执行构建命令，生成的dist文件夹放在服务器下即可访问
npm run build
```

## 所需接口

### 1.dashboard

```js
/*
1.热度曲线(7天 阅读，评论)
getHotLine
2.分布情况（知识库，前5+其他）
getDistinction
3.知识库(前4个)
getLibraries

4.最近博客(前5个)
getLastestBlogs
*/
```

### 2.createBlog


```js
/*
1.导入
importBlog
2.在线编辑提交
createBlog
3.获取标签
getLabels
4.查询标签
searchLabels

*/
```


### 3.libraries


```js
/*
1.获取知识库
getLibraries
2.查询知识库
searchLibrary
3.新建知识库
createLibrary
4.查询某知识库的博客
getLibraryBlogs
5.删除知识库 二期
deleteLibrary
*/
```


### 4.myblogs


```js
/*
1.获取博客
getBlogs
2.查询博客
searchBlogs
3.删除博客 二期
deleteBlogs
*/
```


### 5.tagConfig


```js
/*
1.获取标签
getLabels
2.查询标签
searchLabels
3.新建标签
createLabel
4.修改标签
changeLabel
5.删除标签 二期
deleteLabel
*/
```


### 6.statistics


```js
/*

*/
```


### 首页

![Image text](https://github.com/lin-xin/manage-system/raw/master/screenshots/wms1.png)

## License

[MIT](https://github.com/lin-xin/vue-manage-system/blob/master/LICENSE)
