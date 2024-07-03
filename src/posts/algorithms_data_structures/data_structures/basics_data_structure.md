---
title: 学习基础数据结构
icon: lightbulb
---





# 数据结构

`阅读大概需要10分钟，基础知识资料较长，建议收藏阅读`

[toc]

## 数据结构和算法的基本概念
### 数据、数据元素、数据逻辑结构、数据存储结构、数据类型、抽象数据类型等
### 算法、算法设计的要求、算法效率的度量、算法存储空间的需求等

## 线性数据结构
### 栈、队列和线性表的定义和基本概念


- 线性表

Java里一个很重要的数据结构——线性表，线性表里的元素是按线性排列的（这里的线性指逻辑上的），线性表分为两大类，分别是顺序表和链表。

- 栈

栈是一种采用“后进先出”策略的数据结构类型。其本质意义也是线性表的一种，不过是一种特殊的线性表。栈顶记做，top，栈底记做，bottom。

栈有一个非常非常重要的一个特点：只允许在栈顶进行数据元素的插入或删除操作。根据这一特点我们可知，栈基本上只有两种操作，一是插入操作，另一个是删除操作。栈的插入操作也称为：进栈，压栈，入栈。栈的删除操作也称为，出栈，弹栈。英文记做，push(压栈),pop(弹栈)。“后进先出”策略英文记为，“LIFO”，Last In First Out。

- 队列

队列是一种特殊的线性表，它只允许在表的前端进行删除操作，而在表的后端进行插入操作。支持先进先出 FIFO，跟我们生活中的排队类似。

### 栈、队列和线性表的实现，包括顺序和链式存储结构

#### 线性表

线性表有两种实现方式，顺序存储和链式存储。

顺序存储结构是元素在存储器中的相对位置来表示数据元素之间的逻辑关系。

链式存储结构是依靠指针(Java中引用)来表现数据元素之间的逻辑关系。

API:

```java
public interface List<E> {
    /**
     * 清空线性表
     */
    void clean();

    /**
     * 判断线性表是否为空
     *
     * @return true:空，false:非空
     */
    boolean isEmpty();

    /**
     * 获取线性表的元素个数
     *
     * @return 线性表的元素个数
     */
    int length();


    /**
     * 添加元素
     *
     * @param elem 添加元素
     */
    void addElem(E elem);

    /**
     * 添加线性表
     *
     * @param list 待添加的线性表
     */
    void addAll(List<? extends E> list);

    /**
     * 指定位置插入元素
	 *
	 *	1.将插入位置index的元素和之后的元素往后移动一位
	 *	2.将位置index的元素赋值
     *
     * @param index 插入位置
     * @param elem  插入元素
     */
    void insertElem(int index, E elem);

    /**
     * 替换元素
     *
     * @param target  被替换元素
     * @param replace 替换元素
     * @return 替换的元素个数
     */
    int replace(E target, E replace);

    /**
     * 获取指定位置的元素
     *
     * @param index 查找位置
     * @return 位置对应的元素
     */
    E indexOf(int index);

    /**
     * 查找指定元素的位置
     *
     * @param elem 待查找元素
     * @return 第一次查找到元素的位置
     */
    int locateElem(E elem);

    /**
     * 获取指定元素的所有位置
     *
     * @param elem 待查找元素
     * @return 查找元素的所有位置
     */
    List<Integer> locateElements(E elem);

    /**
     * 批量删除元素
     *
     * @param elem 待删除的元素
     * @return 删除元素的位置
     */
    int removeElements(E elem);

    /**
     * 删除指定位置的元素
     * 将index之后的元素往前面移动一位
	 * 
     * @param index 删除的位置
     * @return 删除位置的元素
     */
    E removeElem(int index);

    /**
     * 转化为数组
     * @return 返回数组
     */
    Object[] toArray();
}
```

##### 顺序存储实现（例如ArrayList）

