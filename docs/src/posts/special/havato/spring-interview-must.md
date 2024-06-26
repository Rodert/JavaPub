---
# 这是侧边栏索引
index: true
# 这是页面的图标
icon: page
# 这是文章的标题
title: 10道不得不会的Spring面试题
# 设置作者
author: Wang Shiyu
# 设置写作时间
date: 2022-06-04
# 一个页面可以有多个分类
category:
  - 最少必要面试题
# 一个页面可以有多个标签
tag:
  - spring
  - 面试题

---

spring

<!-- more -->

10道不得不会的Spring面试题

我是JavaPub，专注于面试、副业，技术人的成长记录。

以下是 Spring 面试题，相信大家都会有种及眼熟又陌生的感觉、看过可能在短暂的面试后又马上忘记了。**JavaPub**在这里整理这些容易忘记的重点知识及**解答**，`建议收藏，经常温习查阅`。

评论区见

@[toc]

# Spring


### 1. 什么是 Spring 框架？Spring 框架有哪些主要模块？

Spring是针对bean的生命周期进行管理的轻量级容器，一个控制反转和面向切面的容器框架

Spring有七大功能模块：

1、Core

Core模块是Spring的核心类库，Core实现了IOC功能。

2、AOP

Apring AOP模块是Spring的AOP库，提供了AOP（拦截器）机制，并提供常见的拦截器，供用户自定义和配置。

3、orm

提供对常用ORM框架的管理和支持，hibernate、mybatis等。

4、Dao

Spring提供对JDBC的支持，对JDBC进行封装。

5、Web

对Struts2的支持。

6、Context

Context模块提供框架式的Bean的访问方式，其它程序可以通过Context访问Spring的Bean资源，相当于资源注入。

7、MVC

MVC模块为spring提供了一套轻量级的MVC实现，即Spring MVC。


### 2. Spring IOC、AOP举例说明

> 这是一个基础问题，如果理解有难度、建议先读五遍。

1、IOC理论的背景

我们都知道，在采用面向对象方法设计的软件系统中，它的底层实现都是由N个对象组成的，所有的对象通过彼此的合作，最终实现系统的业务逻辑。

![图1：软件系统中耦合的对象](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-092745.jpeg)

如果我们打开机械式手表的后盖，就会看到与上面类似的情形，各个齿轮分别带动时针、分针和秒 针顺时针旋转，从而在表盘上产生正确的时间。图1中描述的就是这样的一个齿轮组，它拥有多个独立的齿轮，这些齿轮相互啮合在一起，协同工作，共同完成某项 任务。我们可以看到，在这样的齿轮组中，如果有一个齿轮出了问题，就可能会影响到整个齿轮组的正常运转。
齿轮组中齿轮之间的啮合关系,与软件系统中对象之间的耦合关系非常相似。对象之间的耦合关系是无法避免的，也是必要的，这是协同工作的基础。现在，伴随着 工业级应用的规模越来越庞大，对象之间的依赖关系也越来越复杂，经常会出现对象之间的多重依赖性关系，因此，架构师和设计师对于系统的分析和设计，将面临 更大的挑战。对象之间耦合度过高的系统，必然会出现牵一发而动全身的情形。

![图2：对象之间复杂的依赖关系](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-092743.jpeg)

耦合关系不仅会出现在对象与对象之间，也会出现在软件系统的各模块之间，以及软件系统和硬件系统之间。如何降低系统之间、模块之间和对象之间的耦合度，是软件工程永远追求的目标之一。**为了解决对象之间的耦合度过高的问题，软件专家Michael Mattson提出了IOC理论，用来实现对象之间的“解耦”，目前这个理论已经被成功地应用到实践当中，很多的J2EE项目均采用了IOC框架产品Spring。**

2、什么是控制反转(IoC)

