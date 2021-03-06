---
title: Priority queue
draft: true
tags:
  - 数据结构
--- 

>未整理 
<!-- more -->
# 第十章 优先级队列

是对之前的栈和队列的推广

> percolate: 过滤
> Priority queue: 优先级队列

![QQ 图片 20200331145057](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/QQ%E5%9B%BE%E7%89%8720200331145057.png)

## (a1) 需求与动机

一个医生时:
骨折的病人相比应该被先救, 心脏病病人应该比骨折优先被考虑, 所以之前的先到先服务的规则就不适用了

操作系统中额多任务调度:优先调度重要任务

ADT 规范:

```cpp
template <typename T > struct PQ { //将接口设置为纯虚函数, 强制要求随后给出具体的实现
    virtual void insert(T) = 0;//按照优先级次序插入词条
    virtual T getmax() = 0; //取出优先级最高的词条
    virtual T delmax() = 0;//取出后就可以删除优先级最高的词条
}
getmax
```

## (a2) 基本实现

将所有元素在底层可以实现为一个:
- 向量

插入节点直接$O(n)$时间放在最后, getmax 需要遍历整个向量, delmax 需要将所有后继累计前移

- 有序向量

getmax 直接读取有序向量最后一个元素, delmax 直接删除最后一个元素, 但是插入操作需要$O(n)$的时间, 有序向量的维护成本过高

- 列表

getmax 需要遍历一次全部元素, delmax 需要 remove(traverse()), 插入操作需要$O(1)$

- 有序列表

`getmax` 和 `delmax` 都可以在$O(1)$时间内完成, 插入操作需要 `insert ( search(e) , e )`, $O(n)$

- BBST

借助 AVL,Splay（伸展树）,Red-Black: 实现后三个接口只需要$O(log_n)$的时间

但是 BBST 的功能远远超过了 PQ 的需求

所以应该存在一种实现更加简单, 维护成本更低的一种数据结构

## (b1) 完全二叉堆:结构

完全二叉树, AVL 树的一个特例:平衡因子**处处非负**的一颗 AVL

逻辑上等同于完全二叉树
物理上, 直接借助向量实现

![DE84EC69D5BE0839F9EA1CFD0E260EB3](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/DE84EC69D5BE0839F9EA1CFD0E260EB3.jpg)

观察获得他们的对应关系为:父节点为减一除以 2, 左节点为乘二加一, 右节点为加一乘二

> 所有的数字都是元素对应的秩

### 二叉堆的完成

`PQ_Complate_Heap = PQ + Vector`
```cpp
template <typename T> class PQ_Complate_Heap: public PQ<T>,public Vector<T>{ //同时继承 PQ 和 Vector 的特性
protected:  Rank  percolateDown(Rank n, Rank i ); //下滤
            Rank  percolateUp(Rank i); //上滤
            void  heapify(Rank i); //Floyd 建堆算法
public: PQ_Complate_Heap( T * A, Rank n) //批量构造
            {copyFrom(A, 0, n ); heapify(n);}
            void  insert( T ); //按照比较器确定的优先级次序, 插入词条
            T getmax() {return _elem[0];} //读取优先级最高的词条
            T delMax(); //删除优先级最高的词条
};
```

### 堆序性的概念

任何一个节点都不会超过他的父亲

所以`getmax`只可能是根节点, 超低成本即可实现

## (b2) 完全二叉堆:插入与上滤

考虑如何插入一个新的元素

因为逻辑上采用二叉树, 物理空间采用向量完成, 所以直接放在向量的末尾, 
结构性自然保持, 堆序性未必延续:通过与父节点的交换完成堆序性的恢复

所以和以前的策略一致, 判断-交换-判断-交换-判断$\cdots$

![C3002F35CA2C9AB6846B8A3D9B284780](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/C3002F35CA2C9AB6846B8A3D9B284780.jpg)

这个过程即所谓的**上滤**, 上滤完成后就实现了堆序性的恢复；交换过程在物理空间的向量中完成, 交换的逻辑依循二叉树的规则。

### 上滤算法的实现:

