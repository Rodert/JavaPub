---
title: rodert单排学习redis进阶【白银一】
icon: lightbulb
category:
  - redis
tag:
  - redis
  - 单排学习redis
---





## rodert单排学习redis进阶【白银一】

<!-- more -->

redis之白银一

`说些题外话，最近帝都疫情又严重，大家都身处时代洪流中，这不是个别人能左右的，希望你能保护好自己，天天开心。`


@[toc]
### 前言

> 声明：参考来源互联网，有任何争议可以留言。站在前人的肩上，我们才能看的更远。


`前文推荐阅读：`

[rodert单排学习redis入门【黑铁】](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUzNDUyOTY0Nw==&action=getalbum&album_id=1389304118178840577&subscene=126&scenenote=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzUzNDUyOTY0Nw%3D%3D%26mid%3D2247484050%26idx%3D1%26sn%3D5b76110a20c22959fdbbe1f8f367a709%26chksm%3Dfa921192cde59884bd8c810eba099e3d371f7f77f9481d167e76753739fce4ed0111ca343a35%26scene%3D126%26sessionid%3D1593072726%26key%3D2e8f81eda3e54fad73caa3aec9e546eec371260ca3b30cbb0e97ee0d569806699c0e6ac6bc8f1a0a04974a4f03d1e9ce9ae1bc838e0c06e3ac25f682055eca28db3fc0078943eafe783bb4e5e6816f33%26ascene%3D1%26uin%3DMTk1NDc4MzM2Mg%253D%253D%26devicetype%3DWindows%2B10%2Bx64%26version%3D62090070%26lang%3Dzh_CN%26exportkey%3DAYmXGhQITcjoyZn4ey%252Bxo5Q%253D%26pass_ticket%3DguqlwSdMxkC7XLyNJjPoGkvn0U9XOSyfcXnMeGtUYAn8EAUS8reK0TbBSbbW9Nss%26winzoom%3D1#wechat_redirect)

[rodert 单排学习 redis 进阶【青铜】](https://mp.weixin.qq.com/s/S2qZiJG-_HgW3ET9Sl0EAg)

### 1.Redis 客户端
#### 1.1.Redis Desktop Manager
使用称手的工具，做起事来 `事半功倍` ，用 `redis-cli` 自然不错。我推荐一款我经常用的 `Redis` **可视化**工具，`Redis Desktop Manager` 。

启动界面如下：


![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zdGF0aWMwMS5pbWdrci5jb20vdGVtcC81MzEyMWYwMGVkNDg0ZTJlYWFkYTZlYWM2NGMzMjE1NC5wbmc?x-oss-process=image/format,png)

至于安装方式是 `一键安装` 。





> 官网下载地址：[https://redisdesktop.com/pricing](https://redisdesktop.com/pricing)

> 学生和学习者可以公众号后台回复：【666】，免费获取。



### 2.Redis 连接池

#### 2.2.0.连接池

> 池技术被广泛使用在系统开发中，像 `JDBC` 连接池、线程池等。连连接池是创建和管理一个连接的缓冲池的技术，这些连接准备好被任何需要它们的线程使用。

在处理一个任务时，我们大多情况要在数毫秒级别就完成，如果重复创建、关闭资源，会占用较长时间和大量系统资源。

- **使用连接池优势**

1. **减少连接创建时间**

连接在系统初始化时就创建完成，需要时直接从池中取用，减少了时间开销。


2. **简化的编程模式**

当使用连接池时，每一个单独的线程能够像创建了一个自己的 JDBC 连接一样操作。

3. **受控的资源使用**

连接池能够控制一个模块的资源占用率，不会让一个模块资源占用过高，导致整个系统崩溃。

#### 2.1.Redis 连接池
##### 2.1.1.前言引入



> `Redis` 修炼之连接池篇，前面讲了Redis入门篇：[rodert单排学习redis入门【黑铁】](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUzNDUyOTY0Nw==&action=getalbum&album_id=1389304118178840577&subscene=126&scenenote=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzUzNDUyOTY0Nw%3D%3D%26mid%3D2247484050%26idx%3D1%26sn%3D5b76110a20c22959fdbbe1f8f367a709%26chksm%3Dfa921192cde59884bd8c810eba099e3d371f7f77f9481d167e76753739fce4ed0111ca343a35%26scene%3D126%26sessionid%3D1593072726%26key%3D2e8f81eda3e54fad73caa3aec9e546eec371260ca3b30cbb0e97ee0d569806699c0e6ac6bc8f1a0a04974a4f03d1e9ce9ae1bc838e0c06e3ac25f682055eca28db3fc0078943eafe783bb4e5e6816f33%26ascene%3D1%26uin%3DMTk1NDc4MzM2Mg%253D%253D%26devicetype%3DWindows%2B10%2Bx64%26version%3D62090070%26lang%3Dzh_CN%26exportkey%3DAYmXGhQITcjoyZn4ey%252Bxo5Q%253D%26pass_ticket%3DguqlwSdMxkC7XLyNJjPoGkvn0U9XOSyfcXnMeGtUYAn8EAUS8reK0TbBSbbW9Nss%26winzoom%3D1#wechat_redirect)、[rodert 单排学习 redis 进阶【青铜】](https://mp.weixin.qq.com/s/S2qZiJG-_HgW3ET9Sl0EAg)，对 `Redis` 基本数据类型的操作做了讲解。


在以前没有开源连接池时，很多人自写连接池工具，简单来说就是创建一个集合，存放一批连接，动态维护着。保证每个连接都是有效的。



##### 2.1.2.Redis 连接池

> 本教程涉及到的一些代码都是 Java 语言编写。


`maven` 依赖，引入 `pom.xml` 文件

- `pom.xml`

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>3.3.0</version>
</dependency>
```

- `RedisUtil.java`

```java
public final class RedisUtil {
    //IP 地址
    private static String ADDR = "127.0.0.1";
    //端口号
    private static int PORT = 6379;
    //redis 服务端密码
    private static String PWD = "123456";
    
    //可用连接实例最大数目，默认为 8，若赋值 -1，表示不被限制
    private static Integer MAX_TOTAL = 1024;
    //控制一个连接池最多有多少个状态为空闲的 jedis 实例，默认值为 8
    private static Integer MAX_IDLE = 200;
    
    //等待可用连接最大的等待时间，单位 ms，默认值 -1，表示永不超时，若等待超时抛出 JedisConnectionException
    private static Integer MAX_WAIT_MILLIS = 10000;
    //超时
    private static Integer TIMEOUT = 10000;
    
    //在用一个 jedis 实例时，是否提前进行 validate 操作，若结果为 true 则 jedis 实例可用
    private static Boolean TEST_ON_BORROW = true;
    
    //jedis 连接池
    private static JedisPool jedisPool = null;
    
    /**
     * 初始化 jedis 连接池的静态块,RedisPool 第一次类加载时执行，以后便不再执行
     */
    static {
        try {
            JedisPoolConfig conf = new JedisPoolConfig();
            /*
             * 高版本 jedis jar 中 JedisPoolConfig 没有 setMaxActive 和 setMaxWait 属性，因为官方在高版本			   * 中启用了此方法，用以下两个属性替换
             * maxActive ==> maxTotal
             * maxWait ==> maxWaitMillis
             */
            //设置连接实例最大数目
            conf.setMaxTotal(MAX_TOTAL);
            //设置最多多少空闲的 jedis 实例
            conf.setMaxIdle(MAX_IDLE);
            //设置等待可用连接的最大时间
            conf.setMaxWaitMillis(MAX_WAIT_MILLIS);
            //设置是否提前进行测试借用
            conf.setTestOnBorrow(TEST_ON_BORROW);
            
            //新建 jedis 连接池
            jedisPool = new JedisPool(conf, ADDR, PORT, TIMEOUT, PWD);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    /*
     * 获取 jedis 实例来操作数据，每次使用完要将连接返回给连接池 jedis.close()
     * @return
     */
    public synchronized static Jedis getRedis() {
        try {
            if(jedisPool != null) {
                //获取 jedis 实例
                Jedis jedis = jedisPool.getResource();
                return jedis;
            }
            else{
                System.out.println("没有找到 Jedis 连接池！");
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    /*
     * 用来回收 Jedis 对象资源，用户需要用到此方法释放资源，否则一直占用资源，在新版本中，`returnResource(jedis) 将被废弃不推荐使用，`直接调用 `jedis.close();` 归还连接到连接池。
     * @param Jedis jedis
     */
    public synchronized static void returnJedis(Jedis jedis) {
        try {
            if(jedis != null) {
                //回收 jedis 对象资源
                jedisPool.returnResource(jedis);
                System.out.println("Jedis 被成功回收！");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

-


> 本教程纯手打，致力于最实用教程，不需要什么奖励，只希望多多转发支持。
> 欢迎来我公众号，希望可以结识你，也可以催更，微信搜索：JavaPub

> 有任何问题都可以来谈谈 ！

![在这里插入图片描述](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091043.jpeg)