IOC是Inversion of Control的缩写，多数书籍翻译成“控制反转”，还有些书籍翻译成为“控制反向”或者“控制倒置”。
1996年，Michael Mattson在一篇有关探讨面向对象框架的文章中，首先提出了IOC 这个概念。对于面向对象设计及编程的基本思想，前面我们已经讲了很多了，不再赘述，简单来说就是把复杂系统分解成相互合作的对象，这些对象类通过封装以 后，内部实现对外部是透明的，从而降低了解决问题的复杂度，而且可以灵活地被重用和扩展。IOC理论提出的观点大体是这样的：借助于“第三方”实现具有依 赖关系的对象之间的解耦，如下图：

![图3：IOC解耦过程](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-092740.jpeg)

大家看到了吧，由于引进了中间位置的“第三方”，也就是IOC容器，使得A、B、C、D这4个对象没有了耦合关系，齿轮之间的传动全部依靠“第三 方”了，全部对象的控制权全部上缴给“第三方”IOC容器，所以，IOC容器成了整个系统的关键核心，它起到了一种类似“粘合剂”的作用，把系统中的所有 对象粘合在一起发挥作用，如果没有这个“粘合剂”，对象与对象之间会彼此失去联系，这就是有人把IOC容器比喻成“粘合剂”的由来。
我们再来做个试验：把上图中间的IOC容器拿掉，然后再来看看这套系统：

![图4：拿掉IoC容器后的系统](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-092738.jpeg)

我们现在看到的画面，就是我们要实现整个系统所需要完成的全部内容。这时候，A、B、C、D这4个对象之间已经没有了耦合关系，彼此毫无联系，这样 的话，当你在实现A的时候，根本无须再去考虑B、C和D了，对象之间的依赖关系已经降低到了最低程度。所以，如果真能实现IOC容器，对于系统开发而言， 这将是一件多么美好的事情，参与开发的每一成员只要实现自己的类就可以了，跟别人没有任何关系！
我们再来看看，控制反转(IOC)到底为什么要起这么个名字？我们来对比一下：
软件系统在没有引入IOC容器之前，如图1所示，对象A依赖于对象B，那么对象A在初始化或者运行到某一点的时候，自己必须主动去创建对象B或者使用已经创建的对象B。无论是创建还是使用对象B，控制权都在自己手上。
软件系统在引入IOC容器之后，这种情形就完全改变了，如图3所示，由于IOC容器的加入，对象A与对象B之间失去了直接联系，所以，当对象A运行到需要对象B的时候，IOC容器会主动创建一个对象B注入到对象A需要的地方。
通过前后的对比，我们不难看出来：对象A获得依赖对象B的过程,由主动行为变为了被动行为，控制权颠倒过来了，这就是“控制反转”这个名称的由来。

参考资料：https://www.cnblogs.com/jianmang/articles/4947615.html


### 3. 什么是控制反转(IOC)？什么是依赖注入（DI）？

IoC(Inversion of Control) – 控制反转。它不是一种技术，而是一种思想。

IOC：就是对象之间的依赖关系由容器来创建，对象之间的关系本来是由我们开发者自己创建和维护的，在我们使用Spring框架后，对象之间的关系由容器来创建和维护，将开发者做的事让容器做，这就是控制反转。BeanFactory接口是Spring Ioc容器的核心接口。

DI：我们在使用Spring容器的时候，容器通过调用set方法或者是构造器来建立对象之间的依赖关系。
控制反转是目标，依赖注入是我们实现控制反转的一种手段。

### 4. 描述一下 Spring Bean 的生命周期？

> 这道题是spring一道标准题目

按照阶段理解Spring中的bean的生命周期主要包含四个阶段：`实例化Bean --＞ Bean属性填充 --＞ 初始化Bean --＞销毁Bean`

![Spring Bean 的生命周期](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-092735.png)

1. Spring中的bean的生命周期主要包含四个阶段：实例化Bean --＞ Bean属性填充 --＞ 初始化Bean --＞销毁Bean

2. 首先是实例化Bean，当客户向容器请求一个尚未初始化的bean时，或初始化bean的时候需要注入另一个尚末初始化的依赖时，容器就会调用doCreateBean()方法进行实例化，实际上就是通过反射的方式创建出一个bean对象

3. Bean实例创建出来后，接着就是给这个Bean对象进行属性填充，也就是注入这个Bean依赖的其它bean对象

