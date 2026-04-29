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
import io

# 预置演示数据（模拟CSV文件内容）
# 字段说明：
# - order_id: 订单编号
# - product_id: 产品编号
# - quantity: 购买数量
# - unit_price: 单价
# - order_date: 订单日期
# - customer_id: 客户编号
# - region: 地区（中国七大地理分区：华东、华北、华南、华中、西北、西南、东北）
data = '''order_id,product_id,quantity,unit_price,order_date,customer_id,region
ORD001,P001,2,50.0,2024-01-01,C001,华东
ORD002,P002,1,100.0,2024-01-02,C002,华北
ORD003,P001,3,50.0,2024-01-03,C001,华东
ORD004,P003,1,200.0,2024-01-04,C003,华南
ORD005,P002,2,100.0,2024-01-05,C004,华中
ORD006,P001,1,50.0,,C005,西北
ORD007,P004,5,20.0,2024-01-07,C006,西南
ORD008,P002,1,100.0,2024-01-08,C007,华东
ORD009,P001,10,50.0,2024-01-09,C008,华北
ORD010,P003,2,200.0,2024-01-10,C009,华南'''

# 从字符串加载数据（模拟读取CSV文件）
df = pd.read_csv(io.StringIO(data))

# ============ 步骤1：查看基本信息 ============
print("=== 原始数据 ===")
print(df.info())
print("\n前5行数据:")
print(df.head())

# ============ 步骤2：处理缺失值 ============
print("\n=== 处理缺失值 ===")
print("缺失值数量:", df.isnull().sum())
df = df.dropna()  # 删除包含缺失值的行

# ============ 步骤3：处理异常值 ============
print("\n=== 处理异常值 ===")
print("处理前数据行数:", len(df))
df = df[df['quantity'] > 0]  # 数量必须大于0
df = df[df['unit_price'] > 0]  # 单价必须大于0
print("处理后数据行数:", len(df))

# ============ 步骤4：格式化时间列 ============
df['order_date'] = pd.to_datetime(df['order_date'])
print("\n=== 时间列格式化 ===")
print("order_date类型:", df['order_date'].dtype)

# ============ 步骤5：计算派生列 ============
df['total_price'] = df['quantity'] * df['unit_price']
print("\n=== 计算总价 ===")
print(df[['order_id', 'quantity', 'unit_price', 'total_price']])

