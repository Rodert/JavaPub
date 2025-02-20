---
title: 工作中，Redis的15种使用场景
icon: lightbulb
category:
  - redis
tag:
  - redis
---


# 工作中，Redis的15种使用场景


从清晨的新闻推送，到深夜的直播互动；从地铁扫码的毫秒响应，到跨洋支付的交易锁扣——Redis早已渗透数字世界的每个毛细血管。它不仅是一把打开高并发之门的钥匙，更是开发者手中让数据起舞的指挥棒🎻。今天，让我们揭开Redis的15种魔法场景，看它如何用代码谱写效率的诗篇！




## 1. 缓存加速

存储热点数据（如用户信息、商品详情），减少数据库压力。

```bash
SET user:1001 "{name: 'Alice', age: 30}" EX 3600  # 缓存1小时[1](@ref)  
```

### 2. 分布式锁

协调多节点对共享资源的访问，确保原子性。

```bash
// Redisson实现分布式锁模板[1](@ref)  
public <T> T executeWithLock(String lockKey, long timeout, Callable<T> action) {  
    RLock lock = redissonClient.getLock(lockKey);  
    boolean isLock = lock.tryLock(1, timeout, TimeUnit.SECONDS);  
    // ...释放锁逻辑  
}  
```

## 3. 实时排行榜

基于Sorted Set实现游戏积分、直播送礼排名。

```bash
ZADD game_leaderboard 1000 "player_1"  # 插入分数  
ZREVRANGE game_leaderboard 0 9 WITHSCORES  # 获取Top10[1](@ref)  
```

## 4. 计数器

统计文章阅读量、点赞数，支持原子操作。

```bash
SADD article:123:likes 1001  # 用户点赞  
SCARD article:123:likes      # 统计总数[1](@ref)  
```

## 5. 消息队列

通过List的阻塞操作实现任务队列。

```bash
LPUSH task_queue "task1"     # 生产者推送任务  
BLPOP task_queue 5           # 消费者阻塞获取[1](@ref)  
```

## 6. 会话管理

存储分布式Session，自动清理过期数据。

```bash
HSET session:abc123 user_id 1001 last_active 1690000000  
EXPIRE session:abc123 1800  # 30分钟过期[1](@ref)  
```

## 7. 签到系统

用Bitmap高效记录用户签到。

```bash
SETBIT sign:202502:1001 20 1  # 用户1001在20日签到  
BITCOUNT sign:202502:1001     # 统计当月签到次数[1](@ref)[8](@ref)  
```

## 8. 限流控制

通过INCR实现接口访问频率限制。

```bash
-- Lua脚本：限制每秒最多10次请求[7](@ref)  
local key = KEYS[1]  
local limit = tonumber(ARGV[1](@ref)  
local current = redis.call('GET', key) or 0  
if current + 1 > limit then return 0 else redis.call('INCR', key) end  
```

## 9. 购物车

使用Hash存储商品和数量。

```bash
HSET cart:1001 10088 1  # 用户1001添加商品10088  
HINCRBY cart:1001 10088 1  # 修改数量[7](@ref)  
```

## 10. 抽奖活动

利用Set实现随机抽取用户。

```bash
SADD lottery:2025 "user1" "user2"  # 添加参与者  
SRANDMEMBER lottery:2025 1        # 随机抽取1人[7](@ref)  
```


## 11. 全页缓存

缓存整页HTML内容，加速页面加载。

```bash
SET page:home "<html>...</html>" EX 300  # 缓存5分钟[5](@ref)  
```

## 12. 发布订阅

实现实时消息推送（如新闻通知）。

```bash
PUBLISH news "Redis 7.0 released!"  # 发布消息  
SUBSCRIBE news                      # 订阅频道[7](@ref)  
```

## 13. 地理位置服务

存储和查询地理坐标数据。

```bash
GEOADD cities 116.405285 39.904989 "北京"  
GEORADIUS cities 116.40 39.90 100 km  # 查询附近100km城市[8](@ref)  
```

## 14. 分布式ID生成

通过INCRBY生成全局唯一ID。

```bash
INCRBY userid 1000  # 分库分表场景批量生成ID[2](@ref)  
```

## 15. 数据过期处理

自动清理临时数据（如验证码）。

```bash
SET temp:code:1001 "123456" EX 60  # 60秒后自动删除[5](@ref)  
```

通过灵活运用Redis的数据结构和特性，可显著提升系统性能和开发效率。实际应用中需结合业务场景选择合适方案。