4. 属性填充完成后，进行初始化Bean操作，初始化阶段又可以分为几个步骤：

  a. 执行Aware接口的方法

  > Spring会检测该对象是否实现了xxxAware接口，通过Aware类型的接口，可以让我们拿到Spring容器的些资源。如实现BeanNameAware接口可以获取到BeanName，实现BeanFactoryAware接口可以获取到工厂对象BeanFactory等

  b. 执行BeanPostProcessor的前置处理方法postProcessBeforelnitialization()，对Bean进行一些自定义的前置处理

  c. 判断Bean是否实现了InitializingBean接口，如果实现了，将会执行lnitializingBean的afeterPropertiesSet()初始化方法；

  d. 执行用户自定义的初始化方法，如init-method等；

  e. 执行BeanPostProcessor的后置处理方法postProcessAfterinitialization()

5. 初始化完成后，Bean就成功创建了，之后就可以使用这个Bean， 当Bean不再需要时，会进行销毁操作，

  a. 首先判断Bean是否实现了DestructionAwareBeanPostProcessor接口，如果实现了，则会执行DestructionAwareBeanPostProcessor后置处理器的销毁回调方法
  b. 其次会判断Bean是否实现了DisposableBean接口，如果实现了将会调用其实现的destroy()方法
  c. 最后判断这个Bean是否配置了dlestroy-method等自定义的销毁方法，如果有的话，则会自动调用其配置的销毁方法；


### 5. Spring Bean 的作用域之间有什么区别？

**Spring器中的bean可以分为5个范围：**

1. singleton：这种bean范围是默认的，这种范围确保不管接受多少请求，每个容器中只有一个bean的实例，单例模式；
2. prototype：为每一个bean提供一个实例；
3. request：在请求bean范围内为每一个来自客户端的网络请求创建一个实例，在请求完毕后，bean会失效并被垃圾回收器回收；
4. session：为每个session创建一个实例，session过期后，bean会随之消失；
5. global-session：global-session和Portlet应用相关。当你的应用部署在Portlet容器中工作时，它包含很多portlet。如果你想要声明让所有的portlet公用全局的存储变量的话，那么全局变量需要存储在global-session中。

### 6. Spring中都应用了哪些设计模式

1、简单工厂模式

简单工厂模式的本质就是一个工厂类根据传入的参数，动态的决定实例化哪个类。

Spring中的BeanFactory就是简单工厂模式的体现，根据传入一个唯一的标识来获得bean对象。

2、工厂方法模式

应用程序将对象的创建及初始化职责交给工厂对象，工厂Bean。

定义工厂方法，然后通过config.xml配置文件，将其纳入Spring容器来管理，需要通过factory-method指定静态方法名称。

3、单例模式

Spring用的是双重判断加锁的单例模式，通过getSingleton方法从singletonObjects中获取bean。

```JAVA
     /**
     * Return the (raw) singleton object registered under the given name.
     * <p>Checks already instantiated singletons and also allows for an early
     * reference to a currently created singleton (resolving a circular reference).
     * @param beanName the name of the bean to look for
     * @param allowEarlyReference whether early references should be created or not
     * @return the registered singleton object, or {@code null} if none found
     */
    protected Object getSingleton(String beanName, boolean allowEarlyReference) {
        Object singletonObject = this.singletonObjects.get(beanName);
        if (singletonObject == null && isSingletonCurrentlyInCreation(beanName)) {
            synchronized (this.singletonObjects) {
                singletonObject = this.earlySingletonObjects.get(beanName);
                if (singletonObject == null && allowEarlyReference) {
                    ObjectFactory<?> singletonFactory = this.singletonFactories.get(beanName);
                    if (singletonFactory != null) {
                        singletonObject = singletonFactory.getObject();
                        this.earlySingletonObjects.put(beanName, singletonObject);
                        this.singletonFactories.remove(beanName);
                    }
                }
            }
        }
        return (singletonObject != NULL_OBJECT ? singletonObject : null);
    }
```

4、代理模式

Spring的AOP中，使用的Advice（通知）来增强被代理类的功能。Spring实现AOP功能的原理就是代理模式（① JDK动态代理，② CGLIB字节码生成技术代理。）对类进行方法级别的切面增强。

