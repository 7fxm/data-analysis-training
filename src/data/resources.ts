import { Dataset, CodeTemplate, KnowledgeDoc } from '../types';

export const datasets: Dataset[] = [
  {
    id: 'retail_orders',
    name: '零售订单数据',
    filename: 'retail_orders.csv',
    fields: [
      { name: 'order_id', type: 'string', description: '订单ID' },
      { name: 'product_id', type: 'string', description: '产品ID' },
      { name: 'quantity', type: 'integer', description: '数量' },
      { name: 'unit_price', type: 'float', description: '单价' },
      { name: 'order_date', type: 'datetime', description: '订单日期' },
      { name: 'customer_id', type: 'string', description: '客户ID' },
      { name: 'region', type: 'string', description: '地区' }
    ],
    description: '包含订单、产品、客户和地区信息的零售销售数据',
    useCases: ['销售数据分析', '时间序列分析', '地区销售对比', '数据清洗练习']
  },
  {
    id: 'market_basket',
    name: '购物篮数据',
    filename: 'market_basket.csv',
    fields: [
      { name: 'transaction_id', type: 'string', description: '交易ID' },
      { name: 'product_name', type: 'string', description: '产品名称' },
      { name: 'quantity', type: 'integer', description: '数量' },
      { name: 'price', type: 'float', description: '价格' }
    ],
    description: '包含交易和产品信息的购物篮数据',
    useCases: ['购物篮分析', '关联规则挖掘', '产品组合分析']
  },
  {
    id: 'user_logs',
    name: '用户行为日志',
    filename: 'user_logs.csv',
    fields: [
      { name: 'user_id', type: 'string', description: '用户ID' },
      { name: 'login_time', type: 'datetime', description: '登录时间' },
      { name: 'duration', type: 'integer', description: '停留时长(秒)' },
      { name: 'pages_visited', type: 'integer', description: '访问页面数' },
      { name: 'purchase', type: 'integer', description: '是否购买(0/1)' }
    ],
    description: '包含用户行为数据的日志记录',
    useCases: ['用户行为分析', '客户聚类', '购买预测', '特征工程']
  },
  {
    id: 'ab_test',
    name: 'A/B测试数据',
    filename: 'ab_test.csv',
    fields: [
      { name: 'user_id', type: 'string', description: '用户ID' },
      { name: 'group', type: 'string', description: '实验组/对照组' },
      { name: 'conversion', type: 'float', description: '转化率' },
      { name: 'revenue', type: 'float', description: '收入' }
    ],
    description: 'A/B测试实验数据',
    useCases: ['A/B测试分析', '显著性检验', '效果评估']
  }
];

export const codeTemplates: CodeTemplate[] = [
  {
    id: 'data_cleaning',
    name: '数据清洗模板',
    description: '包含数据加载、缺失值处理、异常值处理、时间格式化等常用操作',
    code: `import pandas as pd

# 加载数据
df = pd.read_csv('data.csv')

# 查看基本信息
print(df.info())
print(df.describe())

# 处理缺失值
df = df.dropna()  # 或 df.fillna(value)

# 处理异常值
df = df[(df['column'] > min_value) & (df['column'] < max_value)]

# 格式化时间列
df['date_column'] = pd.to_datetime(df['date_column'])

# 保存清洗后的数据
df.to_csv('cleaned_data.csv', index=False)`
  },
  {
    id: 'groupby_agg',
    name: '分组聚合模板',
    description: '包含单字段分组、多字段分组、多种聚合函数的使用方法',
    code: `import pandas as pd

# 加载数据
df = pd.read_csv('data.csv')

# 按单个字段分组
result = df.groupby('category').agg({
    'value': ['sum', 'mean', 'count']
}).reset_index()

# 按多个字段分组
result = df.groupby(['category', 'region']).agg({
    'value': 'sum',
    'quantity': 'mean'
}).reset_index()

# 保存结果
result.to_csv('aggregated_data.csv', index=False)`
  },
  {
    id: 'visualization',
    name: '可视化模板',
    description: '包含折线图、柱状图、直方图等常用图表的绑制方法',
    code: `import pandas as pd
import matplotlib.pyplot as plt

# 加载数据
df = pd.read_csv('data.csv')

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 趋势图
plt.figure(figsize=(12, 6))
plt.plot(df['date'], df['value'])
plt.title('趋势图')
plt.xlabel('日期')
plt.ylabel('值')
plt.grid(True)
plt.show()

# 分布图
plt.figure(figsize=(10, 6))
plt.hist(df['value'], bins=20)
plt.title('分布图')
plt.xlabel('值')
plt.ylabel('频率')
plt.grid(True)
plt.show()`
  },
  {
    id: 'clustering',
    name: '聚类/预测模板',
    description: '包含K-means聚类和时间序列预测的代码模板',
    code: `# 聚类模板
from sklearn.cluster import KMeans
import pandas as pd

# 加载数据
df = pd.read_csv('data.csv')

# 特征选择
features = df[['feature1', 'feature2', 'feature3']]

# K-means聚类
kmeans = KMeans(n_clusters=3, random_state=42)
df['cluster'] = kmeans.fit_predict(features)

# 保存结果
df.to_csv('clustered_data.csv', index=False)

# 时间序列预测模板
from statsmodels.tsa.arima.model import ARIMA
import pandas as pd

# 加载数据
df = pd.read_csv('time_series_data.csv')
df['date'] = pd.to_datetime(df['date'])
df.set_index('date', inplace=True)

# 拟合模型
model = ARIMA(df['value'], order=(1, 1, 1))
model_fit = model.fit()

# 预测
forecast = model_fit.forecast(steps=30)
print(forecast)`
  }
];

