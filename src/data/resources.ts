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
    id: 'data_cleaning',
    title: '数据清洗手册',
    category: 'cleaning',
    content: `## 数据清洗流程

1. 数据收集与加载
2. 数据质量评估
3. 缺失值处理
4. 异常值检测与处理
5. 数据类型转换
6. 数据标准化/归一化
7. 数据验证与保存

## 常用函数

- pd.read_csv() - 加载CSV数据
- df.info() - 查看数据信息
- df.dropna() - 删除缺失值
- df.fillna() - 填充缺失值
- pd.to_datetime() - 时间格式化

## 缺失值处理策略

1. **删除法**：直接删除包含缺失值的行或列
2. **填充法**：用均值、中位数、众数或指定值填充
3. **插值法**：使用线性插值等方法填充

## 异常值检测方法

1. **箱线图法**：Q1-1.5*IQR ~ Q3+1.5*IQR范围外为异常
2. **Z-score法**：|z| > 3 视为异常
3. **业务规则**：根据业务逻辑判断`
  },
  {
    id: 'data_analysis',
    title: '数据分析手册',
    category: 'analysis',
    content: `## 数据分析方法

- 描述性统计分析
- 分组聚合分析
- 关联分析
- 时间序列分析
- A/B测试分析

## 常用函数

- df.describe() - 描述性统计
- df.groupby() - 分组
- df.agg() - 聚合
- df.merge() - 数据合并
- df.pivot_table() - 透视表

## 分组聚合技巧

1. **单字段分组**：df.groupby('column')
2. **多字段分组**：df.groupby(['col1', 'col2'])
3. **多聚合函数**：df.groupby().agg({'col': ['sum', 'mean']})

## 透视表使用

\`\`\`python
df.pivot_table(
    values='value',
    index='row_field',
    columns='col_field',
    aggfunc='sum'
)
\`\`\``
  },
  {
    id: 'visualization',
    title: '可视化手册',
    category: 'visualization',
    content: `## 常用图表类型

- 折线图 - 展示趋势
- 柱状图 - 比较数据
- 饼图 - 展示占比
- 散点图 - 展示相关性
- 箱线图 - 展示分布

## matplotlib基础

- plt.figure() - 创建画布
- plt.plot() - 绑制折线图
- plt.bar() - 绑制柱状图
- plt.pie() - 绑制饼图
- plt.scatter() - 绑制散点图
- plt.title() - 添加标题
- plt.xlabel() - 添加x轴标签
- plt.ylabel() - 添加y轴标签
- plt.show() - 显示图表

## 中文显示设置

\`\`\`python
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False
\`\`\``
  },
  {
    id: 'ml_intro',
    title: '机器学习入门手册',
    category: 'ml',
    content: `## 机器学习基础

- 监督学习 vs 无监督学习
- 特征工程
- 模型训练与评估
- 过拟合与欠拟合

## 常用算法

- K-means聚类
- 线性回归
- 逻辑回归
- 决策树
- 随机森林

## scikit-learn基础

- from sklearn.model_selection import train_test_split - 数据分割
- from sklearn.preprocessing import StandardScaler - 数据标准化
- from sklearn.cluster import KMeans - K-means聚类
- from sklearn.linear_model import LinearRegression - 线性回归
- from sklearn.metrics import accuracy_score - 评估指标

## 模型评估指标

- 分类：准确率、精确率、召回率、F1分数
- 回归：MSE、MAE、R²
- 聚类：轮廓系数、SSE`
  }
];
