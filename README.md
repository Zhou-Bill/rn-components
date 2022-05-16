## 简介

这是一个基于 `react-native-reanimated` 做的一个`RN` ui 组件库, 只是做了一些基础组件, 基本功能的实现

## 开发

项目基于`Expo`, 开发需要将`package.json`的`main` 以下配置

```json
"main": "node_modules/expo/AppEntry.js",
```

## 构建

```json
"main": "lib/commonjs/index.js"
```

## 实现思路

* [Swipe](src/components/swipe/readme.md)
* [SwipeCell](./src/components/swipe-cell/readme.md)


## TODO

* Picker
* Toast
* Popup
* Tag
* 测试用例编写
* 后续使用dumi 完善一下文档
