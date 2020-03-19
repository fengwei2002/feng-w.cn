---
title: 清华OJ数据结构习题解析
---

***

# [范围查询(Range)]

数轴上有n个点,对于任一闭区间 [a, b],试计算落在其内的点数。
***
输入

第一行包括两个整数：点的总数n,查询的次数m。

第二行包含n个数,为各个点的坐标。

以下m行,各包含两个整数：查询区间的左、右边界a和b。
***
输出

对每次查询,输出落在闭区间[a, b]内点的个数。

``` cpp
#include <iostream>
using namespace std;
int main()
{
    int n = 0;
    long long int m = 0;
    cin >> n >> m;
    int *p = new int[n];
    for (int i = 0; i < n; i++)
    {
        cin >> p[i];
    }
    for (int j = 0; j < m; j++)
    {
        int left = 0, right = 0;
        cin >> left >> right;
        int number = 0;
        for (int i = 0; i < n; i++)
        {
            if (p[i] >= left && p[i] <= right)
            {
                number = number + 1;
            }
        }
        cout << number << endl;
    }
    delete[] p;
    return 0;
}
```

![20200224142210.png](https://raw.githubusercontent.com/fengwei2002/picture/master/picture20200224142210.png)

# 祖玛

描述
祖玛是一款曾经风靡全球的游戏,其玩法是：在一条轨道上初始排列着若干个彩色珠子,其中任意三个相邻的珠子不会完全同色。此后,你可以发射珠子到轨道上并加入原有序列中。一旦有三个或更多同色的珠子变成相邻,它们就会立即消失。这类消除现象可能会连锁式发生,其间你将暂时不能发射珠子。

开发商最近准备为玩家写一个游戏过程的回放工具。他们已经在游戏内完成了过程记录的功能,而回放功能的实现则委托你来完成。

游戏过程的记录中,首先是轨道上初始的珠子序列,然后是玩家接下来所做的一系列操作。你的任务是,在各次操作之后及时计算出新的珠子序列。

输入
第一行是一个由大写字母'A'~'Z'组成的字符串,表示轨道上初始的珠子序列,不同的字母表示不同的颜色。

第二行是一个数字n,表示整个回放过程共有n次操作。

接下来的n行依次对应于各次操作。每次操作由一个数字k和一个大写字母Σ描述,以空格分隔。其中,Σ为新珠子的颜色。若插入前共有m颗珠子,则k ∈ [0, m]表示新珠子嵌入之后（尚未发生消除之前）在轨道上的位序。

输出
输出共n行,依次给出各次操作（及可能随即发生的消除现象）之后轨道上的珠子序列。

如果轨道上已没有珠子,则以“-”表示。

样例
见英文题面

限制
0 ≤ n ≤ 10^4

0 ≤ 初始珠子数量 ≤ 10^4

``` cpp
#include<iostream>
using namespace std;
#include<string>
int main() {
	string input = { "0" };
	cin >> input;
	int n = 0;
	int number = 0;
	char character = '0';
	cin >> n;
	for (int i = 0; i < n; i++) {
		cin >> number >> character;
		input.insert(input[number], 1, character);
		int j = input.length();
		while (j >= 3) {
			if (input[j] == input[j - 1]) {
				if (input[j - 1] == input[j - 2]) {
					input.erase(j - 2, j);
					j = input.length();
				}
			}
			else {
				j--;
			}
		}
	}
	return 0;
}
```

这道题崩了,不写了,菜鸡流泪🙃

