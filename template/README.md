# {{ name }}

> {{ description }}

## Build Setup

## 本地服务 
#### 1. 下载依赖 install dependencies
npm install

#### 2. serve with hot reload at localhost:9999
npm run dev

## 测试环境
#### 1. 下载依赖 install dependencies
npm install

#### 2. 编译
npm run build

#### 3.安装pm2
npm i pm2 -g

#### 4. node 服务8082端口
npm run pm2

## 生产环境

#### 1. 下载依赖 install dependencies
npm install

#### 2. 编译
npm run build

#### 3. 安装pm2
npm i pm2 -g

#### 4. node 服务8082端口
npm run pm2

# build for production and view the bundle analyzer report
npm run build --report
{{#unit}}

# run unit tests
npm run unit
{{/unit}}
{{#e2e}}

# run e2e tests
npm run e2e
{{/e2e}}
{{#if_or unit e2e}}

# run all tests
npm test
{{/if_or}}
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
