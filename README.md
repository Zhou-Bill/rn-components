## 简介

这是一个基于 `react-native-reanimated` 做的一个`RN` ui 组件库, 只是做了一些基础组件, 基本功能的实现

## 安装

```jsx
yarn add rn-components-zzb
```

注意：`babel.config.js` 需要添加 `react-native-reanimated/plugin` 这个plugin


## 开发

项目基于`Expo`, 开发需要将`package.json`的`main` 以下配置

```json
"main": "node_modules/expo/AppEntry.js",
```

## 构建

```json
"main": "lib/commonjs/index.js"
```

## 目前支持的组件

* Swipe
* SwipeCell 滑动操作
* Tabs
* Icon
* CountDown 倒计时
* NoticeBar
* Radio 、 Radio Group
* Checkbox 、 CheckboxGroup
* Switch
* Toast
* Mask
* Popup
* Stepper
* Cascader 级联选择
* Portals 传送门
* Tree 

## 实现思路

* [Swipe](src/components/swipe/readme.md)
* [SwipeCell](./src/components/swipe-cell/readme.md)
* [Tabs](./src/components/tabs/readme.md)

## TODO

* Picker
* Tag
* IndexBar 序列
* ImageViewer 图片查看器
* Calendar 日历
* NumberKeyBoard 键盘
* 主题 ThemeProvider
* 国际化 ？Intl
* 测试用例编写
* 后续使用dumi 完善一下文档


## 预览图

![预览图](https://i.ibb.co/58JqNhw/i-Shot-2022-09-20-21-05-33.gif)
<!-- <img src="https://i.ibb.co/58JqNhw/i-Shot-2022-09-20-21-05-33.gif" alt="i-Shot-2022-09-20-21-05-33" border="0" /> -->
[预览图](https://i.ibb.co/58JqNhw/i-Shot-2022-09-20-21-05-33.gif)
