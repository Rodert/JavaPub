---
title: HBase一篇入门
icon: file
author: Ms.Wang
date: 2025-03-28
sticky: true
star: false
category:
  - hbase
tag:
  - hbase
---

# HBase入门教程

HBase是一个开源的、分布式的、版本化的非关系型数据库，是Apache Hadoop生态系统的重要组成部分。本文将全面介绍HBase的基础知识，帮助你快速入门。

## 1. HBase简介

### 1.1 什么是HBase？

HBase是建立在HDFS（Hadoop分布式文件系统）之上的分布式、面向列的数据库。它是Google Bigtable的开源实现，适合存储非结构化和半结构化的松散数据。

![img](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202503281433210.jpg)

### 1.2 HBase核心特点

1. **海量存储**
   - 支持数十亿行 × 数百万列的数据规模
   - 单表可以存储数十亿行数据
   - 无需预定义列的数量和类型

2. **列式存储**
   - 数据按列族存储
   - 支持动态列
   - 自动分片

3. **高可用性**
   - 底层依托HDFS提供高可用性
   - 支持RegionServer之间的故障转移
   - 支持Master的高可用配置

4. **线性扩展**
   - 可以通过增加RegionServer实现扩展
   - 自动数据分片
   - 负载均衡

5. **实时性**
   - 支持实时读写
   - 毫秒级延迟
   - 随机访问

![img](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202503281435901.jpg)

## 2. HBase vs 传统关系型数据库

| 特性 | HBase | 关系型数据库 |
|------|-------|------------|
| 数据模型 | 列族模型 | 关系模型 |
| 数据规模 | PB级别 | GB/TB级别 |
| 数据类型 | Bytes | 丰富的数据类型 |
| 事务支持 | 单行事务 | 完整ACID事务 |
| 索引支持 | 主键索引 | 支持多种索引 |
| 查询方式 | Get/Scan/Put | SQL |
| 扩展方式 | 水平扩展 | 垂直扩展为主 |

## 3. Docker环境搭建

### 3.1 单节点安装

```bash
# 拉取镜像
docker pull harisekhon/hbase

# 启动容器
docker run -d \
    --name hbase-standalone \
    -p 2181:2181 \
    -p 8080:8080 \
    -p 8085:8085 \
    -p 9090:9090 \
    -p 16000:16000 \
    -p 16010:16010 \
    -p 16020:16020 \
    harisekhon/hbase
```

![下载镜像](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202503281431543.png)

![image-20250328143540665](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202503281435909.png)

![image-20250328143558166](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202503281435399.png)

### 3.2 验证安装

```bash
# 进入容器
docker exec -it hbase-standalone bash

# 启动HBase Shell
hbase shell

# 验证状态
status
version
```

### 3.3 Mac本地安装HBase

除了使用Docker安装，我们还可以直接在Mac本地安装HBase。以下是详细步骤：

#### 3.3.1 前置条件

1. **安装Homebrew**
```bash
# 检查是否已安装Homebrew
brew --version

# 如果未安装，执行以下命令安装Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. **确保Java环境**
```bash
# 检查Java版本
java -version

# 如果未安装Java，使用Homebrew安装
brew install java

# 配置Java环境变量（根据实际安装路径调整）
echo 'export JAVA_HOME=$(/usr/libexec/java_home)' >> ~/.zshrc
source ~/.zshrc
```

#### 3.3.2 安装HBase

1. **使用Homebrew安装HBase**

```bash
brew install hbase
```

![image-20250328151130394](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202503281511772.png)



2. **配置HBase**
```bash
# HBase配置文件位置
cd /opt/homebrew/Cellar/hbase/2.6.2/libexec/conf

# 编辑hbase-site.xml
vim hbase-site.xml
```

配置文件内容：（配置一般是存在的，不用动）
```xml
<configuration>
  <property>
    <name>hbase.rootdir</name>
    <value>file:///opt/homebrew/var/hbase</value>
  </property>
  <property>
    <name>hbase.zookeeper.property.dataDir</name>
    <value>/opt/homebrew/var/zookeeper</value>
  </property>
  <property>
    <name>hbase.zookeeper.property.clientPort</name>
    <value>2181</value>
  </property>
  <property>
    <name>hbase.zookeeper.quorum</name>
    <value>localhost</value>
  </property>
</configuration>
```

#### 3.3.3 启动和停止HBase

1. **启动HBase**
```bash
# 使用Homebrew服务启动
brew services start hbase

# 或者直接启动
/opt/homebrew/opt/hbase/bin/start-hbase.sh
```

2. **停止HBase**
```bash
# 使用Homebrew服务停止
brew services stop hbase