```cpp
template<typename T> void PQ_Complate_Heap<T>::insert( T e )
    { Vector<T>::insert(e); percolateUp(_size - 1);}
template <typename T> //对第 i 个词条实施上滤, i<_size
Rank PQ_Complate_Heap<T>::percolateUp( Rank i ){
    while(ParentValid( i ) ) { //只要未到达堆顶
        Rank j = Parent(i);
        if (lt(_elem[i], _elem[j] ) ) break;//如果有一处数据有序后即可结束循环
        swap( _elem[i],_elem[j] ); i = j; //否则, 交换位置, 并且上升一层
    } //while
    return i; //返回上滤最终到达的位置
}
```

$O(log_n)$

swap 接口还可以优化, 直到发现最后该交换的位置再进行赋值交换操作, 用 if 来减少中间没必要的$n\times 3$赋值操作

## (b3) 完全二叉堆:删除与下滤

摘除最大元素时, 删除首元素, 然后将末元素移至首元素的位置保持结构性

再通过与其最大的孩子进行交换操作实现堆序性对的修复

与插入过程相仿, 单调性的持续执行, 修复过程就叫做下滤算法

```cpp
template<typename T> T PQ_Complate_Heap<T>::delMax(){ //删除
    T maxElem = _elem[0]; _elem[0] = _elem[ --_size ];//摘除堆顶, 末词条代之
    percolateDown(_size, 0);//对二叉堆堆顶实施下滤
    return maxElem;//返回之前备份的最大词条
}
template <typename T> 
Rank PQ_Complate_Heap<T>::percolateDown(Rank n, Rank i){
    Rank j; //i和他的两个孩子中三个最大的为parent
    while(i != (j = ProperParent(_elem, n, i))) //当三者中最大元素不是i时
       {swap( _elem[i], _elem[j] ); i = j;} //交换, 且继续考察
    return i;//返回下滤抵达位置 ||return j
}
```

## (b4) 完全二叉堆:批量建造一个堆
```cpp
PQ_Complate_Heap( T * A, Rank n) /*批量构造*/{copyFrom(A, 0, n );/*向量的copyFrom*/heapify(n);}
```
- 蛮力实现:自上而下的上滤$O(nlog_n)$
```cpp
template <typename T> void PQ_Complate_Heap<T>::heapify(Rank n) {
    for(int i = 1;i < n ; i++) //按照层次遍历额次序
       percolateUp(i);//对每一个节点进行上滤操作, 经过上滤在堆中插入各个节点
}
```

- 自下而上的下滤 6.6.4 $O(n)$

对堆顶元素执行下滤操作, 就可以将两个不同的堆变成一个完整的堆

```cpp
template<typename T> 
void PQ_Complate_Heap<T>::heapify( Rank n ) {//Floyd 1964
    for ( int i = LastInternal(n); i >= 0; i-- ) //自下而上, 从右到左
        percolateDown( n, i ); //下滤各个 内部节点
}//可以理解为子堆的逐层合并
```

## (c) 堆排序

::: tip 
选择排序PRO
:::

用优先级队列存储未排列元素, 初始化$heapify()$迭代$delmax()$总复杂度$O(nlog_n)$

就地保存, 空间的效率也就变高了

![0EDF7C59505FF97D1D493C08692847AF](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/0EDF7C59505FF97D1D493C08692847AF.jpg)

堆中每个元素的读取有两步:交换-下滤, 不需要额外的空间

```cpp
template <typename T>//对向量区间[lo,hi]就地排序
void Vector<T>::heapSort(Rank lo, Rank hi){
    PQ_Complate_Heap<T> H(_elem + lo, hi-lo ); //待排序区间建堆, O(n)
    while (! H.empty() ) //反复的摘除最大元素, 并将其归入已排序的后缀, 直至堆空
        _elem[--hi] = H.delMax();//等效于交换, 下滤
}
```

## (xa1) 左式堆:结构 6.8.4

为了有效的完成堆合并:

`H = merge(A, B)`

方法1:`A.insert(B.delMax())` 

方法2:`union( A, B ).heapify( n + m )` 没有运用到已经排好的基础顺序

所以就存在了一种更强大的数据结构

保持排序性, 附加新条件, 使得在堆合并的过程中, 只是调整很少部分的节点

新条件:单侧倾斜:节点分布偏向于左侧, 合并操作只涉及右侧

拓扑结构上不见得是完全二叉树, 结构性无法保证；
实际上, **结构性**并非堆结构的本质要求


## (xa2) 左式堆:合并


## (xa3) 左式堆:插入与删除

## 本章测验