```java
public class ArrayList<E> implements List<E> {
    //默认存储容器大小
    private int defaultCapacity = 10;
    //存储容器
    private Object[] elemData;
    //元素个数
    private int size;

    /**
     * 初始化存储容器
     */
    public ArrayList() {
        elemData = new Object[defaultCapacity];
    }

    /**
     * 初始化存储容器并且添加元素
     *
     * @param initialList 待添加的线性表
     */
    public ArrayList(List<? extends E> initialList) {
        this();
        addAll(initialList);
    }

    /**
     * 初始化存储容器
     *
     * @param initialCapacity 存储容器初始大小
     */
    public ArrayList(int initialCapacity) {
        elemData = new Object[initialCapacity];
    }

    /**
     * 检查位置是否合法
     *
     * @param index 待检查位置
     * @throws IndexOutOfBoundsException 位置不合法异常
     */
    private void rangeCheck(int index) throws IndexOutOfBoundsException {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException(index + "超出线性表范围");
        }
    }

    /**
     * 确保容量够用
     *
     * @param length 添加后的容量
     */
    private void ensureCapacity(int length) {
        if (length > elemData.length) {
            extendedCapacity(length);
        }
    }

    /**
     * 1.5倍扩容
     *
     * @param length 至少需要的大小
     * @throws OutOfMemoryError 分配内存失败
     */
    private void extendedCapacity(int length) throws OutOfMemoryError {
        int extendedLength = length;
        extendedLength = extendedLength + extendedLength >> 1;
        try {
            elemData = Arrays.copyOf(elemData, extendedLength);
        } catch (OutOfMemoryError error) {
            throw new OutOfMemoryError("扩容失败");
        }
    }

    public void clean() {
        elemData = new Object[defaultCapacity];
        size = 0;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public int length() {
        return size;
    }

    public void addElem(E elem) {
        ensureCapacity(size + 1);
        elemData[size++] = elem;
    }

    public void addAll(List<? extends E> list) {
        if (list == null) {
            return;
        }
        ensureCapacity(list.length() + size);

        System.arraycopy(list.toArray(), 0, elemData, size, list.length());
        size += list.length();
    }

    public void insertElem(int index, E elem) {
        if (index < 0 || index > size) {
            throw new IndexOutOfBoundsException(index + "超出线性表范围");
        }
        ensureCapacity(size + 1);
        System.arraycopy(elemData, index, elemData, index + 1, size++ - index);
        elemData[index] = elem;
    }


    public int replace(E target, E replace) {
        int count = 0;
        if (target == null) {
            for (int i = 0; i < size; i++) {
                if (elemData[i] == null) {
                    count++;
                    elemData[i] = replace;
                }
            }
        } else {
            for (int i = 0; i < size; i++) {
                if (elemData[i].equals(target)) {
                    count++;
                    elemData[i] = replace;
                }
            }
        }
        return count;
    }

    public E indexOf(int index) {
        rangeCheck(index);
        return (E) elemData[index];
    }

    public int locateElem(E elem) {
        if (elem == null) {
            for (int i = 0; i < size; i++) {
                if (elemData[i] == null) {
                    return i;
                }
            }
        } else {
            for (int i = 0; i < size; i++) {
                if (elemData[i].equals(elem)) {
                    return i;
                }
            }
        }
        return -1;
    }

    public List<Integer> locateElements(E elem) {
        List<Integer> result = new ArrayList<>();
        if (elem == null) {
            for (int i = 0; i < size; i++) {
                if (elemData[i] == null) {
                    result.addElem(i);
                }
            }
        } else {
            for (int i = 0; i < size; i++) {
                if (elemData[i] != null && elemData[i].equals(elem)) {
                    result.addElem(i);
                }
            }
        }
        return result;
    }

    public int removeElements(E elem) {
        int result = 0;
        List<Integer> list = locateElements(elem);
        for (int i = 0; i < list.length(); i++) {
            removeElem(list.indexOf(i) - result++);
        }
        return result;
    }

    /**
     * 删除元素
     * 使用System.arrayCopy是调用native方法,效率会比自己写的循环高
     * @param index 删除的位置
     * @return 删除的元素
     */
    public E removeElem(int index) {
        E result = (E) elemData[index];
        System.arraycopy(elemData, index + 1, elemData, index, size-- - index - 1);
        return result;
    }

    public Object[] toArray() {
        return Arrays.copyOf(elemData, size);
    }
}
```

##### 链式存储实现（LinkedList）（双向链表）


删除操作：

1. 找到待删除节点delete的前一个节点prev
2. 将prev的next指针指向delete的下一个节点
3. 将delete的next指针指向null,帮助GC回收

插入操作:

1. 找到待插入位置的前一个节点prev
2. 新生成一个节点add
3. 保存节点after为add的下一个节点
4. 将add节点的next指针指向after
5. 将prev节点的next指针指向add

