---
title: 快速搭建Prometheus+Grafana保姆级教程
icon: lightbulb
---




## 快速搭建 Prometheus+Grafana 保姆级教程





[toc]

演示环境在 MAC 下

## 前言

确保电脑安装了 Homebrew。

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

安装 Prometheus

```bash
brew install prometheus
```

安装 Grafana

```bash
brew install grafana
```

启动 Prometheus 和 Grafana

```bash
# 启动 Prometheus
prometheus --config.file=/javapub/usr/local/etc/prometheus/prometheus.yml

# 启动 Grafana
brew services start grafana
```

检测是否安装成功

Grafana 控制台

> http://localhost:3000

Prometheus 的 URL 

> http://localhost:9090


配置看板步骤：

登录后，配置 Prometheus 作为数据源：

1. 点击左侧菜单的 "Configuration" 图标。
2. 选择 "Data Sources"。
3. 点击 "Add data source"。
4. 选择 Prometheus。
5. 配置 Prometheus 的 URL （通常是 http://localhost:9090）。

完成后，你就可以在 Grafana 中创建仪表板，并使用 Prometheus 作为数据源来可视化监控数据了。


## Prometheus 的四种类型

https://zhuanlan.zhihu.com/p/592560633