print("\n✅ 数据清洗完成！")`
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
import io

# 预置演示数据
data = '''order_id,product_id,quantity,unit_price,order_date,customer_id,region
ORD001,P001,2,50.0,2024-01-01,C001,华东
ORD002,P002,1,100.0,2024-01-02,C002,华北
ORD003,P001,3,50.0,2024-01-03,C001,华东
ORD004,P003,1,200.0,2024-01-04,C003,华南
ORD005,P002,2,100.0,2024-01-05,C004,华中
ORD006,P001,1,50.0,2024-01-06,C005,西北
ORD007,P004,5,20.0,2024-01-07,C006,西南
ORD008,P002,1,100.0,2024-01-08,C007,华东
ORD009,P001,10,50.0,2024-01-09,C008,华北
ORD010,P003,2,200.0,2024-01-10,C009,华南'''

# 加载数据
df = pd.read_csv(io.StringIO(data))
df['total_price'] = df['quantity'] * df['unit_price']

# ============ 方法1：单字段分组聚合 ============
print("=== 方法1：按地区分组 ===")
region_result = df.groupby('region').agg({
    'total_price': ['sum', 'mean', 'count'],
    'quantity': 'sum'
}).reset_index()
print(region_result)

# ============ 方法2：多字段分组 ============
print("\n=== 方法2：按地区和产品分组 ===")
multi_result = df.groupby(['region', 'product_id']).agg({
    'total_price': 'sum',
    'quantity': 'mean'
}).reset_index()
print(multi_result)

# ============ 方法3：数据透视表 ============
print("\n=== 方法3：数据透视表 ===")
pivot = df.pivot_table(
    values='total_price',
    index='region',
    columns='product_id',
    aggfunc='sum',
    fill_value=0,
    margins=True  # 添加总计行和列
)
print(pivot)

# ============ 方法4：分组后排序筛选 ============
print("\n=== 方法4：各地区销售额排序 ===")
sorted_result = df.groupby('region')['total_price'].sum().sort_values(ascending=False)
print(sorted_result)

print("\n✅ 分组聚合完成！")`
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
    tools: ['Python', 'Pandas'],
    codeTemplate: `import pandas as pd
import io

# 预置演示数据（购物篮交易记录）
data = '''transaction_id,product_name,quantity,price
T001,牛奶,2,15.0
T001,面包,1,8.0
T001,鸡蛋,10,12.0
T002,面包,1,8.0
T002,鸡蛋,5,6.0
T003,牛奶,1,7.5
T003,面包,1,8.0
T003,火腿,2,20.0
T004,牛奶,2,15.0
T004,鸡蛋,10,12.0
T005,面包,2,16.0
T005,火腿,1,10.0
T006,牛奶,1,7.5
T006,鸡蛋,5,6.0
T007,牛奶,1,7.5
T007,面包,1,8.0
T007,鸡蛋,5,6.0
T008,面包,1,8.0
T009,牛奶,2,15.0
T009,火腿,3,30.0
T010,牛奶,1,7.5
T010,面包,1,8.0
T010,鸡蛋,10,12.0
T010,火腿,1,10.0'''

# 加载数据
df = pd.read_csv(io.StringIO(data))

# ============ 步骤1：数据预处理 ============
print("=== 原始数据 ===")
print(df.head())

# 转换为布尔矩阵（购物篮格式）
basket = df.groupby(['transaction_id', 'product_name'])['quantity'].sum().unstack().fillna(0)
basket = basket.applymap(lambda x: 1 if x > 0 else 0)
print("\n=== 购物篮矩阵 ===")
print(basket)

# ============ 步骤2：计算支持度 ============
print("\n=== 计算单品支持度 ===")
item_support = basket.sum() / len(basket)
print(item_support.sort_values(ascending=False))

# ============ 步骤3：计算组合支持度（2项组合） ============
print("\n=== 计算2项组合支持度 ===")
combinations = []
products = basket.columns.tolist()
for i in range(len(products)):
    for j in range(i+1, len(products)):
        combo = basket[products[i]] & basket[products[j]]
        support = combo.sum() / len(basket)
        if support > 0:
            combinations.append({
                '组合': f"{products[i]} + {products[j]}",
                '支持度': round(support, 3)
            })

combo_df = pd.DataFrame(combinations).sort_values('支持度', ascending=False)
print(combo_df)

# ============ 步骤4：计算置信度和提升度 ============
print("\n=== 关联规则分析 ===")
results = []
for combo in combinations:
    items = combo['组合'].split(' + ')
    a, b = items[0], items[1]
    
    # 置信度 P(B|A) = P(A∩B) / P(A)
    conf_ab = combo['支持度'] / item_support[a]
    
    # 提升度 Lift(A→B) = P(B|A) / P(B)
    lift_ab = conf_ab / item_support[b]
    
    results.append({
        '规则': f"{a} → {b}",
        '支持度': round(combo['支持度'], 3),
        '置信度': round(conf_ab, 3),
        '提升度': round(lift_ab, 3)
    })

rules_df = pd.DataFrame(results).sort_values('提升度', ascending=False)
print(rules_df)

print("\n✅ 购物篮分析完成！")
print("\n📊 解读：")
print("- 支持度：商品组合出现的频率")
print("- 置信度：购买A时购买B的概率")
print("- 提升度：购买A后购买B的概率提升倍数（>1表示正相关）")`
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
    tools: ['Python', 'Pandas'],
    codeTemplate: `import pandas as pd
import io

# 预置演示数据（用户行为日志）
data = '''user_id,login_time,duration,pages_visited,purchase
U001,2024-01-01 09:00,300,5,1
U002,2024-01-01 10:00,120,3,0
U003,2024-01-01 11:00,600,15,1
U004,2024-01-02 09:30,90,2,0
U005,2024-01-02 14:00,450,10,1
U006,2024-01-03 10:00,60,1,0
U007,2024-01-03 15:00,500,12,1
U008,2024-01-04 09:00,180,4,0
U009,2024-01-04 16:00,700,18,1
U010,2024-01-05 11:00,45,1,0
U011,2024-01-05 14:30,350,8,0
U012,2024-01-06 09:00,550,14,1
U013,2024-01-06 13:00,200,5,0
U014,2024-01-07 10:00,650,16,1
U015,2024-01-07 15:00,100,3,0'''

# 加载数据
df = pd.read_csv(io.StringIO(data))

# ============ 步骤1：数据探索 ============
print("=== 原始数据 ===")
print(df[['duration', 'pages_visited', 'purchase']].describe())

# ============ 步骤2：手动实现K-means聚类（简化版） ============
print("\n=== K-means聚类分析 ===")

# 选择特征
features = df[['duration', 'pages_visited']].values

# 设置参数
k = 3  # 聚类数量
max_iter = 100

# 初始化质心（随机选择k个点）
import random
centroids = features[random.sample(range(len(features)), k)]

for iteration in range(max_iter):
    # 分配点到最近的质心
    labels = []
    for point in features:
        distances = [sum((point - c) ** 2) for c in centroids]
        labels.append(distances.index(min(distances)))
    
    # 更新质心
    new_centroids = []
    for i in range(k):
        cluster_points = features[[j for j, l in enumerate(labels) if l == i]]
        if len(cluster_points) > 0:
            new_centroids.append(cluster_points.mean(axis=0))
        else:
            new_centroids.append(centroids[i])
    
    # 检查收敛
    if all(sum((c1 - c2) ** 2) < 0.001 for c1, c2 in zip(centroids, new_centroids)):
        break
    centroids = new_centroids

df['cluster'] = labels

# ============ 步骤3：分析各群体特征 ============
print("\n=== 各聚类群体特征 ===")
cluster_analysis = df.groupby('cluster').agg({
    'duration': ['mean', 'min', 'max'],
    'pages_visited': ['mean', 'min', 'max'],
    'purchase': ['mean', 'count']
})
print(cluster_analysis)

# ============ 步骤4：为群体命名 ============
print("\n=== 群体特征解读 ===")
cluster_names = []
for cluster_id in range(k):
    avg_duration = df[df['cluster'] == cluster_id]['duration'].mean()
    avg_pages = df[df['cluster'] == cluster_id]['pages_visited'].mean()
    avg_purchase = df[df['cluster'] == cluster_id]['purchase'].mean()
    
    if avg_duration > 400 and avg_pages > 10:
        name = '高价值活跃用户'
    elif avg_duration < 150 and avg_pages < 3:
        name = '低价值流失用户'
    else:
        name = '中等价值潜力用户'
    
    cluster_names.append(f"群体{cluster_id+1}: {name}")
    print(f"群体{cluster_id+1}: {name}")
    print(f"  - 平均停留时长: {avg_duration:.1f}秒")
    print(f"  - 平均访问页数: {avg_pages:.1f}页")
    print(f"  - 购买转化率: {avg_purchase:.1%}\n")

print("\n✅ 客户聚类分析完成！")`
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
    tools: ['Python', 'Pandas'],
    codeTemplate: `import pandas as pd
import io

# 预置演示数据
data = '''order_id,product_id,quantity,unit_price,order_date,customer_id,region
ORD001,P001,2,50.0,2024-01-01,C001,华东
ORD002,P002,1,100.0,2024-01-02,C002,华北
ORD003,P001,3,50.0,2024-01-03,C001,华东
ORD004,P003,1,200.0,2024-01-04,C003,华南
ORD005,P002,2,100.0,2024-01-05,C004,华中
ORD006,P001,1,50.0,2024-01-06,C005,西北
ORD007,P004,5,20.0,2024-01-07,C006,西南
ORD008,P002,1,100.0,2024-01-08,C007,华东
ORD009,P001,10,50.0,2024-01-09,C008,华北
ORD010,P003,2,200.0,2024-01-10,C009,华南'''

# 加载数据
df = pd.read_csv(io.StringIO(data))
df['order_date'] = pd.to_datetime(df['order_date'])
df['total_price'] = df['quantity'] * df['unit_price']

# ============ 图表1：销售趋势分析 ============
print("=== 图表1：销售趋势分析 ===")
daily_sales = df.groupby('order_date')['total_price'].sum()
print("每日销售额:")
print(daily_sales)
print(f"\n总销售额: {daily_sales.sum():.2f}")
print(f"日均销售额: {daily_sales.mean():.2f}")
print(f"最高单日销售额: {daily_sales.max():.2f}")

# ============ 图表2：各地区销售对比 ============
print("\n=== 图表2：各地区销售对比 ===")
region_sales = df.groupby('region')['total_price'].sum().sort_values(ascending=False)
print(region_sales)

# 计算占比
region_share = (region_sales / region_sales.sum() * 100).round(1)
print("\n各地区销售占比:")
for region, share in region_share.items():
    print(f"  {region}: {share}%")

# ============ 图表3：产品销售分析 ============
print("\n=== 图表3：产品销售分析 ===")
product_sales = df.groupby('product_id').agg({
    'quantity': 'sum',
    'total_price': 'sum'
}).sort_values('total_price', ascending=False)
print(product_sales)

# ============ 图表4：统计摘要 ============
print("\n=== 图表4：数据统计摘要 ===")
summary = pd.DataFrame({
    '指标': ['订单总数', '客户总数', '产品种类', '平均订单金额', '最高订单金额'],
    '数值': [
        len(df),
        df['customer_id'].nunique(),
        df['product_id'].nunique(),
        f"{df['total_price'].mean():.2f}",
        f"{df['total_price'].max():.2f}"
    ]
})
print(summary)

# ============ 可视化文字报告 ============
print("\n📊 销售数据可视化报告")
print("="*40)
top_region = region_sales.index[0]
top_product = product_sales.index[0]

print(f"\n🏆 销售冠军地区: {top_region}")
print(f"   销售额: {region_sales[top_region]:.2f}")

print(f"\n🥇 最畅销产品: {top_product}")
print(f"   销量: {product_sales.loc[top_product, 'quantity']}件")
print(f"   销售额: {product_sales.loc[top_product, 'total_price']:.2f}")

print("\n📈 销售趋势:")
print(f"   从1月1日到1月10日，销售额呈现上升趋势")
print(f"   后期订单金额明显增大（如ORD009订单金额500）")

print("\n✅ 可视化分析完成！")`
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
    tools: ['Python', 'Pandas'],
    codeTemplate: `import pandas as pd
import io
import math

# 预置演示数据（A/B测试结果）
data = '''user_id,group,conversion,revenue
U001,control,0,0
U002,control,1,299
U003,control,0,0
U004,control,0,0
U005,control,1,199
U006,control,0,0
U007,control,0,0
U008,control,1,399
U009,control,0,0
U010,control,0,0
U011,treatment,1,299
U012,treatment,1,399
U013,treatment,0,0
U014,treatment,1,199
U015,treatment,0,0
U016,treatment,1,299
U017,treatment,0,0
U018,treatment,0,0
U019,treatment,1,499
U020,treatment,1,199
U021,control,0,0
U022,control,1,299
U023,control,0,0
U024,control,0,0
U025,control,0,0
U026,treatment,0,0
U027,treatment,1,399
U028,treatment,0,0
U029,treatment,1,299
U030,treatment,0,0'''

# 加载数据
df = pd.read_csv(io.StringIO(data))

# ============ 步骤1：描述性统计 ============
print("=== 描述性统计 ===")
group_stats = df.groupby('group').agg({
    'user_id': 'count',
    'conversion': ['sum', 'mean'],
    'revenue': ['sum', 'mean']
})
print(group_stats)

# 提取关键指标
control_size = df[df['group'] == 'control']['user_id'].count()
treat_size = df[df['group'] == 'treatment']['user_id'].count()
control_conv = df[df['group'] == 'control']['conversion'].mean()
treat_conv = df[df['group'] == 'treatment']['conversion'].mean()

print(f"\n对照组样本量: {control_size}")
print(f"实验组样本量: {treat_size}")
print(f"对照组转化率: {control_conv:.1%}")
print(f"实验组转化率: {treat_conv:.1%}")
print(f"转化率提升: {(treat_conv - control_conv) / control_conv:.1%}")

# ============ 步骤2：假设检验（手动计算） ============
print("\n=== 假设检验 ===")

# 计算标准误差
se_control = math.sqrt(control_conv * (1 - control_conv) / control_size)
se_treat = math.sqrt(treat_conv * (1 - treat_conv) / treat_size)
se_diff = math.sqrt(se_control**2 + se_treat**2)

# 计算z值
z_score = (treat_conv - control_conv) / se_diff
print(f"标准误差: {se_diff:.4f}")
print(f"Z统计量: {z_score:.4f}")

# 计算p值（简化版）
def calculate_p_value(z):
    if z > 0:
        return 2 * (1 - (0.5 * (1 + math.erf(z / math.sqrt(2)))))
    else:
        return 2 * (0.5 * (1 + math.erf(z / math.sqrt(2))))

p_value = calculate_p_value(z_score)
print(f"p值: {p_value:.4f}")

# ============ 步骤3：置信区间 ============
print("\n=== 置信区间 ===")
confidence_level = 0.95
z_critical = 1.96  # 95%置信水平

margin_of_error = z_critical * se_diff
lower_bound = (treat_conv - control_conv) - margin_of_error
upper_bound = (treat_conv - control_conv) + margin_of_error

print(f"转化率差异: {(treat_conv - control_conv):.1%}")
print(f"95%置信区间: [{lower_bound:.1%}, {upper_bound:.1%}]")

# ============ 步骤4：结果解读 ============
print("\n=== 结果解读 ===")
alpha = 0.05

if p_value < alpha:
    print("✅ 结果显著！拒绝原假设")
    print("   结论：新版本页面确实提高了转化率")
    print(f"   转化率提升了 {(treat_conv - control_conv) / control_conv:.1%}")
    print(f"   我们有95%的信心认为真实提升在 {lower_bound:.1%} 到 {upper_bound:.1%} 之间")
else:
    print("❌ 结果不显著，无法拒绝原假设")
    print("   结论：目前数据不足以证明新版本更优")
    print("   建议增加样本量继续测试")

print("\n✅ A/B测试分析完成！")`
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
    tools: ['Python', 'Pandas'],
    codeTemplate: `import pandas as pd
import io

# 预置演示数据（时间序列销售数据）
data = '''order_date,total_sales
2024-01-01,1500
2024-01-02,1800
2024-01-03,1650
2024-01-04,2100
2024-01-05,2400
2024-01-06,2200
2024-01-07,1900
2024-01-08,1700
2024-01-09,1950
2024-01-10,2200
2024-01-11,2500
2024-01-12,2300
2024-01-13,2000
2024-01-14,1800
2024-01-15,2050
2024-01-16,2350
2024-01-17,2600
2024-01-18,2400
2024-01-19,2100
2024-01-20,1900'''

# 加载数据
df = pd.read_csv(io.StringIO(data))
df['order_date'] = pd.to_datetime(df['order_date'])
df.set_index('order_date', inplace=True)

# ============ 步骤1：数据探索 ============
print("=== 时间序列数据探索 ===")
print(df.head())
print(f"\n数据时间范围: {df.index.min()} 到 {df.index.max()}")
print(f"总天数: {len(df)}")
print(f"平均日销售额: {df['total_sales'].mean():.0f}")
print(f"最高日销售额: {df['total_sales'].max():.0f}")
print(f"最低日销售额: {df['total_sales'].min():.0f}")

# ============ 步骤2：计算移动平均 ============
print("\n=== 移动平均分析 ===")
df['ma_3'] = df['total_sales'].rolling(window=3).mean()
df['ma_7'] = df['total_sales'].rolling(window=7).mean()
print(df[['total_sales', 'ma_3', 'ma_7']])

# ============ 步骤3：计算增长率 ============
print("\n=== 增长率分析 ===")
df['daily_growth'] = df['total_sales'].pct_change() * 100
df['weekly_growth'] = df['total_sales'].pct_change(periods=7) * 100
print("日增长率统计:")
print(f"  平均日增长率: {df['daily_growth'].mean():.1f}%")
print(f"  最大日增长: {df['daily_growth'].max():.1f}%")
print(f"  最大日下降: {df['daily_growth'].min():.1f}%")

# ============ 步骤4：简单预测（使用移动平均） ============
print("\n=== 销售预测 ===")
last_7d_avg = df['total_sales'][-7:].mean()
last_3d_avg = df['total_sales'][-3:].mean()

# 加权预测（最近3天权重更高）
forecast = (last_3d_avg * 2 + last_7d_avg) / 3
print(f"最近7天平均销售额: {last_7d_avg:.0f}")
print(f"最近3天平均销售额: {last_3d_avg:.0f}")
print(f"下一日预测销售额: {forecast:.0f}")

# 预测未来7天
forecast_dates = pd.date_range(start=df.index[-1] + pd.Timedelta(days=1), periods=7)
forecast_df = pd.DataFrame({
    'date': forecast_dates,
    'predicted_sales': [forecast] * 7
})
print("\n未来7天预测:")
print(forecast_df)

# ============ 步骤5：季节性分析 ============
print("\n=== 周末效应分析 ===")
df['day_of_week'] = df.index.dayofweek  # 0=周一, 6=周日
weekday_avg = df[df['day_of_week'] < 5]['total_sales'].mean()
weekend_avg = df[df['day_of_week'] >= 5]['total_sales'].mean()
print(f"工作日平均销售额: {weekday_avg:.0f}")
print(f"周末平均销售额: {weekend_avg:.0f}")
print(f"周末溢价: {(weekend_avg - weekday_avg) / weekday_avg:.1%}")

print("\n✅ 时间序列分析完成！")`
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
    tools: ['Python', 'Pandas'],
    codeTemplate: `import pandas as pd
import io

# 预置演示数据（用户行为数据）
data = '''user_id,duration,pages_visited,purchase
U001,300,5,1
U002,120,3,0
U003,600,15,1
U004,90,2,0
U005,450,10,1
U006,60,1,0
U007,500,12,1
U008,180,4,0
U009,700,18,1
U010,45,1,0
U011,350,8,0
U012,550,14,1
U013,200,5,0
U014,650,16,1
U015,100,3,0'''

# 加载数据
df = pd.read_csv(io.StringIO(data))

# ============ 步骤1：探索性分析 ============
print("=== 原始数据 ===")
print(df)
print(f"\n购买转化率: {df['purchase'].mean():.1%}")

# ============ 步骤2：特征构造 ============
print("\n=== 特征构造 ===")

# 派生特征
df['avg_time_per_page'] = df['duration'] / df['pages_visited']
df['avg_time_per_page'] = df['avg_time_per_page'].fillna(0)

# 二值特征
median_duration = df['duration'].median()
df['is_high_duration'] = (df['duration'] > median_duration).astype(int)

# 分箱特征
df['duration_bin'] = pd.cut(df['duration'], bins=[0, 150, 350, 1000], 
                           labels=['short', 'medium', 'long'])

# 标准化特征（手动实现）
df['duration_norm'] = (df['duration'] - df['duration'].mean()) / df['duration'].std()

print(df[['duration', 'pages_visited', 'avg_time_per_page', 'is_high_duration', 'duration_bin']])

# ============ 步骤3：特征选择（基于相关性） ============
print("\n=== 特征选择 ===")
corr_matrix = df[['duration', 'pages_visited', 'avg_time_per_page', 'purchase']].corr()
print("特征相关性矩阵:")
print(corr_matrix)

# 选择与目标变量相关性高的特征
feature_importance = corr_matrix['purchase'].abs().sort_values(ascending=False)
print("\n特征重要性排序:")
print(feature_importance)

selected_features = feature_importance[feature_importance > 0.5].index.tolist()
selected_features.remove('purchase')  # 移除目标变量
print(f"\n选择的特征: {selected_features}")

# ============ 步骤4：特征变换 ============
print("\n=== 特征变换 ===")

# 对数变换
import numpy as np
df['log_duration'] = np.log1p(df['duration'])

# 归一化到[0,1]
df['duration_scaled'] = (df['duration'] - df['duration'].min()) / (df['duration'].max() - df['duration'].min())

print("变换后的特征:")
print(df[['duration', 'log_duration', 'duration_scaled']])

# ============ 步骤5：特征编码 ============
print("\n=== 特征编码 ===")
df_encoded = pd.get_dummies(df, columns=['duration_bin'], prefix='bin')
print("独热编码结果:")
print(df_encoded[['bin_short', 'bin_medium', 'bin_long']])

print("\n✅ 特征工程完成！")
print("\n📋 特征工程清单:")
print("1. 派生特征: avg_time_per_page")
print("2. 二值特征: is_high_duration")
print("3. 分箱特征: duration_bin")
print("4. 标准化特征: duration_norm")
print("5. 对数变换: log_duration")
print("6. 归一化特征: duration_scaled")
print("7. 独热编码: bin_short/medium/long")`
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
    tools: ['Python', 'Pandas'],
    codeTemplate: `import pandas as pd
import io

# 预置演示数据（包含异常值）
data = '''order_id,quantity,unit_price,total_price
ORD001,2,50.0,100.0
ORD002,1,100.0,100.0
ORD003,3,50.0,150.0
ORD004,1,200.0,200.0
ORD005,2,100.0,200.0
ORD006,1,50.0,50.0
ORD007,5,20.0,100.0
ORD008,1,100.0,100.0
ORD009,100,50.0,5000.0  # 异常值：数量异常大
ORD010,2,200.0,400.0
ORD011,1,-50.0,-50.0    # 异常值：价格为负
ORD012,1,1000.0,1000.0  # 异常值：单价异常高
ORD013,3,50.0,150.0
ORD014,2,100.0,200.0
ORD015,1,200.0,200.0'''

# 加载数据
df = pd.read_csv(io.StringIO(data))

# ============ 步骤1：数据概览 ============
print("=== 原始数据 ===")
print(df)
print(f"\n数据行数: {len(df)}")
print(f"总价描述统计:")
print(df['total_price'].describe())

# ============ 方法1：IQR方法 ============
print("\n=== 方法1：IQR方法 ===")
Q1 = df['total_price'].quantile(0.25)
Q3 = df['total_price'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

print(f"Q1: {Q1:.2f}")
print(f"Q3: {Q3:.2f}")
print(f"IQR: {IQR:.2f}")
print(f"下限: {lower_bound:.2f}")
print(f"上限: {upper_bound:.2f}")

outliers_iqr = df[(df['total_price'] < lower_bound) | (df['total_price'] > upper_bound)]
print(f"\n检测到异常值数量: {len(outliers_iqr)}")
print("异常值详情:")
print(outliers_iqr[['order_id', 'quantity', 'unit_price', 'total_price']])

# ============ 方法2：Z-score方法 ============
print("\n=== 方法2：Z-score方法 ===")
mean = df['total_price'].mean()
std = df['total_price'].std()
df['z_score'] = (df['total_price'] - mean) / std

print(f"均值: {mean:.2f}")
print(f"标准差: {std:.2f}")

threshold = 3  # 通常使用3作为阈值
outliers_zscore = df[abs(df['z_score']) > threshold]
print(f"\n检测到异常值数量: {len(outliers_zscore)}")
print("异常值详情:")
print(outliers_zscore[['order_id', 'total_price', 'z_score']])

# ============ 方法3：简单规则检测 ============
print("\n=== 方法3：业务规则检测 ===")

# 规则1：价格不能为负
neg_price = df[df['unit_price'] < 0]
print(f"负价格异常: {len(neg_price)}条")

# 规则2：数量不能过大（超过正常范围）
large_quantity = df[df['quantity'] > 20]
print(f"数量过大异常: {len(large_quantity)}条")

# 规则3：总价异常（超过合理范围）
unreasonable_price = df[(df['total_price'] > 1000) | (df['total_price'] < 0)]
print(f"总价异常: {len(unreasonable_price)}条")

# ============ 步骤4：综合分析 ============
print("\n=== 综合分析 ===")
all_outliers = pd.concat([outliers_iqr, outliers_zscore, neg_price, large_quantity]).drop_duplicates()
print(f"综合检测到异常订单: {len(all_outliers)}条")
print("\n异常订单详情:")
print(all_outliers[['order_id', 'quantity', 'unit_price', 'total_price']])

# ============ 步骤5：处理建议 ============
print("\n=== 处理建议 ===")
print("1. ORD009: 数量100可能是输入错误，建议核实")
print("2. ORD011: 单价为负，明显错误，需要修正")
print("3. ORD012: 单价1000，可能是高价商品或输入错误")

print("\n✅ 异常值检测完成！")`
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
import io

