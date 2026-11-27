---
title: 免费云主机部署实战：0.5 核 CPU + 1GB 内存，无需信用卡，支持 GitHub 项目部署
icon: cloud
date: 2026-11-27
category:
  - 云资源
tag:
  - Hostless
  - 免费资源
  - 云部署
  - GitHub
---

## 视频教程

<div style="position: relative; width: 100%; aspect-ratio: 16 / 9;">
  <iframe
    style="position: absolute; inset: 0; width: 100%; height: 100%; border: 0;"
    src="https://www.youtube.com/embed/3UW1F_RJKJ0?si=Y7AeP9FrioqHF3PH"
    title="免费云主机部署实战：Hostless 部署静态网站与 GitHub 项目"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

[在 YouTube 观看完整视频](https://youtu.be/3UW1F_RJKJ0?si=Y7AeP9FrioqHF3PH)

对于开发者来说，无论是部署个人项目、搭建技术博客、开发 AI 应用，还是演示自己的开源作品，都需要一个能够对外访问的运行环境。

今天分享一个免费的云应用托管平台，支持通过 GitHub 部署项目，也支持直接上传静态网站文件，无需提前购买服务器。在本次实测中，也不需要绑定信用卡。

下面通过两个实际案例，分别演示静态网站部署和 GitHub 项目部署的完整流程，以及部署过程中容易遇到的问题。

## 一、免费资源及平台功能

根据本次实测，平台提供的免费资源如下：

| 资源     | 免费额度          |
| ------ | ------------- |
| CPU    | 0.5 核         |
| 内存     | 1GB           |
| 存储空间   | 512MB         |
| 应用数量   | 最多 6 个 APP    |
| 域名     | 平台自动分配子域名     |
| 信用卡    | 本次注册无需绑定      |
| Git 仓库 | 支持 GitHub 等平台 |
| 部署方式   | 容器部署、直接部署     |

**需要注意：多个应用共享这一套计算资源，并不是每个应用都拥有 0.5 核 CPU 和 1GB 内存。**

平台支持的功能包括：

- Apps：应用程序部署。
- Sites：静态网站托管。
- Databases：数据库服务。
- Cron Jobs：定时任务。
- Dashboard：资源及应用管理。
- Git 集成：从代码仓库拉取项目进行部署。

整体上更接近一个 PaaS 云应用托管平台，而不是传统的、可以自由 SSH 登录的 VPS 服务器。

**Hostless 官网：** [https://web.hostless.cloud/](https://web.hostless.cloud/)

根据官网最新说明，静态网站不消耗上述计算资源，免费应用不会因空闲而休眠。视频中提到的 6 个应用数量限制与目前官网说明存在差异，实际可创建数量以控制台为准。





## 二、注册 Hostless 账号

### 第一步：进入官网

访问：

[https://web.hostless.cloud/](https://web.hostless.cloud/)

点击 **Start for Free**，进入注册页面。

支持以下账号授权方式：

- Google
- GitHub
- GitLab
- Bitbucket

这里以 Google 账号为例，完成授权并输入邮箱验证码。

**注意：** 如果长时间没有收到验证码，可以重新发送，并检查邮箱的垃圾邮件目录。本次实测中，验证码就进入了垃圾邮件。

### 第二步：完善基础信息

首次登录需要填写一些基本信息，可以参考以下配置，根据实际情况填写。

| 配置项                       | 参考选项            |
| ------------------------- | --------------- |
| Name                      | 个人昵称            |
| Role                      | Engineer        |
| Team Size                 | 2-5             |
| Technology                | Other           |
| Purpose                   | Build a new app |
| How did you hear about us | Google          |

填写完成后，点击 Continue，进入平台控制台。

## 三、实战一：免费部署静态网站

如果你的项目是纯 HTML、CSS、JavaScript，或者已经完成打包的前端项目，可以直接使用 Sites 功能，无需配置后端运行环境。

### 第一步：创建静态站点

进入控制台，选择 Sites，创建一个新的站点。

平台支持三种部署操作：

- 通过 GitHub 仓库部署。
- 手动上传网站文件。
- 拖拽上传网站文件。

这里演示最简单的手动上传方式。

### 第二步：准备 HTML 文件

在本地创建一个 `index.html` 文件，以下代码可以直接用于测试：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <title>JavaPub</title>
</head>
<body>
    <h1>Hello, Hostless!</h1>
    <p>我的第一个免费云端网站。</p>
</body>
</html>
```

如果是已有的静态网站，可以参考以下目录结构：

```text
website/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    └── logo.png
```

确保 `index.html` 位于网站发布目录的根目录。

### 第三步：上传网站文件

选择刚才创建的 `index.html` 文件。

选择文件后，还需要手动点击 **Upload**，完成实际的文件上传。

这是一个容易踩坑的地方：选择文件并不代表已经完成上传。如果直接点击下一步，平台可能提示需要先完成所有文件的上传。

另外，如果浏览器开启了网页自动翻译，导致按钮无法正常点击，建议暂时切换回英文原文，再继续操作。

### 第四步：部署并访问网站

点击下一步，选择 **Create and Deploy**。

平台会自动完成网站部署，并分配一个可以公开访问的子域名。

当站点状态显示为 `Running` 时，点击 Preview，即可访问刚才部署的网站。

整个过程不需要安装 Nginx，也不需要手动配置服务器。

## 四、实战二：通过 GitHub 部署应用程序

如果你的项目使用 Node.js、Go、Python 等技术开发，可以通过 Apps 功能进行部署。

整个部署流程如下：

### 第一步：准备 GitHub 仓库

GitHub 官网：

[https://github.com/](https://github.com/)

提前将需要部署的项目上传至 GitHub。

如果已经创建了远程仓库，可以通过以下命令提交本地代码：

```bash
git init

git add .

git commit -m "init project"

git branch -M main

git remote add origin https://github.com/USERNAME/REPOSITORY.git

git push -u origin main
```

将其中的 `USERNAME` 和 `REPOSITORY` 替换为自己的 GitHub 用户名和仓库名称。

### 第二步：关联 GitHub 账号

进入 Hostless 控制台：

```text
Apps → Create App → GitHub → Connect
```

随后进入 GitHub 授权页面。

GitHub 提供两种仓库授权方式：

| 授权方式                     | 说明       |
| ------------------------ | -------- |
| All repositories         | 授权访问所有仓库 |
| Only select repositories | 仅授权指定仓库  |

**建议选择 Only select repositories。**

遵循最小权限原则，需要部署哪个项目，就授权哪个项目，避免第三方平台获得不必要的代码仓库访问权限。

选择仓库后，点击 Install，完成授权，再点击 Done 返回部署页面。

### 第三步：配置应用基础信息

选择需要部署的 GitHub 仓库，然后填写应用名称及项目目录。

例如：

```text
App Name: javapub
Root Directory: ./
```

如果你的 GitHub 仓库采用前后端分离的结构：

```text
my-project/
├── frontend/
├── backend/
└── README.md
```

则需要根据实际部署的服务，选择对应的目录。

例如部署后端：

```text
Root Directory: backend
```

应用名称建议使用简短的英文字母。本次实测中，名称包含数字或者名称过长，都可能导致创建失败。

### 第四步：选择应用运行环境

根据项目实际使用的技术栈选择运行环境。

| 项目类型           | 运行环境         |
| -------------- | ------------ |
| Express、NestJS | Node.js      |
| Gin、Fiber      | Go           |
| Flask、FastAPI  | Python       |
| 自定义容器应用        | Docker（容器部署） |
| 纯 HTML、CSS、JS  | 优先使用 Sites   |

在视频中，使用的是 Node.js 环境，框架选择 Other。

如果选择了特定框架，平台可能会根据框架预设相应的构建配置，因此不要随意选择与自己项目无关的框架。

### 第五步：选择部署方式

平台提供两种部署方式：

| 部署方式                 | 适用场景              |
| -------------------- | ----------------- |
| Direct Deployment    | 普通应用、轻量级项目        |
| Container Deployment | Docker 项目、自定义运行环境 |

如果是简单的 Node.js、Go 或 Python 应用，可以优先选择直接部署。

如果项目本身已经编写了 `Dockerfile`，则可以选择容器部署。

### 第六步：配置构建命令及启动命令

对于技术人员来说，这是整个部署过程中最关键的一步。

需要区分构建命令（Build Command）和启动命令（Start Command）。

以 Node.js 项目为例：

安装依赖：

```bash
npm install
```

构建项目：

```bash
npm run build
```

启动项目：

```bash
npm start
```

不同技术栈的常见命令参考：

| 技术栈     | 构建命令                              | 启动命令                                          |
| ------- | --------------------------------- | --------------------------------------------- |
| Node.js | `npm run build`                   | `npm start`                                   |
| Go      | `go build -o app .`               | `./app`                                       |
| Python  | `pip install -r requirements.txt` | `python app.py`                               |
| FastAPI | `pip install -r requirements.txt` | `uvicorn main:app --host 0.0.0.0 --port 8080` |

以上为通用技术示例，具体命令需要根据项目结构及平台提供的端口配置进行调整。

**不要直接将其他项目的构建命令照搬到自己的项目中。**

### 第七步：确认资源配置并部署

本次实测中，单个应用默认分配的资源为：

CPU

# 0.1 vCPU

占免费 CPU 总额度的 20%

运行内存

# 256 MB

约占免费内存总额度的 25%

确认配置后，点击 Create and Deploy。

平台将拉取 GitHub 仓库代码，并执行相应的构建和部署任务。

本次实测的页面提示部署预计需要 2～5 分钟，实际时间取决于项目大小、构建过程和平台队列。

部署成功后，点击 Open App，即可通过平台分配的域名访问项目。

## 五、部署失败怎么办？

在本次测试过程中，第一次部署实际上失败了。

点击部署任务中的 Details，查看构建日志，发现问题出现在执行以下命令时：

```bash
npm run build
```

原因是原项目没有定义对应的构建脚本。

### 1. 解决 Missing script: build 报错

类似报错通常如下：

```text
npm ERR! Missing script: "build"
```

检查项目根目录中的 `package.json` 文件，确认是否包含 `scripts.build` 配置。

例如，一个简单的 Node.js Web 项目可以使用以下配置：

```json
{
  "name": "hostless-demo",
  "version": "1.0.0",
  "scripts": {
    "build": "node --check server.js",
    "start": "node server.js"
  }
}
```

对应的 `server.js`：

```js
const http = require("node:http");

const PORT = Number(process.env.PORT || 8080);

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8"
    });

    res.end(JSON.stringify({
        code: 200,
        message: "Hello, Hostless!",
        status: "running"
    }));
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
```

这个示例不依赖第三方 NPM 包，可以用于轻量级 API 服务部署测试。其中 `build` 脚本仅执行语法检查，不进行额外打包。

部署前，建议先在本地测试：

```bash
npm run build

npm start
```

再通过 CURL 验证接口：

```bash
curl http://localhost:8080
```

预期响应：

```json
{
  "code": 200,
  "message": "Hello, Hostless!",
  "status": "running"
}
```

确认本地运行正常后，再将代码提交到 GitHub。

```text
git add .

git commit -m "fix: add build and start scripts"

git push
```

也可以使用 Codex 等 AI 编程工具辅助排查和修改部署脚本。

### 2. 修改代码后仍然部署失败

在视频实测中，修改代码并提交到 GitHub 后，直接点击 Restart 仍然没有部署成功。

最终通过删除原测试应用、重新创建 APP 的方式完成了部署。

实际开发中，建议优先检查部署使用的 Git commit 是否为最新版本，以及是否有重新构建的入口。Restart 不一定等于重新拉取代码并构建。

对于没有重要数据的测试应用，也可以按照视频中的方式操作：

```text
Pause
  ↓
Delete App
  ↓
输入应用名称确认删除
  ↓
Create App
  ↓
重新选择 GitHub 仓库
  ↓
重新配置并部署
```

生产环境不要直接删除应用，应提前确认数据、域名、环境变量等配置是否需要保留。

### 3. 常见部署问题汇总

| 问题                    | 排查方向              |
| --------------------- | ----------------- |
| 无法收到验证码               | 检查垃圾邮件、重新发送       |
| 上传文件后无法继续             | 确认已点击 Upload      |
| 页面按钮没有反应              | 关闭浏览器网页翻译         |
| GitHub 仓库无法显示         | 检查仓库授权范围          |
| APP 名称不合法             | 使用简短英文字母          |
| Missing script: build | 检查 package.json   |
| 找不到项目文件               | 检查 Root Directory |
| 修改代码后仍然报错             | 检查是否部署了最新 commit  |
| 应用启动后无法访问             | 检查监听地址及端口         |
| 应用内存不足                | 检查资源分配及程序内存占用     |

## 六、如何合理利用免费资源？

Hostless 的免费计算资源是账号级共享的，因此需要根据项目类型合理分配。

例如，按照 1GB 内存约 1024MB 估算：

### 四个轻量级应用的资源分配示例

CPU 分配

已分配 0.4 vCPU

剩余 0.1 vCPU

内存分配

已分配 1024MB

剩余 0MB

APP 1 · 256MB

APP 2 · 256MB

APP 3 · 256MB

APP 4 · 256MB

以上为按默认应用规格计算的资源分配示例，并非实时资源监控数据。

建议将纯前端项目部署到 Sites，将需要服务端运行的程序部署到 Apps，避免不必要的计算资源占用。

根据官网说明，平台还支持 PostgreSQL、MongoDB、Redis 等托管数据库，以及 Cron Jobs 定时任务。超出免费资源额度的部分，在绑定支付方式后可能产生费用。





## 七、适合部署哪些项目？

对于开发者和独立开发者来说，这类平台有不少实际使用场景。

| 项目类型            | 推荐程度   |
| --------------- | ------ |
| 个人技术博客          | 非常适合   |
| 开源项目在线演示        | 非常适合   |
| 简历及个人作品集        | 非常适合   |
| Go 轻量级 API 服务   | 适合     |
| Node.js 小型后端    | 适合     |
| AI 聊天前端         | 适合     |
| 第三方 AI API 调用应用 | 适合轻量使用 |
| 定时任务、自动化脚本      | 适合轻量使用 |
| 本地大语言模型推理       | 不适合    |
| 高并发生产业务         | 不推荐    |

尤其是正在学习编程、准备面试或者开发个人产品的技术人员，可以将自己的项目上传至 GitHub，再通过 Hostless 部署成一个能够公开访问的网站。

不再只是向别人展示 GitHub 源代码，而是可以直接提供一个在线运行的项目地址。

## 八、总结

对于个人开发者来说，Hostless 的价值不仅仅在于提供免费的 CPU 和内存资源，更在于降低了项目从开发到上线的门槛。

通过 GitHub + Hostless，可以形成一个完整的开发交付闭环：

```text
本地开发
    ↓
GitHub 代码托管
    ↓
Hostless 云端构建
    ↓
项目上线
    ↓
公网访问与作品展示
```

不需要提前购买服务器，也不需要自己维护复杂的服务器环境，就可以完成轻量级项目的部署。

**相关地址：**

- Hostless 官网：[https://web.hostless.cloud/](https://web.hostless.cloud/)
- GitHub 官网：[https://github.com/](https://github.com/)

本文基于视频实操整理，补充了可供技术人员参考的 HTML、Node.js 代码示例、Git 命令及部署排错方法。补充代码并非视频中的原始项目源码；平台免费政策也可能调整，使用时请以实际控制台和官方说明为准。
