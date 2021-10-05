# Nodejs制作todo项目

## 如何使用

### 安装

```bash
yarn global add aziz-todo@lasest
```

### 命令（需安装node）

```bash
t --help
```

```text
Usage: t [options] [command]

Options:
  -V, --version      # 版本

Commands:
  add <taskName...>  # add <任务名称>
  cleanup            # 清空所以任务
```

### 案例

```bash
t add 学习nodejs 服务器
#添加成功
```

```bash
t

? 请选择你想操作的任务 (Use arrow keys)
❯ [x] 1. 安装压缩软件
  [ ] 2. 完善互联网医院事项
  [ ] 3. 学习nodejs
  [ ] 4. 学习nodejs 服务器
  + 创建任务
  退出
```

## 项目技术细节

### 需运用node API

- require('fs') : 文件读写模块 `fs.readFile` `fs.wirteFile`
- require('path')：环境路径
- process.env：用户环境的对象
- process.argv：用户提供的参数

### 获取用户环境目录

```js
const homedir = require('os').homedir();
const home = process.env.HOME;
```

### 使用依赖 deps

- commander：https://github.com/tj/commander.js
- inquirer：https://github.com/SBoudrias/Inquirer.js

Commander: 添加命令行解决方案

inquirer：命令行选项交互方案

## 发布到npm

### 添加package配置

- bin 添加执行文件的命令
- files 添加哪些主要的文件

```json
"bin": {
    "t": "./cli.js"
},
"files": [
    "*.js"
],
```

⚠️执行文件需添加执行权限

```bash
chmod +x cli.js
```

### 登录npm账号发布

1. 到官网注册：https://www.npmjs.com/
2. 命令行登录npm账号：首次登录需要 `npm adduser` ，不是首登 `npm login `
3. 发布：`npm publish`