# 或者直接停止
/opt/homebrew/opt/hbase/bin/stop-hbase.sh
```

![image-20250328151654390](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202503281516573.png)

#### 3.3.4 验证安装

1. **启动HBase Shell**
```bash
hbase shell
```

2. **测试基本命令**
```bash
# 查看状态
status

# 查看版本
version

# 查看所有表
list
```

![image-20250328151752597](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202503281517594.png)

#### 3.3.5 常见问题解决

1. **如果启动HBase Shell时卡住**
- 检查HBase服务状态：`brew services list | grep hbase`
- 重启HBase服务：`brew services restart hbase`
- 检查日志：`tail -f /opt/homebrew/var/log/hbase/hbase.log`

2. **端口冲突问题**
- 检查端口占用：`lsof -i:2181`（ZooKeeper端口）
- 检查端口占用：`lsof -i:16000`（HBase Master端口）
- 修改配置文件中的端口设置

3. **内存配置**
- 编辑`/opt/homebrew/opt/hbase/libexec/conf/hbase-env.sh`
- 调整内存设置：`export HBASE_HEAPSIZE=4G`

#### 3.3.6 开发工具集成

1. **Java API使用**
```xml
<!-- Maven依赖 -->
<dependency>
    <groupId>org.apache.hbase</groupId>
    <artifactId>hbase-client</artifactId>
    <version>2.4.12</version>
</dependency>
```

2. **REST API访问**
- HBase REST服务默认端口：8080
- 启动REST服务：`/opt/homebrew/opt/hbase/bin/hbase rest start`
- 访问测试：`curl http://localhost:8080/version/cluster`

## 4. HBase数据模型

### 4.1 核心概念

1. **表（Table）**
   - HBase中数据的逻辑存储单元
   - 表由行和列组成

2. **行键（Row Key）**
   - 每行数据的唯一标识
   - 按字典顺序排序
   - 所有操作都基于行键

3. **列族（Column Family）**
   - 表在物理上分割的单元
   - 必须在创建表时定义
   - 同一列族的数据存储在一起

4. **列限定符（Column Qualifier）**
   - 列族中的具体列
   - 可以动态添加
   - 格式：列族:列限定符

5. **单元格（Cell）**
   - 由行键、列族、列限定符和时间戳唯一确定
   - 存储具体的数据值

6. **时间戳（Timestamp）**
   - 每个单元格的版本号
   - 默认为写入时的系统时间

### 4.2 数据模型示例

让我们通过一个用户信息表的例子来理解HBase的数据模型：

1. **表的基本结构**
- 表名：`user_table`
- 包含两个列族：`info`和`address`
- `info`列族存储基本信息（姓名、年龄、性别）
- `address`列族存储地址信息（城市、国家）

2. **数据存储示例**
```
表名: user_table

┌──────────┬───────────────────────────┬────────────────────┐
│  Row Key │     Column Family: info   │ Column Family: add │
├──────────┼───────┬───────┬──────────┼─────────┬──────────┤
│          │ name  │ age   │ gender   │ city    │ country  │
├──────────┼───────┼───────┼──────────┼─────────┼──────────┤
│ user1    │ Tom   │ 25    │ male     │ Beijing │ China    │
│ user2    │ Jerry │ 30    │ female   │ Shanghai│ China    │
└──────────┴───────┴───────┴──────────┴─────────┴──────────┘
```

3. **数据访问方式**
```bash
# 获取user1的所有信息
get 'user_table', 'user1'

# 获取user1的name信息
get 'user_table', 'user1', 'info:name'

# 获取user1的城市信息
get 'user_table', 'user1', 'address:city'
```

4. **数据模型解析**
- **Row Key（行键）**: 'user1', 'user2' 是每行数据的唯一标识
- **Column Family（列族）**: 
  - 'info': 存储个人基本信息
  - 'address': 存储地址相关信息
- **Column Qualifier（列限定符）**: 
  - info列族下有：name, age, gender
  - address列族下有：city, country
- **Cell（单元格）**: 每个具体的值
  - 例如：'Tom'是row key为'user1'，列族'info'下的'name'列的值

5. **实际存储格式**
```
Key                              Value
user1:info:name                 Tom
user1:info:age                  25
user1:info:gender              male
user1:address:city             Beijing
user1:address:country          China
user2:info:name                Jerry
user2:info:age                 30
user2:info:gender              female
user2:address:city             Shanghai
user2:address:country          China
```