```java
public class LinkedList<E> implements List<E> {
    //头结点
    private Node<E> head;
    //元素个数
    private int size;

    //节点元素
    private class Node<E> {
        //节点数据
        private E elem;
        //指向下一个元素
        private Node<E> next;
    }

    public LinkedList() {
        head = new Node<>();
    }

    public LinkedList(List<? extends E> list) {
        this();
        addAll(list);
    }

    /**
     * 检查位置是否合法
     *
     * @param index 待检查位置
     * @throws IndexOutOfBoundsException 位置不合法异常
     */
    private void rangeCheck(int index) throws IndexOutOfBoundsException {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException(index + "超出线性表范围");
        }
    }

    /**
     * 获取指定节点的node
     *
     * @param index 索引位置
     * @return 索引位置的节点
     */
    private Node<E> getNode(int index) {
        if (index == -1) {
            return head;
        }
        Node<E> iterator = head.next;
        for (int i = 0; i < index; i++) {
            iterator = iterator.next;
        }

        return iterator;
    }

    @Override
    public void clean() {
        head = null;
        size = 0;
    }

    @Override
    public boolean isEmpty() {
        return size == 0;
    }

    @Override
    public int length() {
        return size;
    }

    @Override
    public void addElem(E elem) {
        Node<E> addNode = new Node<>();
        addNode.elem = elem;

        Node<E> iterator = head;
        while (iterator.next != null) {
            iterator = iterator.next;
        }
        iterator.next = addNode;
        size++;
    }

    /**
     * 这里没有调用addElem来添加元素
     * 原因为:调用addElem添加的时间复杂度为o(n²)
     * 使用以下方法添加的时间复杂度为o(n)
     * 当然你也可以再添加一个尾节点指针
     *
     * @param list 待添加的线性表
     */
    @Override
    public void addAll(List<? extends E> list) {
        if (list == null || list.length() == 0) {
            return;
        }

        Node<E> iterator = head;
        //时间复杂度O(n)
        while (iterator.next != null) {
            iterator = iterator.next;
        }

        Node<E> addNodeHeader = new Node<>();
        Node<E> addNodeIterator = addNodeHeader;
        //时间复杂度O(n)
        E[] addElements = (E[]) list.toArray();
        //时间复杂度O(n)
        for (int i = 0; i < addElements.length; i++) {
            Node<E> node = new Node<>();
            node.elem = addElements[i];
            addNodeIterator.next = node;
            addNodeIterator = node;
        }
        iterator.next = addNodeHeader.next;
        //断开连接,帮助GC回收
        addNodeHeader.next = null;
    }

    @Override
    public void insertElem(int index, E elem) {
        if (index < 0 || index > size) {
            throw new IndexOutOfBoundsException(index + "位置不合法");
        }

        Node<E> prev = getNode(index - 1);
        Node<E> addNode = new Node<>();
        addNode.elem = elem;
        addNode.next = prev.next;
        prev.next = addNode;
        size++;
    }

    @Override
    public int replace(E target, E replace) {
        Node<E> iterator = head.next;
        int result = 0;
        if (target == null) {
            while (iterator != null) {
                if (iterator.elem == null) {
                    iterator.elem = replace;
                    result++;
                }
                iterator = iterator.next;
            }
        } else {
            while (iterator != null) {
                if (iterator.elem != null && iterator.elem.equals(target)) {
                    iterator.elem = replace;
                    result++;
                }
                iterator = iterator.next;
            }
        }

        return result;
    }

    @Override
    public E indexOf(int index) {
        rangeCheck(index);
        //通过上次校验，肯定含有此位置。所以没有按照传统的方法来写。
        //传统方法可以参考子标题下面的伪代码

        return getNode(index).elem;
    }

    @Override
    public int locateElem(E elem) {
        Node<E> iterator = head.next;
        int result = 0;
        if (elem == null) {
            while (iterator != null) {
                if (iterator.elem == null)
                    return result;
                result++;
                iterator = iterator.next;
            }
        } else {
            while (iterator != null) {
                if (iterator.elem != null && iterator.elem.equals(elem)) {
                    return result;
                }
                result++;
                iterator = iterator.next;
            }
        }
        return -1;
    }

    @Override
    public List<Integer> locateElements(E elem) {
        List<Integer> list = new ArrayList<>();
        Node<E> iterator = head.next;
        int index = 0;
        if (elem == null) {
            while (iterator != null) {
                if (iterator.elem == null) {
                    list.addElem(index);
                }
                index++;
                iterator = iterator.next;
            }
        } else {
            while (iterator != null) {
                if (iterator.elem != null && iterator.elem.equals(elem)) {
                    list.addElem(index);
                }
                index++;
                iterator = iterator.next;
            }

        }

        return list;
    }

    @Override
    public int removeElements(E elem) {
        Node<E> iterator = head.next;
        Node<E> prev = head;
        int result = 0;
        if (elem == null) {
            while (iterator != null) {
                if (iterator.elem == null) {
                    prev.next = iterator.next;
                    iterator.next = null;
                    iterator = prev.next;
                    result++;
                    continue;
                }
                prev = prev.next;
                iterator = iterator.next;
            }
        } else {
            while (iterator != null) {
                if (iterator.elem != null && iterator.elem.equals(elem)) {
                    prev.next = iterator.next;
                    iterator.next = null;
                    iterator = prev.next;
                    result++;
                    continue;
                }
                prev = prev.next;
                iterator = iterator.next;
            }
        }
        return result;
    }

    @Override
    public E removeElem(int index) {
        rangeCheck(index);
        Node<E> prev = getNode(index - 1);
        Node<E> delNode = prev.next;
        prev.next = delNode.next;
        E result = delNode.elem;

        //help GC
        delNode.next = null;
        size--;

        return result;
    }

    @Override
    public Object[] toArray() {
        Node<E> iterator = head.next;
        Object[] result = new Object[size];
        int loop = 0;
        while (iterator != null) {
            result[loop++] = iterator.elem;
            iterator = iterator.next;
        }
        return result;
    }
}
```

