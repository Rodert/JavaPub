### 框架开发文档

https://theme-hope.vuejs.press/zh/get-started/

### 本地调试

```bash
cd docs


pnpm i

pnpm run docs:dev
```

#### 添加插件

搜索

```bash
npm config set registry https://registry.npm.taobao.org

npm config set registry https://registry.npmjs.org/

pnpm add -D vuepress-plugin-search-pro

pnpm add -D @vuepress/plugin-search@next
```


### 打包部署

编译出静态文件

```bash
cd docs

pnpm run docs:build
```

编译后静态文件目录

```bash
cd docs/src/.vuepress/dist
```

#### nginx 配置

```conf
server {
	listen               443 ssl;
	server_name          javapub.net.cn www.javapub.com;  # 接收所有访问443端口的请求
	ssl_certificate      /etc/nginx/cert/javapub.net.cn.pem;
	ssl_certificate_key  /etc/nginx/cert/javapub.net.cn.key;

	root /opt/javapub/dist;
	index index.html index.htm;

	location / {
		    try_files $uri $uri/ /index.html;
        }
}
```