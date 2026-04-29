import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: '数据清洗基础',
    description: '处理缺失值、异常值，格式化时间列，掌握数据预处理全流程',
    coreSkills: ['缺失值处理', '异常值检测', '时间格式化', '数据类型转换'],
    dataset: 'retail_orders.csv',
    learningGoals: [
      '掌握数据加载与基本信息查看方法',
      '学会处理缺失值和异常值',
      '掌握时间序列数据处理技巧',
      '学会计算派生列'
    ],
    tasks: [
      '加载并查看数据集基本信息',
      '处理缺失值和异常值',
      '格式化时间列',
      '计算总价列'
    ],
    knowledgePoints: [
      '数据加载与基本信息查看',
      '缺失值处理方法',
      '异常值检测与处理',
      '时间序列数据处理',
      '派生列计算'
    ],
    commonMistakes: [
      '处理缺失值时注意保留有效数据',
      '异常值检测需要结合业务逻辑',
      '时间格式化时注意时区问题',
      '计算总价时注意数据类型转换'
    ],
    level: '入门',
    tools: ['Python', 'Pandas'],
    codeTemplate: `import pandas as pd

# 加载数据
df = pd.read_csv('retail_orders.csv')

# 查看基本信息
print(df.info())
print(df.head())

# 处理缺失值
df = df.dropna()

# 处理异常值
df = df[df['quantity'] > 0]
df = df[df['unit_price'] > 0]

# 格式化时间列
df['order_date'] = pd.to_datetime(df['order_date'])

# 计算总价
df['total_price'] = df['quantity'] * df['unit_price']

# 保存处理后的数据
df.to_csv('cleaned_orders.csv', index=False)
print('数据清洗完成！')`
  },
  {
    id: 2,
    title: '销售数据分组聚合',
    description: '使用groupby进行数据分组，掌握多字段聚合分析方法',
    coreSkills: ['groupby分组', 'agg聚合', '多字段分组', '数据透视'],
    dataset: 'retail_orders.csv',
    learningGoals: [
      '掌握groupby基本用法',
      '学会使用agg进行多种聚合操作',
      '掌握多字段分组技巧',
      '学会数据透视表的使用'
    ],
    tasks: [
      '按地区分组统计销售额',
      '按产品和地区双字段分组',
      '计算各组的平均值和总和',
      '创建数据透视表'
    ],
    knowledgePoints: [
      'groupby基本语法',
      '聚合函数使用',
      '多字段分组',
      '数据透视表',
      '结果排序与筛选'
    ],
    commonMistakes: [
      '分组后需要重置索引',
      '聚合函数的选择要符合数据类型',
      '多字段分组注意顺序',
      '透视表的行列设置要合理'
    ],
    level: '入门',
    tools: ['Python', 'Pandas'],
    codeTemplate: `import pandas as pd

# 加载数据
df = pd.read_csv('retail_orders.csv')

# 按单个字段分组
result = df.groupby('region').agg({
    'total_price': ['sum', 'mean', 'count']
}).reset_index()

# 按多个字段分组
result = df.groupby(['region', 'product_id']).agg({
    'total_price': 'sum',
    'quantity': 'mean'
}).reset_index()

# 创建透视表
pivot = df.pivot_table(
    values='total_price',
    index='region',
    columns='product_id',
    aggfunc='sum'
)

print(result)
print(pivot)`
  },
  {
    id: 3,
    title: '购物篮分析',
    description: '使用关联规则挖掘产品组合，发现顾客购买模式与商品关联',
    coreSkills: ['关联规则', 'Apriori算法', '支持度', '置信度'],
    dataset: 'market_basket.csv',
    learningGoals: [
      '理解关联规则基本概念',
      '掌握Apriori算法原理',
      '学会计算支持度和置信度',
      '能够解读关联规则结果'
    ],
    tasks: [
      '准备购物篮数据格式',
      '计算产品组合支持度',
      '生成关联规则',
      '分析高价值产品组合'
    ],
    knowledgePoints: [
      '关联规则概念',
      '支持度计算',
      '置信度计算',
      '提升度计算',
      'Apriori算法原理'
    ],
    commonMistakes: [
      '数据格式需要转换为布尔矩阵',
      '支持度阈值设置要合理',
      '置信度高不代表因果关系',
      '注意规则的实用性'
    ],
    level: '进阶',
    tools: ['Python', 'Pandas', 'Mlxtend'],
    codeTemplate: `import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules

# 加载数据
df = pd.read_csv('market_basket.csv')

# 转换为布尔矩阵
basket = df.groupby(['transaction_id', 'product_name'])['quantity'].sum().unstack().fillna(0)
basket = basket.applymap(lambda x: 1 if x > 0 else 0)

# 使用Apriori算法
frequent_items = apriori(basket, min_support=0.05, use_colnames=True)

# 生成关联规则
rules = association_rules(frequent_items, metric='confidence', min_threshold=0.5)

# 按提升度排序
rules = rules.sort_values('lift', ascending=False)

print(rules.head())`
  },
  {
    id: 4,
    title: '客户聚类分析',
    description: '使用K-means对客户进行分群，识别不同价值客户群体特征',
    coreSkills: ['K-means聚类', '特征选择', '聚类评估', '客户分群'],
    dataset: 'user_logs.csv',
    learningGoals: [
      '理解聚类分析原理',
      '掌握K-means算法使用',
      '学会选择合适的聚类数量',
      '能够解读聚类结果'
    ],
    tasks: [
      '准备客户特征数据',
      '选择聚类特征',
      '执行K-means聚类',
      '分析各群体特征'
    ],
    knowledgePoints: [
      '聚类分析概念',
      'K-means算法原理',
      '肘部法则',
      '轮廓系数',
      '特征标准化'
    ],
    commonMistakes: [
      '聚类前需要标准化特征',
      'K值选择要合理',
      '异常值会影响聚类结果',
      '聚类结果需要业务解读'
    ],
    level: '进阶',
    tools: ['Python', 'Pandas', 'Scikit-learn'],
    codeTemplate: `import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

# 加载数据
df = pd.read_csv('user_logs.csv')

# 选择特征
features = df[['duration', 'pages_visited']]

# 标准化
scaler = StandardScaler()
features_scaled = scaler.fit_transform(features)

# 使用肘部法则确定K值
inertias = []
for k in range(1, 11):
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(features_scaled)
    inertias.append(kmeans.inertia_)

# 执行聚类
kmeans = KMeans(n_clusters=3, random_state=42)
df['cluster'] = kmeans.fit_predict(features_scaled)

# 分析各群体特征
print(df.groupby('cluster').mean())`
  },
  {
    id: 5,
    title: '销售数据可视化',
    description: '使用matplotlib创建专业图表，直观展示数据洞察与趋势',
    coreSkills: ['matplotlib绑图', '趋势图', '分布图', '图表美化'],
    dataset: 'retail_orders.csv',
    learningGoals: [
      '掌握matplotlib基本用法',
      '学会创建各类图表',
      '掌握图表美化技巧',
      '能够解读可视化结果'
    ],
    tasks: [
      '创建销售趋势折线图',
      '绘制地区销售柱状图',
      '制作价格分布直方图',
      '组合多个子图'
    ],
    knowledgePoints: [
      'matplotlib基础',
      '折线图绑制',
      '柱状图绑制',
      '直方图绑制',
      '图表样式设置'
    ],
    commonMistakes: [
      '中文显示需要设置字体',
      '图表要有标题和标签',
      '颜色选择要考虑色盲友好',
      '图表尺寸要适合展示'
    ],
    level: '入门',
    tools: ['Python', 'Matplotlib', 'Pandas'],
    codeTemplate: `import pandas as pd
import matplotlib.pyplot as plt

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 加载数据
df = pd.read_csv('retail_orders.csv')
df['order_date'] = pd.to_datetime(df['order_date'])

# 创建趋势图
plt.figure(figsize=(12, 6))
plt.plot(df.groupby('order_date')['total_price'].sum())
plt.title('销售趋势图')
plt.xlabel('日期')
plt.ylabel('销售额')
plt.grid(True)
plt.show()

# 创建柱状图
plt.figure(figsize=(10, 6))
df.groupby('region')['total_price'].sum().plot(kind='bar')
plt.title('各地区销售额')
plt.xlabel('地区')
plt.ylabel('销售额')
plt.show()`
  },
  {
    id: 6,
    title: 'A/B测试分析',
    description: '设计并分析A/B测试实验，用统计方法评估产品改版效果',
    coreSkills: ['假设检验', '显著性判断', 'p值计算', '效果评估'],
    dataset: 'ab_test.csv',
    learningGoals: [
      '理解A/B测试原理',
      '掌握假设检验方法',
      '学会计算显著性',
      '能够解读测试结果'
    ],
    tasks: [
      '计算各组转化率',
      '进行假设检验',
      '计算置信区间',
      '给出测试结论'
    ],
    knowledgePoints: [
      'A/B测试概念',
      '假设检验原理',
      't检验',
      'p值解读',
      '置信区间'
    ],
    commonMistakes: [
      '样本量要足够大',
      '要注意多重比较问题',
      '显著性不代表实际意义',
      '要考虑业务背景'
    ],
    level: '进阶',
    tools: ['Python', 'Pandas', 'Scipy'],
    codeTemplate: `import pandas as pd
from scipy import stats
import numpy as np

# 加载数据
df = pd.read_csv('ab_test.csv')

# 计算各组转化率
conversion = df.groupby('group')['conversion'].agg(['mean', 'count', 'sum'])
print(conversion)

# 提取两组数据
control = df[df['group'] == 'control']['conversion']
treatment = df[df['group'] == 'treatment']['conversion']

# 进行t检验
t_stat, p_value = stats.ttest_ind(control, treatment)
print(f't统计量: {t_stat:.4f}')
print(f'p值: {p_value:.4f}')

# 判断显著性
alpha = 0.05
if p_value < alpha:
    print('结果显著，拒绝原假设')
else:
    print('结果不显著，无法拒绝原假设')`
  },
  {
    id: 7,
    title: '时间序列分析',
    description: '使用ARIMA模型进行销售预测，掌握时间序列分析方法',
    coreSkills: ['时间序列', 'ARIMA模型', '趋势预测', '季节性分析'],
    dataset: 'retail_orders.csv',
    learningGoals: [
      '理解时间序列概念',
      '掌握ARIMA模型原理',
      '学会模型参数选择',
      '能够进行预测和评估'
    ],
    tasks: [
      '准备时间序列数据',
      '检查平稳性',
      '拟合ARIMA模型',
      '进行预测'
    ],
    knowledgePoints: [
      '时间序列概念',
      '平稳性检验',
      'ARIMA模型',
      '模型定阶',
      '预测评估'
    ],
    commonMistakes: [
      '数据需要按时间排序',
      '非平稳数据需要差分',
      '参数选择要合理',
      '预测区间要给出置信度'
    ],
    level: '实战',
    tools: ['Python', 'Pandas', 'Statsmodels'],
    codeTemplate: `import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import matplotlib.pyplot as plt

# 加载数据
df = pd.read_csv('retail_orders.csv')
df['order_date'] = pd.to_datetime(df['order_date'])
df.set_index('order_date', inplace=True)

# 按天汇总
daily_sales = df.resample('D')['total_price'].sum()

# 拟合ARIMA模型
model = ARIMA(daily_sales, order=(1, 1, 1))
model_fit = model.fit()

# 预测未来30天
forecast = model_fit.forecast(steps=30)

# 绑制结果
plt.figure(figsize=(12, 6))
plt.plot(daily_sales, label='历史数据')
plt.plot(forecast, label='预测', color='red')
plt.title('销售预测')
plt.legend()
plt.show()`
  },
  {
    id: 8,
    title: '特征工程',
    description: '进行特征选择和特征变换，提升机器学习模型性能',
    coreSkills: ['特征选择', '特征变换', '特征构造', '数据标准化'],
    dataset: 'user_logs.csv',
    learningGoals: [
      '理解特征工程重要性',
      '掌握特征选择方法',
      '学会特征变换技巧',
      '能够构造新特征'
    ],
    tasks: [
      '分析特征相关性',
      '进行特征选择',
      '创建派生特征',
      '标准化特征'
    ],
    knowledgePoints: [
      '特征工程概念',
      '特征选择方法',
      '特征变换',
      '特征构造',
      '数据标准化'
    ],
    commonMistakes: [
      '避免特征泄漏',
      '注意特征尺度差异',
      '特征选择要结合业务',
      '变换要可逆'
    ],
    level: '实战',
    tools: ['Python', 'Pandas', 'Scikit-learn'],
    codeTemplate: `import pandas as pd
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.feature_selection import SelectKBest, f_classif

# 加载数据
df = pd.read_csv('user_logs.csv')

# 创建派生特征
df['avg_time_per_page'] = df['duration'] / df['pages_visited']
df['is_active'] = (df['duration'] > df['duration'].median()).astype(int)

# 选择特征
features = df[['duration', 'pages_visited', 'avg_time_per_page']]
target = df['purchase']

# 特征选择
selector = SelectKBest(score_func=f_classif, k=2)
selected_features = selector.fit_transform(features, target)

# 标准化
scaler = StandardScaler()
scaled_features = scaler.fit_transform(selected_features)

print('选择的特征索引:', selector.get_support(indices=True))
print('特征得分:', selector.scores_)`
  },
  {
    id: 9,
    title: '异常值检测',
    description: '使用多种方法检测数据异常，识别潜在风险与机会',
    coreSkills: ['IQR方法', 'Z-score', '孤立森林', '异常处理'],
    dataset: 'retail_orders.csv',
    learningGoals: [
      '理解异常值概念',
      '掌握多种检测方法',
      '学会处理异常值',
      '能够解读检测结果'
    ],
    tasks: [
      '使用IQR方法检测异常',
      '使用Z-score检测异常',
      '使用孤立森林检测',
      '处理检测到的异常值'
    ],
    knowledgePoints: [
      '异常值概念',
      'IQR方法',
      'Z-score方法',
      '孤立森林',
      '异常值处理策略'
    ],
    commonMistakes: [
      '异常值不一定是错误数据',
      '不同方法结果可能不同',
      '要结合业务判断',
      '删除异常值要谨慎'
    ],
    level: '实战',
    tools: ['Python', 'Pandas', 'Scikit-learn'],
    codeTemplate: `import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest

# 加载数据
df = pd.read_csv('retail_orders.csv')

# IQR方法
Q1 = df['total_price'].quantile(0.25)
Q3 = df['total_price'].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR
outliers_iqr = df[(df['total_price'] < lower) | (df['total_price'] > upper)]

# Z-score方法
mean = df['total_price'].mean()
std = df['total_price'].std()
df['z_score'] = (df['total_price'] - mean) / std
outliers_zscore = df[abs(df['z_score']) > 3]

# 孤立森林
iso = IsolationForest(contamination=0.1, random_state=42)
df['anomaly'] = iso.fit_predict(df[['total_price']])
outliers_iso = df[df['anomaly'] == -1]

print(f'IQR检测到异常值: {len(outliers_iqr)}')
print(f'Z-score检测到异常值: {len(outliers_zscore)}')
print(f'孤立森林检测到异常值: {len(outliers_iso)}')`
  },
  {
    id: 10,
    title: '多数据集合并',
    description: '使用merge和concat整合多源数据，构建完整分析视图',
    coreSkills: ['merge合并', 'concat拼接', '数据整合', '连接类型'],
    dataset: 'retail_orders.csv, user_logs.csv',
    learningGoals: [
      '理解数据合并概念',
      '掌握merge用法',
      '学会concat拼接',
      '能够处理合并冲突'
    ],
    tasks: [
      '使用merge内连接',
      '使用merge左连接',
      '使用concat纵向拼接',
      '处理合并后的重复列'
    ],
    knowledgePoints: [
      '数据合并概念',
      'merge函数',
      'concat函数',
      '连接类型',
      '合并键选择'
    ],
    commonMistakes: [
      '合并键要唯一',
      '注意连接类型选择',
      '合并后检查数据量',
      '处理重复列名'
    ],
    level: '入门',
    tools: ['Python', 'Pandas'],
    codeTemplate: `import pandas as pd

# 加载数据
orders = pd.read_csv('retail_orders.csv')
users = pd.read_csv('user_logs.csv')

# 内连接
inner_join = pd.merge(orders, users, on='customer_id', how='inner')

# 左连接
left_join = pd.merge(orders, users, on='customer_id', how='left')

# 纵向拼接
df1 = orders.head(100)
df2 = orders.tail(100)
concat_df = pd.concat([df1, df2], ignore_index=True)

# 多键合并
multi_key = pd.merge(orders, users, 
                     left_on=['customer_id', 'order_date'],
                     right_on=['user_id', 'login_time'],
                     how='inner')

print(f'内连接结果: {len(inner_join)} 行')
print(f'左连接结果: {len(left_join)} 行')
print(f'拼接结果: {len(concat_df)} 行')`
  }
];
