---
title: 桶排序就是这么容易
icon: lightbulb
---





[toc]

![img](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091327.png)


## 前言

> 声明：参考来源互联网，有任何争议可以留言。站在前人的肩上，我们才能看的更远。

> 本教程纯手打，致力于最实用教程，不需要什么奖励，只希望多多转发支持。
> 欢迎来我公众号，希望可以结识你，也可以催更，微信搜索：JavaPub

> 有任何问题都可以来谈谈 ！

![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091246.jpeg)

如果看上一篇**[计数排序](https://mp.weixin.qq.com/s/7lphoHUgfDu0Cb1cO8ExKA)**，你有没有这样疑问，当每个数据之间跨度过大(如从 0-2亿 数字中排序 20 个数)，就需要大量空间消耗。**桶排序**就是对**[计数排序](https://mp.weixin.qq.com/s/7lphoHUgfDu0Cb1cO8ExKA)**的改进。

## 1.桶排序(Bucket sort)

`百度百科`:
> **桶排序** (Bucket sort)或所谓的**箱排序**，是一个排序算法，工作的原理是将数组分到有限数量的桶子里。每个桶子再个别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排序）。桶排序是 [鸽巢排序](https://baike.baidu.com/item/%E9%B8%BD%E5%B7%A2%E6%8E%92%E5%BA%8F/8010555) 的一种归纳结果。当要被排序的数组内的数值是均匀分配的时候，桶排序使用**线性时间**（Θ（n））。但桶排序并不是 比较排序，他不受到 O(n log n) 下限的影响。




**~~继续~~** -->




桶排序是**[计数排序](https://mp.weixin.qq.com/s/7lphoHUgfDu0Cb1cO8ExKA)**的升级版。它利用了函数的**映射关系**，高效与否的关键就在于这个映射函数的确定。为了使桶排序更加高效，我们需要做到这两点：

1. 在额外空间充足的情况下，尽量增大桶的数量
2. 使用的映射函数能够将输入的 N 个数据均匀的分配到 K 个桶中

同时，对于桶中元素的排序，选择何种比较排序算法对于性能的影响至关重要。



![img](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091348.png)



**桶排序**是将待排序集合中处于同一个值域的元素存入同一个桶中，也就是根据元素值特性将集合**拆分**为多个区域，则拆分后形成的多个桶，从值域上看是处于有序状态的。对每个桶中元素进行排序，则所有桶中元素构成的集合是已排序的。

> 快速排序是将集合拆分为两个值域，这里称为两个桶，再分别对两个桶进行排序，最终完成排序。桶排序则是将集合拆分为多个桶，对每个桶进行排序，则完成排序过程。两者不同之处在于，快排是在集合本身上进行排序，属于原地排序方式，且对每个桶的排序方式也是快排。桶排序则是提供了额外的操作空间，在额外空间上对桶进行排序，避免了构成桶过程的元素比较和交换操作，同时可以自主选择恰当的排序算法对桶进行排序。



## 2.原理
### 2.1.关键

- 元素值域的划分，也就是元素到桶的映射规则。映射规则需要根据待排序集合的元素分布特性进行选择，若规则设计的过于模糊、宽泛，则可能导致待排序集合中所有元素全部映射到一个桶上，则桶排序向比较性质排序算法演变。若映射规则设计的过于具体、严苛，则可能导致待排序集合中每一个元素值映射到一个桶上，则桶排序向计数排序方式演化。


- 排序算法的选择，从待排序集合中元素映射到各个桶上的过程，并不存在元素的比较和交换操作，在对各个桶中元素进行排序时，可以自主选择合适的排序算法，桶排序算法的复杂度和稳定性，都根据选择的排序算法不同而不同。

### 2.2.算法过程

1. 根据待排序集合中最大元素和最小元素的差值范围和映射规则，确定申请的桶个数；
2. 遍历待排序集合，将每一个元素移动到对应的桶中；
3. 对每一个桶中元素进行排序，并移动到已排序集合中。

> 步骤 3 中提到的已排序集合，和步骤 1、2 中的待排序集合是同一个集合。与计数排序不同，桶排序的步骤 2 完成之后，所有元素都处于桶中，并且对桶中元素排序后，移动元素过程中不再依赖原始集合，所以可以将桶中元素移动回原始集合即可。




- **示意图**

元素分配到不同桶中：

![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091357.png)


然后，元素在每个桶中排序：


![img](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091404.png)



## 3.代码

> 基于 Java 的代码，代码逻辑很好理解，使用到[插入排序](https://mp.weixin.qq.com/s/cCv5s7b_ACF3mZo6wSfOIA)，如果不理解，点击传送。

```java
package utils;

import java.util.Arrays;

/**
 * @author wangshiyu rodert
 * @date 2020/6/21 15:13
 * @description
 */
public class BucketSort {

    public static void main(String[] args) throws Exception {
        int[] array = {2, 1, 5, 3, 4};

        BucketSort bucketSort = new BucketSort();
        int[] sort = bucketSort.sort(array);
        System.out.println(Arrays.toString(sort));
    }

    private static final InsertSort insertSort = new InsertSort();

    public int[] sort(int[] sourceArray) throws Exception {
        // 对 arr 进行拷贝，不改变参数内容
        int[] arr = Arrays.copyOf(sourceArray, sourceArray.length);

        return bucketSort(arr, 5);
    }

    private int[] bucketSort(int[] arr, int bucketSize) throws Exception {
        if (arr.length == 0) {
            return arr;
        }

        int minValue = arr[0];
        int maxValue = arr[0];
        for (int value : arr) {
            if (value < minValue) {
                minValue = value;
            } else if (value > maxValue) {
                maxValue = value;
            }
        }

        int bucketCount = (int) Math.floor((maxValue - minValue) / bucketSize) + 1;//向下取整 + 1
        int[][] buckets = new int[bucketCount][0];

        // 利用映射函数将数据分配到各个桶中
        for (int i = 0; i < arr.length; i++) {
            int index = (int) Math.floor((arr[i] - minValue) / bucketSize);
            buckets[index] = arrAppend(buckets[index], arr[i]);
        }

        int arrIndex = 0;
        for (int[] bucket : buckets) {
            if (bucket.length <= 0) {
                continue;
            }
            // 对每个桶进行排序，这里使用了插入排序
            bucket = insertSort.sort(bucket);
            for (int value : bucket) {
                arr[arrIndex++] = value;
            }
        }

        return arr;
    }

    /**
     * 自动扩容，并保存数据
     *
     * @param arr
     * @param value
     */
    private int[] arrAppend(int[] arr, int value) {
        arr = Arrays.copyOf(arr, arr.length + 1);
        arr[arr.length - 1] = value;
        return arr;
    }

}

class InsertSort {
    //插入排序
    public int[] sort(int[] sourceArray) throws Exception {
        // 对 arr 进行拷贝，不改变参数内容
        int[] arr = Arrays.copyOf(sourceArray, sourceArray.length);

        // 从下标为1的元素开始选择合适的位置插入，因为下标为0的只有一个元素，默认是有序的
        for (int i = 1; i < arr.length; i++) {

            // 记录要插入的数据
            int tmp = arr[i];

            // 从已经排序的序列最右边的开始比较，找到比其小的数
            int j = i;
            while (j > 0 && tmp < arr[j - 1]) {
                arr[j] = arr[j - 1];
                j--;
            }

            // 存在比其小的数，插入
            if (j != i) {
                arr[j] = tmp;
            }

        }
        return arr;
    }
}
```

返回结果：

```
[1, 2, 3, 4, 5]
```

> `Arrays.copyOf()` 方法理解：用于复制指定的数组内容以达到**扩容**的目的，该方法对不同的基本数据类型都有对应的重载方法。

## 4.扩展阅读



> **真题**：347. Top K Frequent Elements (Medium)，给定一个非空的整数数组，返回其中出现频率前 k 高的元素。

Given a non-empty array of integers, return the k most frequent elements.


- **题解：**


![img](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091417.png)



```java
//基于桶排序求解「前 K 个高频元素」
class Solution {
    public List<Integer> topKFrequent(int[] nums, int k) {
        List<Integer> res = new ArrayList();
        // 使用字典，统计每个元素出现的次数，元素为键，元素出现的次数为值
        HashMap<Integer,Integer> map = new HashMap();
        for(int num : nums){
            if (map.containsKey(num)) {
               map.put(num, map.get(num) + 1);
             } else {
                map.put(num, 1);
             }
        }
        
        //桶排序
        //将频率作为数组下标，对于出现频率不同的数字集合，存入对应的数组下标
        List<Integer>[] list = new List[nums.length+1];
        for(int key : map.keySet()){
            // 获取出现的次数作为下标
            int i = map.get(key);
            if(list[i] == null){
               list[i] = new ArrayList();
            } 
            list[i].add(key);
        }
        
        // 倒序遍历数组获取出现顺序从大到小的排列
        for(int i = list.length - 1;i >= 0 && res.size() < k;i--){
            if(list[i] == null) continue;
            res.addAll(list[i]);
        }
        return res;
    }
}
```

桶排序就是这么容易