5、装饰器模式

装饰器模式：动态的给一个对象添加一些额外的功能。

Spring的ApplicationContext中配置所有的DataSource。这些DataSource可能是不同的数据库，然后SessionFactory根据用户的每次请求，将DataSource设置成不同的数据源，以达到切换数据源的目的。

在Spring中有两种表现：

一种是类名中含有Wrapper，另一种是类名中含有Decorator。

6、观察者模式

定义对象间的一对多的关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并自动更新。

Spring中观察者模式一般用在listener的实现。

7、策略模式

策略模式是行为性模式，调用不同的方法，适应行为的变化 ，强调父类的调用子类的特性 。

getHandler是HandlerMapping接口中的唯一方法，用于根据请求找到匹配的处理器。

8、模板方法模式

Spring JdbcTemplate的query方法总体结构是一个模板方法+回调函数，query方法中调用的execute()是一个模板方法，而预期的回调doInStatement(Statement state)方法也是一个模板方法。



### 7. Spring AOP里面的几个名词的概念

（1）连接点（Join point）：指程序运行过程中所执行的方法。在Spring AOP中，一个连接点总代表一个方法的执行。 

（2）切面（Aspect）：被抽取出来的公共模块，可以用来会横切多个对象。Aspect切面可以看成 Pointcut切点 和 Advice通知 的结合，一个切面可以由多个切点和通知组成。

> 在Spring AOP中，切面可以在类上使用 @AspectJ 注解来实现。

（3）切点（Pointcut）：切点用于定义 要对哪些Join point进行拦截。

> 切点分为execution方式和annotation方式。execution方式可以用路径表达式指定对哪些方法拦截，比如指定拦截add*、search*。annotation方式可以指定被哪些注解修饰的代码进行拦截。

（4）通知（Advice）：指要在连接点（Join Point）上执行的动作，即增强的逻辑，比如权限校验和、日志记录等。通知有各种类型，包括Around、Before、After、After returning、After throwing。

（5）目标对象（Target）：包含连接点的对象，也称作被通知（Advice）的对象。 由于Spring AOP是通过动态代理实现的，所以这个对象永远是一个代理对象。

（6）织入（Weaving）：通过动态代理，在目标对象（Target）的方法（即连接点Join point）中执行增强逻辑（Advice）的过程。

（7）引入（Introduction）：添加额外的方法或者字段到被通知的类。Spring允许引入新的接口（以及对应的实现）到任何被代理的对象。例如，你可以使用一个引入来使bean实现 IsModified 接口，以便简化缓存机制。

几个概念的关系图可以参考下图：

![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-092731.png)

网上有张非常形象的图，描述了各个概念所处的场景和作用，贴在这里供大家理解：

![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-092729.png)

### 8. BeanFactory和ApplicationContext有什么区别？

BeanFactory和ApplicationContext是Spring的两大核心接口，都可以当做Spring的容器。

1. BeanFactory是Spring里面最底层的接口，是IoC的核心，定义了IoC的基本功能，包含了各种Bean的定义、加载、实例化，依赖注入和生命周期管理。ApplicationContext接口作为BeanFactory的子类，除了提供BeanFactory所具有的功能外，还提供了更完整的框架功能：

- 继承MessageSource，因此支持国际化。
- 资源文件访问，如URL和文件（ResourceLoader）。
- 载入多个（有继承关系）上下文（即同时加载多个配置文件） ，使得每一个上下文都专注于一个特定的层次，比如应用的web层。
- 提供在监听器中注册bean的事件。

2. 
    a. BeanFactroy采用的是延迟加载形式来注入Bean的，只有在使用到某个Bean时(调用getBean())，才对该Bean进行加载实例化。这样，我们就不能提前发现一些存在的Spring的配置问题。如果Bean的某一个属性没有注入，BeanFacotry加载后，直至第一次使用调用getBean方法才会抛出异常。

  b. ApplicationContext，它是在容器启动时，一次性创建了所有的Bean。这样，在容器启动时，我们就可以发现Spring中存在的配置错误，这样有利于检查所依赖属性是否注入。 

  c. ApplicationContext启动后预载入所有的单实例Bean，所以在运行的时候速度比较快，因为它们已经创建好了。相对于BeanFactory，ApplicationContext 唯一的不足是占用内存空间，当应用程序配置Bean较多时，程序启动较慢。

