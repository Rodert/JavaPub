---
title: SpringBoot生成二维码的正确姿势[附视频/附源码]
icon: lightbulb
category:
  - springboot
tag:
  - springboot
---





## SpringBoot生成二维码的正确姿势[附视频/附源码]



[toc]


二维码的原理是什么，如何保证不重复？你有没有想过这样一件事，二维码是实现原理是什么？如何保证各个平台的二维码是唯一的？就算你的程序停止运行，但是你的二维码依然存在。设计上要保证唯一性，比如在物流等环境中扫码编程别人的二维码。





二维码是我们当今社会非常重要的一项技术，不论是我们在买菜，网购，停车等等，都需要扫码，几乎覆盖我们生产、生活的方方面面。



## 前言

你有没有想过这样一些问题：

二维码的原理是什么，如何保证不重复？保证各个平台的二维码是唯一

你有没有想过这样一件事，二维码是实现原理是什么？

就算你的程序停止运行，但是你的二维码依然存在。

设计上要保证唯一性，比如在物流等容易损坏的环境中，如何保证二维码的准确性？


## 初始化 SpringBoot 项目

`https://start.aliyun.com`

![](https://ghproxy.com/https://raw.githubusercontent.com/Rodert/javapub_oss/main/other/springboot-qr-init.png?raw=true)

## 引入依赖

```xml
        <!-- 引入二维码依赖 -->
        <dependency>
             <groupId>com.google.zxing</groupId>
             <artifactId>core</artifactId>
             <version>3.2.0</version>
        </dependency>
        <dependency>
             <groupId>com.google.zxing</groupId>
             <artifactId>javase</artifactId>
             <version>3.2.0</version>
        </dependency>
```    


## 编码

### 编写工具类

**QrCodeController1** 工具类

```java
package cn.net.javapub.springbootqr.demos.web.controller;

import cn.net.javapub.springbootqr.demos.web.utils.QRCodeUtil1;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;

/**
 * 作者 JavaPub
 */
@Controller
//@Deprecated
public class QrCodeController1 {
	/**
     * 根据 url 生成 普通二维码
     */
    @RequestMapping(value = "/createCommonQRCode")
    public void createCommonQRCode(HttpServletResponse response,HttpServletRequest request) throws Exception {
        ServletOutputStream stream = null;
        try {
            stream = response.getOutputStream();
            String url = request.getParameter("url");
            //使用工具类生成二维码
            QRCodeUtil1.encode(url, stream);
        } catch (Exception e) {
            e.getStackTrace();
        } finally {
            if (stream != null) {
                stream.flush();
                stream.close();
            }
        }
    }
 
    /**
     * 根据 url 生成 带有logo二维码
     */
    @RequestMapping(value = "/createLogoQRCode")
    public void createLogoQRCode(HttpServletResponse response,HttpServletRequest request) throws Exception {
        ServletOutputStream stream = null;
        try {
            stream = response.getOutputStream();
//            String logoPath = Thread.currentThread().getContextClassLoader().getResource("").getPath() 
//                    + "templates" + File.separator +"logo-"+UUID.randomUUID().toString().trim().replaceAll("-", "")+ ".jpg";
            String logoPath = Thread.currentThread().getContextClassLoader().getResource("").getPath() 
                    + "templates" + File.separator +"logo.jpg";
            String url = request.getParameter("url");
            //使用工具类生成二维码
            QRCodeUtil1.encode(url, logoPath, stream, true);
        } catch (Exception e) {
            e.getStackTrace();
        } finally {
            if (stream != null) {
                stream.flush();
                stream.close();
            }
        }
    }
}
```


### 生成二维码

附带功能化：

- 离线可以扫描二维码

- 二维码可以带logo


### 资源共享

视频：https://www.bilibili.com/video/BV1cw411w7Rk/

源码：https://github.com/Rodert/springboot-qr/