# 预置演示数据 - 订单表
orders_data = '''order_id,customer_id,product_id,quantity,unit_price,order_date
ORD001,C001,P001,2,50.0,2024-01-01
ORD002,C002,P002,1,100.0,2024-01-02
ORD003,C001,P001,3,50.0,2024-01-03
ORD004,C003,P003,1,200.0,2024-01-04
ORD005,C004,P002,2,100.0,2024-01-05
ORD006,C005,P001,1,50.0,2024-01-06'''

# 预置演示数据 - 客户表
customers_data = '''customer_id,name,email,region,signup_date
C001,张三,zhangsan@example.com,华东,2023-06-01
C002,李四,lisi@example.com,华北,2023-07-15
C003,王五,wangwu@example.com,华南,2023-08-20
C004,赵六,zhaoliu@example.com,华中,2023-09-01
C006,钱七,qianqi@example.com,西南,2023-10-10'''

# 加载数据
orders = pd.read_csv(io.StringIO(orders_data))
customers = pd.read_csv(io.StringIO(customers_data))

print("=== 订单表 ===")
print(orders)
print("\n=== 客户表 ===")
print(customers)

# ============ 方法1：内连接（INNER JOIN） ============
print("\n=== 方法1：内连接 ===")
inner_join = pd.merge(orders, customers, on='customer_id', how='inner')
print(f"结果行数: {len(inner_join)}")
print(inner_join[['order_id', 'customer_id', 'name', 'product_id', 'quantity']])