3. BeanFactory和ApplicationContext都支持BeanPostProcessor、BeanFactoryPostProcessor的使用，但两者之间的区别是：BeanFactory需要手动注册，而ApplicationContext则是自动注册。

4. BeanFactory通常以编程的方式被创建，ApplicationContext还能以声明的方式创建，如使用ContextLoader。


### 9. Spring如何解决循环依赖问题：

见：https://javapub.blog.csdn.net/

循环依赖问题在Spring中主要有三种情况：

- （1）通过构造方法进行依赖注入时产生的循环依赖问题。
- （2）通过setter方法进行依赖注入且是在多例（原型）模式下产生的循环依赖问题。
- （3）通过setter方法进行依赖注入且是在单例模式下产生的循环依赖问题。

在Spring中，只有第（3）种方式的循环依赖问题被解决了，其他两种方式在遇到循环依赖问题时都会产生异常。这是因为：

- 第一种构造方法注入的情况下，在new对象的时候就会堵塞住了，其实也就是”先有鸡还是先有蛋“的历史难题。
- 第二种setter方法（多例）的情况下，每一次getBean()时，都会产生一个新的Bean，如此反复下去就会有无穷无尽的Bean产生了，最终就会导致OOM问题的出现。

Spring在单例模式下的setter方法依赖注入引起的循环依赖问题，主要是通过二级缓存和三级缓存来解决的，其中三级缓存是主要功臣。解决的核心原理就是：在对象实例化之后，依赖注入之前，Spring提前暴露的Bean实例的引用在第三级缓存中进行存储。

**第一种构造方法注入的情况：**

> 例如：类A通过构造函数注入需要类B的实例，而类B通过构造函数注入需要类A的实例。如果将A类和B类的bean配置为相互注入，则Spring IoC容器会在运行时检测此循环引用，并抛出a `BeanCurrentlyInCreationException`。
> 一种可能的解决方案是编辑由setter而不是构造函数配置的某些类的源代码。或者，避免构造函数注入并仅使用setter注入。换句话说，尽管不推荐使用，但您可以使用setter注入配置循环依赖关系。
> 与典型情况（没有循环依赖）不同，bean A和bean B之间的循环依赖强制其中一个bean在完全初始化之前被注入另一个bean（经典的鸡与鸡蛋场景）。

```xml
    <bean id="person" class="pojo.Person">
        <constructor-arg index="0" value="小明"/>
        <constructor-arg index="1" value="12"/>
        <constructor-arg index="2" value="student"/>
    </bean>

    <bean id="student" class="pojo.Student">
        <constructor-arg index="0" value="小王"/>
        <constructor-arg index="1" value="13"/>
        <constructor-arg index="2" value="person"/>
    </bean>
```

### 10. Spring事务的实现方式和实现原理：

Spring事务的本质其实就是数据库对事务的支持，没有数据库的事务支持，spring是无法提供事务功能的。Spring只提供统一事务管理接口，具体实现都是由各数据库自己实现，数据库事务的提交和回滚是通过 redo log 和 undo log实现的。Spring会在事务开始时，根据当前环境中设置的隔离级别，调整数据库隔离级别，由此保持一致。

**1. Spring事务的种类：**

spring支持编程式事务管理和声明式事务管理两种方式：

a. 编程式事务管理使用 TransactionTemplate。

b. 声明式事务管理建立在AOP之上的。其本质是通过AOP功能，对方法前后进行拦截，将事务处理的功能编织到拦截的方法中，也就是在目标方法开始之前启动一个事务，在执行完目标方法之后根据执行情况提交或者回滚事务。

> 声明式事务最大的优点就是不需要在业务逻辑代码中掺杂事务管理的代码，只需在配置文件中做相关的事务规则声明或通过@Transactional注解的方式，便可以将事务规则应用到业务逻辑中，减少业务代码的污染。唯一不足地方是，最细粒度只能作用到方法级别，无法做到像编程式事务那样可以作用到代码块级别。