#### 队列

队列同样是一种特殊的线性表，其插入和删除的操作分别在表的两端进行，队列的特点就是**先进先出**(First In First Out)。我们把向队列中插入元素的过程称为入队(Enqueue|push)，删除元素的过程称为出队(Dequeue|pop)并把允许入队的一端称为队尾，允许出的的一端称为队头，没有任何元素的队列则称为空队。

关于队列的操作，我们这里主要实现**入队，出队，判断空队列和清空队列**等操作，声明队列接口Queue（队列抽象数据类型）如下：



##### 顺序队列

顺序队列的实现可以使用数组来完成，一端做push，另一端做pop操作。下面是队列的操作示意图。

![顺序队列](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091050.png)

所以我们通常将数组弄成一个环状，即队头和队尾相连，这样就形成了“循环队列”，同时也解决了“假溢出”现象。循环队列是改进版的顺序队列。


![循环顺序队列](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091053.png)



对于普通队列的 push 或 pop 我们只需要对尾指针或头指针进行自增操作即可，但是循环队列我们就不能单纯的进行自增，当 front 或 rear=maxSize-1 时我们就不能进行自增操作了，比如一个队列尾长度为 4 的数组 datas[4]，那么当 front 或rear需要在 0,1,2,3 之间进行循环“推进”，以此达到循环队列的效果。所以我们可以使用 **rear = （rear+1）%maxSize ；front = （front+1）%maxSize** ；公式进行指针计算。

　　需要注意的是：队空状态的条件为：front = rear。而如果整个队列全部存满数据那么，队满的条件也是 front = rear；所以循环队列需要损失一个存储空间，如下图：




![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091055.png)



解决了这些问题我们就可以很轻松地实现循环队列了：
　

```java
package com.my.queue;

/**
 * @Author: wangshiyu javapub rodert
 * @Date: 2020/12/19 18:13
 */

public class SqQueue<T> {
    private T[] datas;//使用数组作为队列的容器
    private int maxSize;//队列的容量
    private int front;//头指针
    private int rear;//尾指针

    //初始化队列
    public SqQueue(int maxSize) {
        if (maxSize < 1) {
            maxSize = 1;
        }
        this.maxSize = maxSize;
        this.front = 0;
        this.rear = 0;
        this.datas = (T[]) new Object[this.maxSize];
    }

    //两个状态:队空&队满
    public boolean isNull() {
        if (this.front == this.rear)
            return true;
        else
            return false;
    }

    public boolean isFull() {
        if ((rear + 1) % this.maxSize == front)
            return true;
        else
            return false;
    }

    //初始化队列
    public void initQueue() {
        this.front = 0;
        this.front = 0;
    }

    //两个操作:进队&出队
    public boolean push(T data) {
        if (isFull())
            return false;//队满则无法进队
        else {
            datas[rear] = data;//进队
            rear = (rear + 1) % maxSize;//队尾指针+1.
            return true;
        }
    }

    public T pop() {
        if (isNull())
            return null;//对空无法出队
        else {
            T popData = datas[front++];//出队
            front = (front + 1) % maxSize;//队头指针+1
            return popData;
        }
    }

    //get()
    public T[] getDatas() {
        return datas;
    }

    public int getMaxSize() {
        return maxSize;
    }

    public int getFront() {
        return front;
    }

    public int getRear() {
        return rear;
    }

}
```