# ============ 方法2：左连接（LEFT JOIN） ============
print("\n=== 方法2：左连接 ===")
left_join = pd.merge(orders, customers, on='customer_id', how='left')
print(f"结果行数: {len(left_join)}")
print("注意：C005在客户表中不存在，所以name等字段为NaN")
print(left_join[['order_id', 'customer_id', 'name', 'product_id']])

# ============ 方法3：右连接（RIGHT JOIN） ============
print("\n=== 方法3：右连接 ===")
right_join = pd.merge(orders, customers, on='customer_id', how='right')
print(f"结果行数: {len(right_join)}")
print("注意：C006没有订单记录")
print(right_join[['order_id', 'customer_id', 'name', 'product_id']])

# ============ 方法4：外连接（FULL OUTER JOIN） ============
print("\n=== 方法4：外连接 ===")
outer_join = pd.merge(orders, customers, on='customer_id', how='outer')
print(f"结果行数: {len(outer_join)}")
print(outer_join[['order_id', 'customer_id', 'name', 'product_id']])

# ============ 方法5：纵向拼接（CONCAT） ============
print("\n=== 方法5：纵向拼接 ===")
orders_part1 = orders.head(3)
orders_part2 = orders.tail(3)
concat_df = pd.concat([orders_part1, orders_part2], ignore_index=True)
print(f"拼接后行数: {len(concat_df)}")
print(concat_df[['order_id', 'customer_id', 'product_id']])

# ============ 方法6：横向拼接 ============
print("\n=== 方法6：横向拼接 ===")
orders_slim = orders[['order_id', 'customer_id', 'total_price']] if 'total_price' in orders.columns else orders[['order_id', 'customer_id']]
orders['total_price'] = orders['quantity'] * orders['unit_price']
orders_slim = orders[['order_id', 'total_price']]
customers_slim = customers[['customer_id', 'name', 'region']]
horizontal_join = pd.concat([orders.set_index('customer_id'), customers_slim.set_index('customer_id')], axis=1, join='inner')
print(horizontal_join.reset_index()[['customer_id', 'order_id', 'name', 'region', 'total_price']])

print("\n✅ 多数据集合并完成！")
print("\n📝 连接类型总结:")
print("1. INNER JOIN: 只保留两边都有的记录")
print("2. LEFT JOIN: 保留左表所有记录，右表匹配不到的为NaN")
print("3. RIGHT JOIN: 保留右表所有记录，左表匹配不到的为NaN")
print("4. OUTER JOIN: 保留两边所有记录")
print("5. CONCAT: 纵向堆叠数据")`
  }
];