**2. spring的事务传播机制：**


spring事务的传播机制说的是，当多个事务同时存在的时候，spring如何处理这些事务的行为。事务传播机制实际上是使用简单的ThreadLocal实现的，所以，如果调用的方法是在新线程调用的，事务传播实际上是会失效的。

> ① PROPAGATION_REQUIRED：（默认传播行为）如果当前没有事务，就创建一个新事务；如果当前存在事务，就加入该事务。
> 
> ② PROPAGATION_REQUIRES_NEW：无论当前存不存在事务，都创建新事务进行执行。
> 
> ③ PROPAGATION_SUPPORTS：如果当前存在事务，就加入该事务；如果当前不存在事务，就以非事务执行。‘
> 
> ④ PROPAGATION_NOT_SUPPORTED：以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。
> 
> ⑤ PROPAGATION_NESTED：如果当前存在事务，则在嵌套事务内执行；如果当前没有事务，则按REQUIRED属性执行。
> 
> ⑥ PROPAGATION_MANDATORY：如果当前存在事务，就加入该事务；如果当前不存在事务，就抛出异常。
> 
> ⑦ PROPAGATION_NEVER：以非事务方式执行，如果当前存在事务，则抛出异常。

事务不只限于脏读、幻读等名词。

**3. Spring中的隔离级别：**

> ① ISOLATION_DEFAULT：这是个 PlatfromTransactionManager 默认的隔离级别，使用数据库默认的事务隔离级别。
> 
> ② ISOLATION_READ_UNCOMMITTED：读未提交，允许事务在执行过程中，读取其他事务未提交的数据。
> 
> ③ ISOLATION_READ_COMMITTED：读已提交，允许事务在执行过程中，读取其他事务已经提交的数据。
> 
> ④ ISOLATION_REPEATABLE_READ：可重复读，在同一个事务内，任意时刻的查询结果都是一致的。
> 
> ⑤ ISOLATION_SERIALIZABLE：所有事务逐个依次执行。


低谷蓄力


**最少必要面试题**




[10道不得不会的Java基础面试题](https://mp.weixin.qq.com/s/3Nviyml0cvnX_HHkZ5DjWg)

[10道不得不会的Java容器面试题](https://mp.weixin.qq.com/s/ug3LBR4MfM1C5uVFJaPWLQ)

[10道不得不会的Java并发基础面试题](https://mp.weixin.qq.com/s/h2tTwDVqL15rCI6rftgn9A)

[10道不得不会的JavaEE面试题](https://mp.weixin.qq.com/s/59Tif95LGi8BTJXu47zi6g)

[10道不得不会的JVM面试题](https://mp.weixin.qq.com/s/hvsaD1NlzpR0LpP-GmbU_A)

[10道不得不会的MySQL基础面试题](https://mp.weixin.qq.com/s/yVPwCoSQ-8OYvhw8bH0PtA)

[10道不得不会的MyBatis面试题](https://mp.weixin.qq.com/s/lVFwy765hQ2FvIYBHyw0yA)

[10道不得不会的Spring面试题](https://mp.weixin.qq.com/s/lrHsLZANxHxd_FWTCdMNJw)

[10道不得不会的SpringBoot面试题](https://mp.weixin.qq.com/s/-oYKVXBaQwzyzp7ffqH7gw)

[10道不得不会的ElasticSearch面试题](https://mp.weixin.qq.com/s/z3D37HqeTUmwrdheUL_Efw)

[10道不得不会的Redis面试题](https://mp.weixin.qq.com/s/_Pq2VgxRA4yw1j_eCfEiLg)

[10道不得不会的Kafka面试题](https://javapub.blog.csdn.net/category_11740063.html)

[10道不得不会的Zookeeper面试题](https://mp.weixin.qq.com/s/ym0-x6okFi0CgF8RcxeLFA)

[10道不得不会的Docker面试题](https://mp.weixin.qq.com/s/DTC3gZNHm3Rlf_GK7twlkQ)

[10道不得不会的缓存面试题]()