测试一下：

```java
class s {

    public static void main(String[] args) {
        SqQueue<Character> queue = new SqQueue<Character>(4);

        //判断
        System.out.println("队列是否为空：" + queue.isNull());

        //入队A,B,C
        queue.push('A');
        queue.push('B');
        queue.push('C');

        System.out.println("队列是否为满：" + queue.isFull());

        //出队
        Character data = queue.pop();
        System.out.println("出队：" + data);
    }

}
```

运行结果：

```bash
队列是否为空：true
队列是否为满：true
出队：A
```

##### 链式队列

链队实现，如图所示：

![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091100.png)



链队的实现很简单，只要理解了链表的操作和队列的特点即可。（上文有写到链表的实现）


```java
package com.my.queue;

/**
 * @Author: wangshiyu javapub rodert
 * @Date: 2020/12/19 18:30
 */

public class LinkQueue<T> {
    private QNode<T> front;//队头指针
    private QNode<T> rear;//队尾指针
    private int maxSize;//为了便于操作，使用这个变量表示链队的数据容量

    //初始化
    public LinkQueue() {
        this.front = new QNode<T>();
        this.rear = new QNode<T>();
        this.maxSize = 0;
    }

    //初始化队列
    public void initQueue() {
        front.next = null;
        rear.next = null;
        maxSize = 0;
    }

    //队空判断
    public boolean isNull() {
        if (front.next == null || rear.next == null)
            return true;
        else
            return false;
    }

    //进队
    public void push(QNode<T> node) {
        if (isNull()) {
            //第一次
            front.next = node;
            rear.next = node;
            maxSize++;
        } else {
            node.next = front.next;
            front.next = node;
            maxSize++;
        }
    }

    //出队
    public QNode<T> pop() {
        if (isNull())
            return null;//队为空时，无法出队
        else if (maxSize == 1) {
            //队只有一个元素时直接初始化即可
            QNode<T> node = front.next;
            initQueue();
            return node;
        } else {
            //准备工作
            QNode<T> p = front;//使用p指针来遍历队列
            for (int i = 1; i < maxSize - 1; i++)
                p = p.next;
            //pop
            QNode<T> node = rear.next;
            rear.next = p.next;
            maxSize--;
            return node;
        }
    }

}

//链队结点
class QNode<T> {
    private T data;//数据域
    public QNode<T> next;//指针域

    //初始化1
    public QNode() {
        this.data = null;
        this.next = null;
    }

    //初始化2
    public QNode(T data) {
        this.data = data;
        this.next = null;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

}
```

测试运行：

```java
class d {
    public static void main(String[] args) {
        LinkQueue<Integer> lq = new LinkQueue<Integer>();

        System.out.println("队列是否为空：" + lq.isNull());

        //依次插入1、2、3、4
        lq.push(new QNode<Integer>(1));
        lq.push(new QNode<Integer>(2));
        lq.push(new QNode<Integer>(3));
        lq.push(new QNode<Integer>(4));

        //依次出队
        System.out.println("依次出队：");
        while (!lq.isNull()) {
            System.out.println(lq.pop().getData());
        }
    }
}
```

运行结果：

```bash
队列是否为空：true
依次出队：
1
2
3
4
```

#### 栈的实现
##### 顺序栈
##### 链式栈

### 栈、队列和线性表的应用

## 基础排序
### 排序的概念和分类
### 直接插入排序、希尔排序和基数排序

## 哈希表
### 哈希表的构造
### 哈希表的实现

## 递归
### 递归函数的执行过程
### 折半查找、归并排序和快速排序
### 广义表的定义、存储与实现

## 二叉树
### 二叉树的定义及其主要特征
### 二叉树的实现，包括顺序和链式存储
### 二叉树的遍历
### 堆和堆排序
### 二叉排序树
### 二叉平衡树

## 树和森林
### 树的定义以及树的存储结构，包括双亲、双亲孩子和孩子兄弟表示法
### 树和森林与二叉树的转换
### 数和森林的遍历
### 并查集
### B-树及其基本操作，B+树的基本概念

## 图 
### 图的定义和基本概念
### 图的实现，包括数组（邻接矩阵）和领接表表示法
### 图的遍历
### 图的典型应用
#### 最小生成树
#### 最短路径
#### 拓扑排序
#### 关键路径