这种结构的优势：
1. 可以轻松添加新的列，不影响现有数据
2. 不同行可以有不同的列
3. 按列族物理存储，适合针对特定列族的查询
4. 支持数据多版本（每个Cell可以有多个时间戳的值）

## 5. 基本操作命令

### 5.1 表操作

```bash
# 创建表
create 'user_table', 'info', 'address'

# 列出所有表
list

# 描述表结构
describe 'user_table'

# 禁用表（在删除表之前必须先禁用）
disable 'user_table'

# 删除表（只能删除已经禁用的表）
drop 'user_table'

# 如果需要重新启用表
enable 'user_table'

# 常见错误处理：
# 如果直接尝试删除启用状态的表，会得到错误：
# ERROR: Table user_table is enabled. Disable it first.
# 解决方法：先运行 disable 'user_table'，然后再运行 drop 'user_table'
```

![image-20250328151948994](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202503281519344.png)

### 5.2 数据操作

```bash
# 插入数据
put 'user_table', 'user1', 'info:name', 'Tom'
put 'user_table', 'user1', 'info:age', '25'
put 'user_table', 'user1', 'address:city', 'Beijing'

# 查询操作：get vs scan

# 1. get：获取单行数据（精确查询）
get 'user_table', 'user1'                    # 获取整行数据
get 'user_table', 'user1', 'info:name'       # 获取特定列数据

# 2. scan：扫描表数据（范围查询）
scan 'user_table'                            # 扫描整个表
scan 'user_table', {LIMIT => 10}             # 只扫描10行
scan 'user_table', {STARTROW => 'user1'}     # 从user1开始扫描
scan 'user_table', {STARTROW => 'user1', STOPROW => 'user2'} # 扫描指定范围

# get和scan的主要区别：
# - get：类似于关系数据库的主键查询，直接定位到特定行，性能较好
# - scan：类似于关系数据库的表扫描，可以扫描整表或指定范围的数据，可以添加过滤条件

# 删除数据
delete 'user_table', 'user1', 'info:age'     # 删除特定列
deleteall 'user_table', 'user1'              # 删除整行
```

### 5.3 查询性能比较

1. **get 查询**
   - 适用场景：知道确切的行键，需要获取特定行的数据
   - 性能特点：直接定位到行，速度快
   - 使用方式：支持单行查询和特定列的查询
   - 类似于：MySQL中的主键查询

2. **scan 查询**
   - 适用场景：需要范围查询或满足特定条件的数据
   - 性能特点：需要扫描多行数据，相对较慢
   - 使用方式：支持全表扫描、范围扫描、条件过滤
   - 类似于：MySQL中的表扫描或范围查询

3. **scan 限制说明**
   - **默认限制**：无行数限制，但建议不要一次扫描太多数据
   - **性能影响**：数据量太大会影响查询性能和服务器负载
   - **内存消耗**：大量数据会占用大量内存
   - **网络带宽**：返回大量数据会占用大量网络带宽

4. **scan 控制方法**
```bash
# 使用LIMIT限制返回行数
scan 'user_table', {LIMIT => 1000}  # 只返回1000行

# 使用STARTROW和STOPROW限制范围
scan 'user_table', {STARTROW => 'user1', STOPROW => 'user2'}

# 使用TIMERANGE限制时间范围
scan 'user_table', {TIMERANGE => [1588089600000, 1588176000000]}

# 使用FILTER限制结果
scan 'user_table', {FILTER => "ColumnPrefixFilter('name')"}

# 批量大小控制（每次RPC调用返回的行数）
scan 'user_table', {LIMIT => 1000, BATCH => 100}  # 每次返回100行，总共返回1000行
```

5. **scan 最佳实践**
   - 建议使用LIMIT限制返回行数
   - 尽量使用STARTROW和STOPROW限定范围
   - 只获取需要的列（COLUMNS参数）
   - 合理设置批量大小（BATCH参数）
   - 添加适当的过滤条件
   - 避免全表扫描

6. **scan 性能优化示例**
```bash
# 优化前（不推荐）
scan 'user_table'  # 全表扫描

# 优化后（推荐）
scan 'user_table', {
  STARTROW => 'user1',
  STOPROW => 'user2',
  COLUMNS => ['info:name', 'info:age'],
  FILTER => "ValueFilter(=, 'binary:Tom')",
  LIMIT => 1000,
  BATCH => 100
}
```

## 6. 应用场景

1. **大数据存储场景**
   - 日志数据存储
   - 物联网数据
   - 时序数据

2. **实时读写场景**
   - 实时推荐系统
   - 实时计数器
   - 消息系统

3. **海量数据检索**
   - 电商商品数据
   - 用户行为分析
   - 社交数据存储