export const knowledgeDocs: KnowledgeDoc[] = [
  {
    id: 'pandas_basics',
    title: 'Pandas 基础知识',
    category: 'cleaning',
    content: `## Pandas 简介

Pandas 是 Python 数据分析的核心库，提供了 DataFrame 和 Series 两种核心数据结构。

## 数据结构

**Series**：一维标签数组
\`\`\`python
import pandas as pd
s = pd.Series([1, 2, 3], index=['a', 'b', 'c'])
\`\`\`

**DataFrame**：二维表格数据
\`\`\`python
df = pd.DataFrame({
    'name': ['Alice', 'Bob'],
    'age': [25, 30]
})
\`\`\`

## 数据加载与保存

- pd.read_csv() - 读取CSV文件
- pd.read_excel() - 读取Excel文件
- pd.read_json() - 读取JSON文件
- df.to_csv() - 保存为CSV
- df.to_excel() - 保存为Excel

## 数据查看

- df.head(n) - 查看前n行
- df.tail(n) - 查看后n行
- df.info() - 查看数据信息
- df.describe() - 描述性统计
- df.shape - 数据形状
- df.columns - 列名
- df.dtypes - 数据类型

## 数据选择

- df['column'] - 选择单列
- df[['col1', 'col2']] - 选择多列
- df.loc[row, col] - 标签选择
- df.iloc[row, col] - 位置选择
- df[df['col'] > value] - 条件筛选`
  },
  {
    id: 'data_cleaning',
    title: '数据清洗技术',
    category: 'cleaning',
    content: `## 数据清洗流程

1. 数据收集与加载
2. 数据质量评估
3. 缺失值处理
4. 异常值检测与处理
5. 数据类型转换
6. 数据标准化/归一化
7. 数据验证与保存

## 缺失值处理

**检测缺失值**
\`\`\`python
df.isnull().sum()  # 统计缺失值数量
df.isnull().mean()  # 缺失值比例
\`\`\`

**处理方法**
\`\`\`python
# 删除缺失值
df.dropna()  # 删除包含缺失值的行
df.dropna(axis=1)  # 删除包含缺失值的列

# 填充缺失值
df.fillna(0)  # 用0填充
df.fillna(df.mean())  # 用均值填充
df.fillna(method='ffill')  # 前向填充
df.fillna(method='bfill')  # 后向填充
\`\`\`

## 异常值检测

**IQR方法**
\`\`\`python
Q1 = df['col'].quantile(0.25)
Q3 = df['col'].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR
outliers = df[(df['col'] < lower) | (df['col'] > upper)]
\`\`\`

**Z-score方法**
\`\`\`python
from scipy import stats
z_scores = stats.zscore(df['col'])
outliers = df[abs(z_scores) > 3]
\`\`\`

## 数据类型转换

\`\`\`python
df['col'] = df['col'].astype('int')
df['date'] = pd.to_datetime(df['date'])
df['col'] = df['col'].astype('category')
\`\`\``
  },
  {
    id: 'data_analysis',
    title: '数据分析方法',
    category: 'analysis',
    content: `## 描述性统计分析

\`\`\`python
df.describe()  # 基本统计量
df.mean()  # 均值
df.median()  # 中位数
df.std()  # 标准差
df.var()  # 方差
df.corr()  # 相关系数矩阵
\`\`\`

## 分组聚合分析

**基本分组**
\`\`\`python
df.groupby('category')['value'].sum()
df.groupby('category').agg({'value': ['sum', 'mean', 'count']})
\`\`\`

**多字段分组**
\`\`\`python
df.groupby(['category', 'region']).agg({
    'sales': 'sum',
    'quantity': 'mean'
})
\`\`\`

## 数据透视表

\`\`\`python
pivot = df.pivot_table(
    values='sales',
    index='region',
    columns='product',
    aggfunc='sum',
    margins=True
)
\`\`\`

## 数据合并

**merge合并**
\`\`\`python
pd.merge(df1, df2, on='key', how='inner')  # 内连接
pd.merge(df1, df2, on='key', how='left')   # 左连接
pd.merge(df1, df2, on='key', how='outer')  # 外连接
\`\`\`

**concat拼接**
\`\`\`python
pd.concat([df1, df2], axis=0)  # 纵向拼接
pd.concat([df1, df2], axis=1)  # 横向拼接
\`\`\``
  },
  {
    id: 'visualization',
    title: '数据可视化技术',
    category: 'visualization',
    content: `## Matplotlib 基础

**基本设置**
\`\`\`python
import matplotlib.pyplot as plt
plt.rcParams['font.sans-serif'] = ['SimHei']  # 中文显示
plt.rcParams['axes.unicode_minus'] = False  # 负号显示
\`\`\`

## 常用图表

**折线图**
\`\`\`python
plt.figure(figsize=(12, 6))
plt.plot(x, y, marker='o', linestyle='-', color='blue')
plt.title('标题')
plt.xlabel('X轴')
plt.ylabel('Y轴')
plt.grid(True)
plt.show()
\`\`\`

**柱状图**
\`\`\`python
plt.bar(categories, values, color='steelblue')
plt.xticks(rotation=45)
\`\`\`

**饼图**
\`\`\`python
plt.pie(values, labels=labels, autopct='%1.1f%%')
\`\`\`

**散点图**
\`\`\`python
plt.scatter(x, y, c=colors, s=sizes, alpha=0.5)
\`\`\`

**直方图**
\`\`\`python
plt.hist(data, bins=20, edgecolor='black')
\`\`\`

**箱线图**
\`\`\`python
plt.boxplot(data)
\`\`\`

## 子图绘制

\`\`\`python
fig, axes = plt.subplots(2, 2, figsize=(12, 8))
axes[0, 0].plot(x1, y1)
axes[0, 1].bar(x2, y2)
\`\`\``
  },
  {
    id: 'statistics',
    title: '统计分析基础',
    category: 'analysis',
    content: `## 描述性统计

**集中趋势**
- 均值：df.mean()
- 中位数：df.median()
- 众数：df.mode()

**离散程度**
- 标准差：df.std()
- 方差：df.var()
- 极差：df.max() - df.min()
- 四分位距：Q3 - Q1

## 假设检验

**t检验**
\`\`\`python
from scipy import stats
t_stat, p_value = stats.ttest_ind(group1, group2)
\`\`\`

**卡方检验**
\`\`\`python
chi2, p_value, dof, expected = stats.chi2_contingency(contingency_table)
\`\`\`

## 相关分析

\`\`\`python
# Pearson相关系数
df.corr(method='pearson')

# Spearman相关系数
df.corr(method='spearman')

# 相关性可视化
import seaborn as sns
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
\`\`\`

## A/B测试

\`\`\`python
from scipy import stats

# 计算转化率
conv_a = group_a.mean()
conv_b = group_b.mean()

# t检验
t_stat, p_value = stats.ttest_ind(group_a, group_b)

# 判断显著性
if p_value < 0.05:
    print('结果显著')
\`\`\``
  },
  {
    id: 'ml_intro',
    title: '机器学习入门',
    category: 'ml',
    content: `## 机器学习分类

**监督学习**
- 分类：预测离散标签
- 回归：预测连续值

**无监督学习**
- 聚类：发现数据分组
- 降维：减少特征数量

## 数据预处理

\`\`\`python
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# 标准化 (均值0，方差1)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 归一化 (0-1范围)
scaler = MinMaxScaler()
X_normalized = scaler.fit_transform(X)
\`\`\`

## K-means聚类

\`\`\`python
from sklearn.cluster import KMeans

# 确定最佳K值（肘部法则）
inertias = []
for k in range(1, 11):
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(X)
    inertias.append(kmeans.inertia_)

# 执行聚类
kmeans = KMeans(n_clusters=3, random_state=42)
labels = kmeans.fit_predict(X)
\`\`\`

## 时间序列预测

\`\`\`python
from statsmodels.tsa.arima.model import ARIMA

# 拟合ARIMA模型
model = ARIMA(data, order=(1, 1, 1))
model_fit = model.fit()

# 预测
forecast = model_fit.forecast(steps=30)
\`\`\`

## 模型评估

\`\`\`python
from sklearn.metrics import silhouette_score, mean_squared_error

# 聚类评估
score = silhouette_score(X, labels)

# 回归评估
mse = mean_squared_error(y_true, y_pred)
rmse = np.sqrt(mse)
\`\`\``
  },
  {
    id: 'feature_engineering',
    title: '特征工程技术',
    category: 'ml',
    content: `## 特征工程概述

特征工程是将原始数据转换为更好特征的过程，直接影响模型性能。

## 特征选择

**过滤法**
\`\`\`python
from sklearn.feature_selection import SelectKBest, f_classif

selector = SelectKBest(score_func=f_classif, k=5)
X_selected = selector.fit_transform(X, y)
\`\`\`

**包裹法**
\`\`\`python
from sklearn.feature_selection import RFE
from sklearn.linear_model import LogisticRegression

rfe = RFE(estimator=LogisticRegression(), n_features_to_select=5)
X_selected = rfe.fit_transform(X, y)
\`\`\`

## 特征构造

\`\`\`python
# 派生特征
df['total_price'] = df['quantity'] * df['unit_price']
df['avg_time_per_page'] = df['duration'] / df['pages']

# 时间特征
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day_of_week'] = df['date'].dt.dayofweek

# 统计特征
df['rolling_mean'] = df['value'].rolling(window=7).mean()
\`\`\`

## 特征变换

\`\`\`python
# 对数变换
df['log_value'] = np.log1p(df['value'])

# 分箱
df['age_group'] = pd.cut(df['age'], bins=[0, 18, 35, 50, 100])

# 独热编码
df_encoded = pd.get_dummies(df, columns=['category'])
\`\`\`

## 特征泄漏

避免使用未来信息或目标变量信息作为特征，会导致模型评估虚高。`
  },
  {
    id: 'association_rules',
    title: '关联规则分析',
    category: 'analysis',
    content: `## 关联规则概念

**支持度(Support)**：物品组合出现的频率
\`\`\`
Support(A→B) = P(A∩B)
\`\`\`

**置信度(Confidence)**：A发生时B发生的概率
\`\`\`
Confidence(A→B) = P(B|A) = P(A∩B) / P(A)
\`\`\`

**提升度(Lift)**：A和B的相关性
\`\`\`
Lift(A→B) = P(B|A) / P(B)
\`\`\`
- Lift > 1：正相关
- Lift = 1：独立
- Lift < 1：负相关

## Apriori算法

\`\`\`python
from mlxtend.frequent_patterns import apriori, association_rules

# 转换为布尔矩阵
basket = df.groupby(['transaction_id', 'product'])['quantity'].sum().unstack().fillna(0)
basket = basket.applymap(lambda x: 1 if x > 0 else 0)

# 挖掘频繁项集
frequent_items = apriori(basket, min_support=0.05, use_colnames=True)

# 生成关联规则
rules = association_rules(frequent_items, metric='confidence', min_threshold=0.5)

# 筛选高价值规则
rules = rules[(rules['lift'] > 1) & (rules['confidence'] > 0.6)]
\`\`\`

## 应用场景

- 购物篮分析
- 推荐系统
- 网页点击分析
- 医疗诊断`
  }
];