## 7. 性能优化建议

1. **行键设计优化**
   - 避免热点问题
   - 保持行键长度适中
   - 根据查询模式设计

2. **预分区**
   - 合理的分区策略
   - 避免数据倾斜
   - 提高写入性能

3. **列族设计**
   - 控制列族数量（建议1-3个）
   - 相关数据放在同一列族
   - 合理设置存储参数

4. **内存优化**
   - 合理设置RegionServer内存
   - 优化BlockCache配置
   - 监控GC情况

## 8. 最佳实践

1. **数据建模**
   - 根据查询模式设计表
   - 避免过多列族
   - 合理使用复合行键

### 8.1 数据建模实战案例

#### 8.1.1 电商订单系统
```bash
# 不好的设计：使用随机订单ID作为行键
# 问题：无法高效查询某用户的订单
create 'order_table', 'info'
put 'order_table', '123456', 'info:user_id', 'user001'
put 'order_table', '123456', 'info:create_time', '2024-03-28'

# 好的设计：复合行键（用户ID + 时间 + 订单ID）
# Row Key: userId_yearMonth_orderId
create 'order_table', 'info'
put 'order_table', 'user001_202403_000123', 'info:status', 'paid'
put 'order_table', 'user001_202403_000124', 'info:amount', '99.99'

# 查询某用户3月的订单
scan 'order_table', {
  STARTROW => 'user001_202403',
  STOPROW => 'user001_202404'
}
```

#### 8.1.2 日志系统
```bash
# Row Key: type_date_time_logId
create 'log_table', 'content'

# 写入不同类型的日志
put 'log_table', 'ERROR_20240328101010_001', 'content:message', 'Connection failed'
put 'log_table', 'INFO_20240328101020_002', 'content:message', 'Server started'

# 查询某天的错误日志
scan 'log_table', {
  STARTROW => 'ERROR_20240328',
  STOPROW => 'ERROR_20240329'
}
```

#### 8.1.3 社交媒体消息系统
```bash
# 设计1：按时间查询
# Row Key: timestamp_fromUser_toUser
create 'message_table', 'content'
put 'message_table', '20240328101010_user001_user002', 'content:text', 'Hello!'

# 设计2：按用户关系查询
# Row Key: fromUser_toUser_timestamp
create 'message_table', 'content'
put 'message_table', 'user001_user002_20240328101010', 'content:text', 'Hello!'

# 查询用户间的聊天记录
scan 'message_table', {
  STARTROW => 'user001_user002',
  STOPROW => 'user001_user002_9999999999'
}
```

#### 8.1.4 用户行为分析系统
```bash
# Row Key: userId_behavior_timestamp
create 'user_behavior', 'action'

# 记录用户行为
put 'user_behavior', 'user001_click_20240328101010', 'action:page', 'home'
put 'user_behavior', 'user001_view_20240328101020', 'action:product', 'phone'
put 'user_behavior', 'user001_buy_20240328101030', 'action:product', 'phone'

# 查询用户的所有行为
scan 'user_behavior', {
  STARTROW => 'user001_',
  STOPROW => 'user001_z'
}
```

### 8.2 数据建模最佳实践

1. **行键设计原则**
   - **热点数据分散**：避免所有请求都访问同一个区域
   - **相关数据聚集**：便于范围查询
   - **长度适中**：不要太长，建议在100字节以内

2. **列族使用原则**
   - **保持列族数量少**：建议2-3个
   - **相关数据聚合**：经常一起访问的数据放在同一列族
   - **访问频率分离**：不同访问频率的数据放在不同列族

3. **实用技巧**
```bash
# 1. 使用分隔符区分行键各部分
user001:202403:order123    # 使用冒号分隔

# 2. 使用补零保证字典序
user001:20240328:00000123  # 订单号补零

# 3. 使用时间戳的反转值使最新数据排在前面
user001:99999999999-timestamp  # 最新数据会排在前面
```

4. **设计注意事项**
   - 根据实际查询需求设计行键
   - 避免使用过长的行键
   - 合理使用时间戳
   - 预估数据增长趋势
   - 考虑数据分布的均衡性

## 参考资源

- [Apache HBase官方文档](https://hbase.apache.org/book.html)
- [HBase权威指南](https://book.douban.com/subject/10748460/)
- [Apache HBase参考指南](https://hbase.apache.org/book.html#architecture)

## 结语

HBase作为一个强大的分布式数据库系统，在大数据生态系统中扮演着重要角色。通过本文的学习，你应该已经掌握了HBase的基础知识和使用方法。建议在实践中多加练习，逐步深入理解HBase的各项特性。

