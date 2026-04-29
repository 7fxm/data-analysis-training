import { TestQuestion } from '../../types';

export const project01Questions: TestQuestion[] = [
  {
    id: 1,
    question: '以下哪个函数用于加载CSV文件？',
    options: ['pd.read_csv()', 'pd.load_csv()', 'pd.import_csv()', 'pd.open_csv()'],
    correctAnswer: 0,
    explanation: 'pandas中使用pd.read_csv()函数来加载CSV文件，这是最常用的数据加载方法。',
    category: 'concept'
  },
  {
    id: 2,
    question: 'df.info()方法主要用于查看什么信息？',
    options: ['数据的统计摘要', '数据的基本信息和数据类型', '数据的前5行', '数据的缺失值数量'],
    correctAnswer: 1,
    explanation: 'df.info()方法用于查看DataFrame的基本信息，包括列名、数据类型、非空值数量等。',
    category: 'concept'
  },
  {
    id: 3,
    question: '处理缺失值的方法有哪些？',
    options: ['只能删除', '只能填充', '可以删除或填充', '必须保留'],
    correctAnswer: 2,
    explanation: '处理缺失值主要有两种方法：使用dropna()删除包含缺失值的行，或使用fillna()填充缺失值。',
    category: 'concept'
  },
  {
    id: 4,
    question: '以下代码的输出结果是什么？\n```python\nimport pandas as pd\ndf = pd.DataFrame({"A": [1, None, 3]})\nprint(df.dropna())\n```',
    options: ['包含1行数据的DataFrame', '包含2行数据的DataFrame', '包含3行数据的DataFrame', '报错'],
    correctAnswer: 1,
    explanation: 'dropna()会删除包含None/NaN值的行，原DataFrame有3行其中第2行包含None，删除后剩2行。',
    category: 'code'
  },
  {
    id: 5,
    question: '如何将字符串类型的日期列转换为datetime类型？',
    options: ['df["date"].to_datetime()', 'pd.to_datetime(df["date"])', 'df["date"].convert()', 'df["date"].astype(datetime)'],
    correctAnswer: 1,
    explanation: '使用pd.to_datetime()函数可以将字符串类型的日期列转换为datetime类型。',
    category: 'code'
  },
  {
    id: 6,
    question: '以下代码执行后，df的行数是多少？\n```python\ndf = pd.DataFrame({"price": [10, -5, 20, 0, 15]})\ndf = df[df["price"] > 0]\n```',
    options: ['5行', '4行', '3行', '2行'],
    correctAnswer: 2,
    explanation: '条件df["price"] > 0会筛选出price大于0的行，原数据中-5和0不满足条件，剩下3行。',
    category: 'code'
  },
  {
    id: 7,
    question: '在销售数据分析中，发现某笔订单的数量为负数，这通常意味着什么？',
    options: ['数据错误，应该删除', '可能是退货订单', '系统bug', '正常情况'],
    correctAnswer: 1,
    explanation: '销售数据中负数数量通常代表退货或取消订单，需要结合业务场景判断是否为异常值。',
    category: 'application'
  },
  {
    id: 8,
    question: '计算总价列时，需要注意什么？',
    options: ['数量和单价必须是整数', '数量和单价的数据类型要兼容', '必须使用循环计算', '只能使用apply函数'],
    correctAnswer: 1,
    explanation: '计算总价时需要确保数量和单价的数据类型兼容（如都是数值类型），否则可能报错或得到意外结果。',
    category: 'application'
  },
  {
    id: 9,
    question: '某数据集有1000行，删除缺失值后剩800行，又删除异常值后剩750行。以下哪个分析最合理？',
    options: ['删除了太多数据，结果不可靠', '缺失值比异常值影响更大', '保留了75%的数据，在可接受范围内', '应该保留所有原始数据'],
    correctAnswer: 2,
    explanation: '数据清洗后保留75%的数据通常是可以接受的，关键是要记录清洗过程并评估对分析结果的影响。',
    category: 'analysis'
  },
  {
    id: 10,
    question: '数据清洗完成后，应该做什么？',
    options: ['直接进行分析', '保存清洗后的数据并记录清洗过程', '删除原始数据', '重新收集数据'],
    correctAnswer: 1,
    explanation: '数据清洗完成后应该保存清洗后的数据，并记录清洗步骤和原因，以便后续追溯和复现。',
    category: 'analysis'
  }
];

export const project02Questions: TestQuestion[] = [
  {
    id: 1,
    question: 'groupby操作的主要目的是什么？',
    options: ['删除重复数据', '按条件将数据分组', '排序数据', '合并数据'],
    correctAnswer: 1,
    explanation: 'groupby操作用于按照一个或多个字段的值将数据分成多个组，以便对每组进行聚合分析。',
    category: 'concept'
  },
  {
    id: 2,
    question: '以下哪个聚合函数可以计算平均值？',
    options: ['sum()', 'count()', 'mean()', 'max()'],
    correctAnswer: 2,
    explanation: 'mean()函数用于计算平均值，sum()计算总和，count()计算数量，max()计算最大值。',
    category: 'concept'
  },
  {
    id: 3,
    question: 'agg()函数的作用是什么？',
    options: ['分组数据', '同时应用多个聚合函数', '排序数据', '过滤数据'],
    correctAnswer: 1,
    explanation: 'agg()函数可以对分组后的数据同时应用多个聚合函数，如sum、mean、count等。',
    category: 'concept'
  },
  {
    id: 4,
    question: '以下代码的输出是什么类型？\n```python\ndf.groupby("region")["sales"].sum()\n```',
    options: ['DataFrame', 'Series', 'List', 'Dictionary'],
    correctAnswer: 1,
    explanation: '对单个列进行groupby聚合后返回的是Series类型，索引是分组键，值是聚合结果。',
    category: 'code'
  },
  {
    id: 5,
    question: '如何对多个字段进行分组？',
    options: ['df.groupby("field1, field2")', 'df.groupby(["field1", "field2"])', 'df.groupby(field1, field2)', 'df.multi_groupby(["field1", "field2"])'],
    correctAnswer: 1,
    explanation: '多字段分组需要将字段名放在列表中，如df.groupby(["field1", "field2"])。',
    category: 'code'
  },
  {
    id: 6,
    question: '分组聚合后如何重置索引？',
    options: ['df.reset_index()', 'df.reindex()', 'df.set_index()', 'df.index_reset()'],
    correctAnswer: 0,
    explanation: '使用reset_index()方法可以将分组后的索引转换为普通列，使结果更易于处理。',
    category: 'code'
  },
  {
    id: 7,
    question: '在销售分析中，想了解各地区的销售情况，应该使用什么方法？',
    options: ['按地区排序', '按地区分组并求和', '按地区筛选', '按地区合并'],
    correctAnswer: 1,
    explanation: '要了解各地区的销售情况，应该按地区分组，然后对销售额求和，得到各地区总销售额。',
    category: 'application'
  },
  {
    id: 8,
    question: '透视表(pivot_table)与groupby的主要区别是什么？',
    options: ['功能完全相同', '透视表可以更灵活地重塑数据结构', 'groupby更灵活', '透视表只能求和'],
    correctAnswer: 1,
    explanation: '透视表可以更灵活地将一个字段作为行、另一个字段作为列，生成二维表格结构。',
    category: 'application'
  },
  {
    id: 9,
    question: '某公司想分析各产品在各地区的销售表现，以下哪种方法最合适？',
    options: ['单字段groupby', '多字段groupby或透视表', '简单排序', '数据筛选'],
    correctAnswer: 1,
    explanation: '分析两个维度（产品和地区）的销售表现，应该使用多字段groupby或透视表。',
    category: 'analysis'
  },
  {
    id: 10,
    question: '分组聚合结果中出现NaN值，可能的原因是什么？',
    options: ['代码错误', '该组没有数据', '聚合函数选择错误', '数据类型错误'],
    correctAnswer: 1,
    explanation: '分组聚合结果中出现NaN通常表示该组没有数据或所有值都是缺失值。',
    category: 'analysis'
  }
];

export const project03Questions: TestQuestion[] = [
  {
    id: 1,
    question: '关联规则分析的主要目的是什么？',
    options: ['预测销售额', '发现物品之间的关联关系', '分类客户', '检测异常值'],
    correctAnswer: 1,
    explanation: '关联规则分析用于发现数据中物品之间的关联关系，如"购买A的人通常会购买B"。',
    category: 'concept'
  },
  {
    id: 2,
    question: '支持度(Support)表示什么？',
    options: ['规则的准确度', '物品组合出现的频率', '规则的置信度', '物品的重要性'],
    correctAnswer: 1,
    explanation: '支持度表示物品组合在所有交易中出现的频率，即包含该组合的交易占总交易的比例。',
    category: 'concept'
  },
  {
    id: 3,
    question: '置信度(Confidence)的计算公式是什么？',
    options: ['P(A∩B)', 'P(B|A)', 'P(A|B)', 'P(A)×P(B)'],
    correctAnswer: 1,
    explanation: '置信度P(B|A)表示在A发生的条件下B发生的概率，即购买A后购买B的可能性。',
    category: 'concept'
  },
  {
    id: 4,
    question: 'Apriori算法的核心思想是什么？',
    options: ['频繁项集的子集也是频繁的', '所有项集都是频繁的', '只考虑单个物品', '随机选择规则'],
    correctAnswer: 0,
    explanation: 'Apriori算法基于先验原理：如果一个项集是频繁的，那么它的所有子集也是频繁的。',
    category: 'code'
  },
  {
    id: 5,
    question: '在mlxtend库中，哪个函数用于生成关联规则？',
    options: ['apriori()', 'association_rules()', 'generate_rules()', 'find_rules()'],
    correctAnswer: 1,
    explanation: 'association_rules()函数用于从频繁项集生成关联规则，可以指定置信度等阈值。',
    category: 'code'
  },
  {
    id: 6,
    question: '提升度(Lift)大于1表示什么？',
    options: ['A和B负相关', 'A和B正相关', 'A和B独立', '规则无效'],
    correctAnswer: 1,
    explanation: '提升度大于1表示A和B正相关，即购买A会增加购买B的可能性；小于1表示负相关。',
    category: 'code'
  },
  {
    id: 7,
    question: '在超市购物篮分析中，发现{面包,牛奶}的支持度很高，这说明了什么？',
    options: ['面包和牛奶一定一起买', '很多顾客同时购买面包和牛奶', '面包导致牛奶购买', '牛奶导致面包购买'],
    correctAnswer: 1,
    explanation: '高支持度只表示该组合频繁出现，不能说明因果关系，需要结合置信度和提升度分析。',
    category: 'application'
  },
  {
    id: 8,
    question: '为什么购物篮数据需要转换为布尔矩阵？',
    options: ['减少数据量', 'Apriori算法需要布尔类型输入', '提高计算速度', '方便可视化'],
    correctAnswer: 1,
    explanation: 'Apriori算法需要布尔类型的输入，表示每个交易中是否包含某个物品。',
    category: 'application'
  },
  {
    id: 9,
    question: '某规则{尿布}→{啤酒}的置信度0.8，提升度1.5，如何解读？',
    options: ['购买尿布的人80%会买啤酒，且正相关', '购买啤酒的人80%会买尿布', '该规则不可靠', '两者没有关联'],
    correctAnswer: 0,
    explanation: '置信度0.8表示购买尿布的人有80%概率买啤酒；提升度1.5表示正相关，规则有意义。',
    category: 'analysis'
  },
  {
    id: 10,
    question: '设置支持度阈值时，以下哪种做法更合理？',
    options: ['阈值越高越好', '阈值越低越好', '根据业务需求和数据量调整', '使用默认值即可'],
    correctAnswer: 2,
    explanation: '支持度阈值需要根据业务需求和数据量调整，太高可能漏掉有价值的规则，太低会产生太多无意义规则。',
    category: 'analysis'
  }
];

export const project04Questions: TestQuestion[] = [
  {
    id: 1,
    question: '聚类分析属于哪种机器学习类型？',
    options: ['监督学习', '无监督学习', '半监督学习', '强化学习'],
    correctAnswer: 1,
    explanation: '聚类分析是无监督学习方法，不需要标签数据，根据数据特征自动分组。',
    category: 'concept'
  },
  {
    id: 2,
    question: 'K-means算法中的K代表什么？',
    options: ['迭代次数', '聚类数量', '数据维度', '特征数量'],
    correctAnswer: 1,
    explanation: 'K-means中的K表示要将数据分成的聚类数量，需要预先指定。',
    category: 'concept'
  },
  {
    id: 3,
    question: '为什么聚类前需要对特征进行标准化？',
    options: ['提高计算速度', '消除特征尺度差异的影响', '减少数据量', '增加特征数量'],
    correctAnswer: 1,
    explanation: '标准化可以消除不同特征之间的尺度差异，避免数值大的特征主导聚类结果。',
    category: 'concept'
  },
  {
    id: 4,
    question: '以下哪个是sklearn中K-means的正确用法？',
    options: ['KMeans().predict(data)', 'KMeans(n_clusters=3).fit(data)', 'kmeans(data, k=3)', 'cluster(data, method="kmeans")'],
    correctAnswer: 1,
    explanation: '使用sklearn的KMeans需要先实例化并指定n_clusters，然后调用fit方法。',
    category: 'code'
  },
  {
    id: 5,
    question: '肘部法则(Elbow Method)用于什么？',
    options: ['评估聚类质量', '确定最佳聚类数K', '标准化数据', '选择特征'],
    correctAnswer: 1,
    explanation: '肘部法则通过绘制不同K值对应的SSE曲线，找到"肘部"点来确定最佳聚类数。',
    category: 'code'
  },
  {
    id: 6,
    question: 'K-means的fit_predict()方法返回什么？',
    options: ['聚类中心', '每个样本的聚类标签', 'SSE值', '轮廓系数'],
    correctAnswer: 1,
    explanation: 'fit_predict()方法返回每个样本所属的聚类标签，是一个与样本数相同的数组。',
    category: 'code'
  },
  {
    id: 7,
    question: '在客户分群中，使用RFM模型时，RFM代表什么？',
    options: ['收入、频率、金额', '最近购买时间、购买频率、消费金额', '地区、性别、年龄', '注册时间、活跃度、消费'],
    correctAnswer: 1,
    explanation: 'RFM代表Recency(最近购买时间)、Frequency(购买频率)、Monetary(消费金额)。',
    category: 'application'
  },
  {
    id: 8,
    question: '轮廓系数的取值范围是多少？',
    options: ['0到1', '-1到1', '0到100', '任意实数'],
    correctAnswer: 1,
    explanation: '轮廓系数取值范围是-1到1，越接近1表示聚类效果越好，接近-1表示聚类效果差。',
    category: 'application'
  },
  {
    id: 9,
    question: '某客户聚类分析得到3个群体，群体1消费高频率低，群体2消费低频率高，群体3消费中等频率中等。如何制定营销策略？',
    options: ['对所有群体采用相同策略', '群体1重点维护，群体2促销激活，群体3常规运营', '只关注群体1', '放弃群体2'],
    correctAnswer: 1,
    explanation: '应根据不同群体特征制定差异化策略：高价值客户重点维护，低频客户促销激活，中等客户常规运营。',
    category: 'analysis'
  },
  {
    id: 10,
    question: 'K-means聚类结果不稳定，每次运行结果不同，可能的原因是什么？',
    options: ['算法错误', '初始中心点随机选择', '数据量太大', '特征太少'],
    correctAnswer: 1,
    explanation: 'K-means随机初始化聚类中心，可能导致不同运行得到不同结果。可设置random_state保证可复现。',
    category: 'analysis'
  }
];

export const project05Questions: TestQuestion[] = [
  {
    id: 1,
    question: 'matplotlib中，哪个函数用于创建图形？',
    options: ['plt.plot()', 'plt.figure()', 'plt.show()', 'plt.draw()'],
    correctAnswer: 1,
    explanation: 'plt.figure()用于创建新的图形窗口，可以指定大小等属性。',
    category: 'concept'
  },
  {
    id: 2,
    question: '以下哪个函数用于绑制折线图？',
    options: ['plt.bar()', 'plt.plot()', 'plt.scatter()', 'plt.hist()'],
    correctAnswer: 1,
    explanation: 'plt.plot()用于绑制折线图，plt.bar()绘制柱状图，plt.scatter()绘制散点图，plt.hist()绘制直方图。',
    category: 'concept'
  },
  {
    id: 3,
    question: '如何设置图表的标题？',
    options: ['plt.name()', 'plt.title()', 'plt.label()', 'plt.caption()'],
    correctAnswer: 1,
    explanation: 'plt.title()函数用于设置图表的标题。',
    category: 'concept'
  },
  {
    id: 4,
    question: '以下代码会绑制什么？\n```python\nplt.bar(["A", "B", "C"], [10, 20, 15])\n```',
    options: ['三条折线', '三个柱子', '三个点', '三个饼图扇区'],
    correctAnswer: 1,
    explanation: 'plt.bar()绑制柱状图，第一个参数是x轴标签，第二个参数是柱子高度。',
    category: 'code'
  },
  {
    id: 5,
    question: '如何让matplotlib正确显示中文？',
    options: ['不需要设置', '设置plt.rcParams["font.sans-serif"]', '使用中文字体文件', 'matplotlib不支持中文'],
    correctAnswer: 1,
    explanation: '需要设置plt.rcParams["font.sans-serif"]为支持中文的字体，如SimHei。',
    category: 'code'
  },
  {
    id: 6,
    question: 'plt.show()的作用是什么？',
    options: ['保存图表', '显示图表', '清除图表', '创建图表'],
    correctAnswer: 1,
    explanation: 'plt.show()用于显示绑制的图表，在交互环境中会弹出图形窗口。',
    category: 'code'
  },
  {
    id: 7,
    question: '展示销售额随时间的变化趋势，应该使用什么图表？',
    options: ['柱状图', '折线图', '饼图', '散点图'],
    correctAnswer: 1,
    explanation: '折线图最适合展示数据随时间的变化趋势，可以清晰看到上升或下降趋势。',
    category: 'application'
  },
  {
    id: 8,
    question: '展示各产品销售额占比，应该使用什么图表？',
    options: ['折线图', '柱状图', '饼图', '直方图'],
    correctAnswer: 2,
    explanation: '饼图最适合展示各部分占整体的比例关系。',
    category: 'application'
  },
  {
    id: 9,
    question: '某销售趋势图显示销售额持续下降，但柱状图显示各月销售额相近。可能的原因是什么？',
    options: ['数据错误', '图表类型选择不当', '坐标轴刻度问题', '颜色选择错误'],
    correctAnswer: 2,
    explanation: '可能是坐标轴刻度范围设置问题，如y轴范围过大导致差异不明显，或从非零值开始。',
    category: 'analysis'
  },
  {
    id: 10,
    question: '创建多个子图应该使用哪个函数？',
    options: ['plt.multiplot()', 'plt.subplots()', 'plt.subplot()', 'plt.divide()'],
    correctAnswer: 1,
    explanation: 'plt.subplots()用于创建包含多个子图的图形，返回图形对象和子图数组。',
    category: 'analysis'
  }
];

export const project06Questions: TestQuestion[] = [
  {
    id: 1,
    question: 'A/B测试的主要目的是什么？',
    options: ['预测未来销量', '比较两个版本的效果差异', '分类用户', '检测异常值'],
    correctAnswer: 1,
    explanation: 'A/B测试用于比较两个版本(A组和B组)的效果差异，判断哪个版本更好。',
    category: 'concept'
  },
  {
    id: 2,
    question: '在A/B测试中，p值小于0.05意味着什么？',
    options: ['结果不显著', '结果显著，可以拒绝原假设', '测试失败', '需要更多数据'],
    correctAnswer: 1,
    explanation: 'p值小于显著性水平(通常0.05)表示结果具有统计显著性，可以拒绝原假设。',
    category: 'concept'
  },
  {
    id: 3,
    question: '原假设(H0)通常表示什么？',
    options: ['两组有显著差异', '两组没有显著差异', 'A组更好', 'B组更好'],
    correctAnswer: 1,
    explanation: '原假设通常表示"没有差异"或"没有效果"，是我们要检验并可能拒绝的假设。',
    category: 'concept'
  },
  {
    id: 4,
    question: '以下代码使用什么检验方法？\n```python\nfrom scipy import stats\nstats.ttest_ind(group_a, group_b)\n```',
    options: ['卡方检验', 't检验', 'F检验', 'Z检验'],
    correctAnswer: 1,
    explanation: 'stats.ttest_ind()用于执行独立样本t检验，比较两组均值是否有显著差异。',
    category: 'code'
  },
  {
    id: 5,
    question: '如何计算转化率？',
    options: ['转化人数 / 总人数', '总人数 / 转化人数', '转化人数 × 总人数', '转化人数 + 总人数'],
    correctAnswer: 0,
    explanation: '转化率 = 转化人数 / 总人数，表示转化人数占总人数的比例。',
    category: 'code'
  },
  {
    id: 6,
    question: '置信区间的作用是什么？',
    options: ['确定样本量', '估计总体参数的范围', '计算p值', '选择检验方法'],
    correctAnswer: 1,
    explanation: '置信区间给出了总体参数可能落入的范围，如95%置信区间表示有95%的概率包含真实值。',
    category: 'code'
  },
  {
    id: 7,
    question: 'A/B测试中，实验组转化率5%，对照组转化率4%，p值0.03。如何解读？',
    options: ['差异不显著', '实验组显著优于对照组', '对照组更好', '需要更多数据'],
    correctAnswer: 1,
    explanation: 'p值0.03<0.05，结果显著。实验组转化率更高，说明实验组效果更好。',
    category: 'application'
  },
  {
    id: 8,
    question: '为什么A/B测试需要足够的样本量？',
    options: ['减少计算时间', '提高统计功效，减少假阴性', '方便数据分析', '降低成本'],
    correctAnswer: 1,
    explanation: '样本量不足会导致统计功效低，可能检测不到真实存在的差异(假阴性)。',
    category: 'application'
  },
  {
    id: 9,
    question: '某A/B测试显示新版本转化率提高0.1%，p值0.04。是否应该推广新版本？',
    options: ['应该推广，结果显著', '不应该推广，提升太小', '需要考虑业务成本和收益', '需要更多测试'],
    correctAnswer: 2,
    explanation: '统计显著不等于业务意义。0.1%的提升可能无法覆盖改版成本，需要综合评估。',
    category: 'analysis'
  },
  {
    id: 10,
    question: '同时测试多个指标时，为什么需要注意多重比较问题？',
    options: ['计算更复杂', '增加假阳性风险', '降低统计功效', '增加样本需求'],
    correctAnswer: 1,
    explanation: '多重比较会增加犯第一类错误(假阳性)的概率，需要进行校正如Bonferroni校正。',
    category: 'analysis'
  }
];

export const project07Questions: TestQuestion[] = [
  {
    id: 1,
    question: '时间序列数据的主要特点是什么？',
    options: ['数据独立', '数据按时间顺序排列，存在相关性', '数据随机分布', '数据没有规律'],
    correctAnswer: 1,
    explanation: '时间序列数据按时间顺序排列，相邻时间点的数据通常存在相关性。',
    category: 'concept'
  },
  {
    id: 2,
    question: 'ARIMA模型中，AR代表什么？',
    options: ['平均回归', '自回归', '移动平均', '积分'],
    correctAnswer: 1,
    explanation: 'AR代表自回归(AutoRegressive)，表示用过去的值预测当前值。',
    category: 'concept'
  },
  {
    id: 3,
    question: '时间序列的平稳性是指什么？',
    options: ['数据没有波动', '统计特性不随时间变化', '数据呈直线', '数据有规律'],
    correctAnswer: 1,
    explanation: '平稳性是指时间序列的均值、方差等统计特性不随时间变化。',
    category: 'concept'
  },
  {
    id: 4,
    question: 'ARIMA(1,1,1)中的三个参数分别代表什么？',
    options: ['周期、趋势、季节', 'AR阶数、差分阶数、MA阶数', '均值、方差、标准差', '样本量、预测步数、置信度'],
    correctAnswer: 1,
    explanation: 'ARIMA(p,d,q)中p是AR阶数，d是差分阶数，q是MA阶数。',
    category: 'code'
  },
  {
    id: 5,
    question: '如何将DataFrame设置为时间索引？',
    options: ['df.set_index("date")', 'df.time_index("date")', 'df.index_time("date")', 'df.to_timeseries("date")'],
    correctAnswer: 0,
    explanation: '使用df.set_index("date")将日期列设置为索引，便于时间序列分析。',
    category: 'code'
  },
  {
    id: 6,
    question: 'resample("D")的作用是什么？',
    options: ['删除数据', '按天重采样', '排序数据', '填充缺失值'],
    correctAnswer: 1,
    explanation: 'resample("D")将数据按天进行重采样，可以配合sum()、mean()等聚合。',
    category: 'code'
  },
  {
    id: 7,
    question: '销售数据有明显季节性波动，应该使用什么模型？',
    options: ['简单移动平均', 'ARIMA', 'SARIMA(季节性ARIMA)', '线性回归'],
    correctAnswer: 2,
    explanation: '有季节性的时间序列应使用SARIMA模型，它在ARIMA基础上增加了季节性成分。',
    category: 'application'
  },
  {
    id: 8,
    question: '如何判断时间序列是否平稳？',
    options: ['直接观察', 'ADF检验', '计算平均值', '绘制散点图'],
    correctAnswer: 1,
    explanation: '可以使用ADF检验(Augmented Dickey-Fuller test)来统计判断时间序列是否平稳。',
    category: 'application'
  },
  {
    id: 9,
    question: '某ARIMA模型预测未来30天销售额，预测值逐渐趋于平稳。这说明什么？',
    options: ['模型错误', '模型捕捉到了均值回归特性', '需要更多数据', '应该增加预测步数'],
    correctAnswer: 1,
    explanation: 'ARIMA预测长期会趋于序列均值，这是均值回归特性，短期预测更可靠。',
    category: 'analysis'
  },
  {
    id: 10,
    question: '时间序列预测的置信区间随预测步数增加而变宽，这说明了什么？',
    options: ['模型不稳定', '预测不确定性增加', '数据有问题', '需要调整参数'],
    correctAnswer: 1,
    explanation: '预测越远，不确定性越大，置信区间自然变宽，这是正常现象。',
    category: 'analysis'
  }
];

export const project08Questions: TestQuestion[] = [
  {
    id: 1,
    question: '特征工程的主要目的是什么？',
    options: ['增加数据量', '创建更好的特征以提升模型性能', '减少计算时间', '美化数据'],
    correctAnswer: 1,
    explanation: '特征工程通过创建、选择、变换特征，提升机器学习模型的性能。',
    category: 'concept'
  },
  {
    id: 2,
    question: '特征选择的好处不包括以下哪项？',
    options: ['减少过拟合', '提高模型性能', '增加模型复杂度', '加快训练速度'],
    correctAnswer: 2,
    explanation: '特征选择会降低模型复杂度，而不是增加。它有助于减少过拟合、提高性能和加快训练。',
    category: 'concept'
  },
  {
    id: 3,
    question: 'StandardScaler和MinMaxScaler的主要区别是什么？',
    options: ['功能相同', 'StandardScaler标准化(均值0方差1)，MinMaxScaler归一化(0-1范围)', 'MinMaxScaler更快', 'StandardScaler只用于分类'],
    correctAnswer: 1,
    explanation: 'StandardScaler将数据转换为均值0方差1；MinMaxScaler将数据缩放到指定范围(默认0-1)。',
    category: 'concept'
  },
  {
    id: 4,
    question: '以下代码的作用是什么？\n```python\nfrom sklearn.feature_selection import SelectKBest\nselector = SelectKBest(k=5)\n```',
    options: ['创建5个特征', '选择最好的5个特征', '删除5个特征', '复制5个特征'],
    correctAnswer: 1,
    explanation: 'SelectKBest(k=5)用于从所有特征中选择最好的5个特征。',
    category: 'code'
  },
  {
    id: 5,
    question: '如何创建派生特征"平均每页停留时间"？',
    options: ['df["avg_time"] = sum(duration, pages)', 'df["avg_time"] = df["duration"] / df["pages"]', 'df["avg_time"] = df["duration"] * df["pages"]', 'df["avg_time"] = df["duration"] - df["pages"]'],
    correctAnswer: 1,
    explanation: '平均每页停留时间 = 总停留时间 / 访问页面数，即duration / pages。',
    category: 'code'
  },
  {
    id: 6,
    question: '什么是特征泄漏？',
    options: ['特征丢失', '使用了未来信息或目标信息', '特征重复', '特征缺失'],
    correctAnswer: 1,
    explanation: '特征泄漏是指在特征中包含了目标变量或未来信息，导致模型评估结果虚高。',
    category: 'code'
  },
  {
    id: 7,
    question: '在用户行为预测中，以下哪个可能是好的派生特征？',
    options: ['用户ID', '用户活跃天数', '用户注册时间', '用户姓名'],
    correctAnswer: 1,
    explanation: '用户活跃天数是行为派生特征，对预测用户行为有实际意义。ID和姓名通常没有预测价值。',
    category: 'application'
  },
  {
    id: 8,
    question: '为什么需要对类别特征进行编码？',
    options: ['减少数据量', '机器学习模型通常需要数值输入', '提高数据质量', '方便存储'],
    correctAnswer: 1,
    explanation: '大多数机器学习模型只能处理数值输入，需要将类别特征转换为数值编码。',
    category: 'application'
  },
  {
    id: 9,
    question: '某模型使用原始特征准确率80%，特征工程后准确率85%。如何评价？',
    options: ['提升太小，不值得', '特征工程有效，提升了5个百分点', '可能是过拟合', '无法判断'],
    correctAnswer: 1,
    explanation: '5个百分点的提升是有意义的改进，说明特征工程帮助模型学到了更好的模式。',
    category: 'analysis'
  },
  {
    id: 10,
    question: '特征重要性分析显示某特征重要性为0，应该如何处理？',
    options: ['保留该特征', '删除该特征', '增加该特征的权重', '复制该特征'],
    correctAnswer: 1,
    explanation: '重要性为0的特征对模型没有贡献，可以删除以简化模型。',
    category: 'analysis'
  }
];

export const project09Questions: TestQuestion[] = [
  {
    id: 1,
    question: '什么是异常值？',
    options: ['缺失的数据', '与其他数据差异显著的值', '重复的数据', '错误的数据'],
    correctAnswer: 1,
    explanation: '异常值是指与大多数数据差异显著的值，可能是测量错误或真实的极端情况。',
    category: 'concept'
  },
  {
    id: 2,
    question: 'IQR方法中，异常值的判断标准是什么？',
    options: ['大于均值', '小于Q1-1.5*IQR或大于Q3+1.5*IQR', '等于中位数', '大于标准差'],
    correctAnswer: 1,
    explanation: 'IQR方法将小于Q1-1.5*IQR或大于Q3+1.5*IQR的值判定为异常值。',
    category: 'concept'
  },
  {
    id: 3,
    question: 'Z-score方法中，通常将绝对值大于多少的值视为异常值？',
    options: ['1', '2', '3', '5'],
    correctAnswer: 2,
    explanation: 'Z-score绝对值大于3的数据点通常被视为异常值，表示偏离均值超过3个标准差。',
    category: 'concept'
  },
  {
    id: 4,
    question: '以下代码计算的是什么？\n```python\nQ1 = df["price"].quantile(0.25)\nQ3 = df["price"].quantile(0.75)\nIQR = Q3 - Q1\n```',
    options: ['均值和方差', '四分位距', '标准差', '中位数'],
    correctAnswer: 1,
    explanation: 'Q1是第25百分位数，Q3是第75百分位数，IQR=Q3-Q1是四分位距。',
    category: 'code'
  },
  {
    id: 5,
    question: '孤立森林(Isolation Forest)的主要思想是什么？',
    options: ['计算距离', '异常值更容易被孤立', '聚类分析', '密度估计'],
    correctAnswer: 1,
    explanation: '孤立森林基于异常值更容易被孤立的思想，用较少的分割次数就能将异常值分离。',
    category: 'code'
  },
  {
    id: 6,
    question: 'sklearn中孤立森林的contamination参数表示什么？',
    options: ['异常值数量', '异常值比例', '树的数量', '特征数量'],
    correctAnswer: 1,
    explanation: 'contamination参数指定数据集中异常值的预期比例。',
    category: 'code'
  },
  {
    id: 7,
    question: '在信用卡欺诈检测中，应该更关注什么？',
    options: ['检测所有异常值', '尽量减少漏报(假阴性)', '尽量减少误报', '使用最简单的方法'],
    correctAnswer: 1,
    explanation: '欺诈检测中漏掉真正的欺诈会造成损失，应该尽量减少漏报，即使会增加一些误报。',
    category: 'application'
  },
  {
    id: 8,
    question: '检测到异常值后，以下哪种处理方式不合适？',
    options: ['删除异常值', '用中位数替换', '保留并分析原因', '直接忽略，不做任何处理'],
    correctAnswer: 3,
    explanation: '发现异常值后应该分析原因并采取适当处理，不能直接忽略。',
    category: 'application'
  },
  {
    id: 9,
    question: '某销售额数据中，IQR方法检测出10个异常值，Z-score检测出8个，其中6个重叠。如何处理？',
    options: ['以IQR为准', '以Z-score为准', '综合分析，查看重叠的6个值', '删除所有18个值'],
    correctAnswer: 2,
    explanation: '不同方法可能检测到不同异常值，应综合分析，重点关注两种方法都检测到的值。',
    category: 'analysis'
  },
  {
    id: 10,
    question: '异常值检测在数据清洗中应该在什么阶段进行？',
    options: ['最开始', '处理缺失值之后', '最后阶段', '任何时候都可以'],
    correctAnswer: 1,
    explanation: '应先处理缺失值再进行异常值检测，因为缺失值可能影响统计量的计算。',
    category: 'analysis'
  }
];

export const project10Questions: TestQuestion[] = [
  {
    id: 1,
    question: 'pd.merge()的主要作用是什么？',
    options: ['删除数据', '根据共同列合并两个DataFrame', '排序数据', '分组数据'],
    correctAnswer: 1,
    explanation: 'pd.merge()用于根据一个或多个共同列(键)将两个DataFrame合并。',
    category: 'concept'
  },
  {
    id: 2,
    question: 'merge的how参数有几种连接类型？',
    options: ['2种', '3种', '4种', '5种'],
    correctAnswer: 2,
    explanation: 'merge有4种连接类型：inner(内连接)、left(左连接)、right(右连接)、outer(外连接)。',
    category: 'concept'
  },
  {
    id: 3,
    question: 'pd.concat()的主要作用是什么？',
    options: ['横向合并', '纵向或横向拼接多个DataFrame', '删除重复', '数据分组'],
    correctAnswer: 1,
    explanation: 'pd.concat()用于沿指定轴拼接多个DataFrame，默认纵向拼接(axis=0)。',
    category: 'concept'
  },
  {
    id: 4,
    question: '以下代码执行什么类型的连接？\n```python\npd.merge(df1, df2, on="id", how="left")\n```',
    options: ['内连接', '左连接', '右连接', '外连接'],
    correctAnswer: 1,
    explanation: 'how="left"表示左连接，保留左表所有记录，右表没有匹配的用NaN填充。',
    category: 'code'
  },
  {
    id: 5,
    question: '合并时两个表的键列名不同，应该如何处理？',
    options: ['重命名列', '使用left_on和right_on参数', '无法合并', '使用on参数'],
    correctAnswer: 1,
    explanation: '使用left_on指定左表的键列，right_on指定右表的键列，可以合并键名不同的表。',
    category: 'code'
  },
  {
    id: 6,
    question: 'concat后出现重复索引，如何处理？',
    options: ['无法处理', '使用ignore_index=True', '删除重复行', '使用reset_index()'],
    correctAnswer: 1,
    explanation: '设置ignore_index=True可以重新生成索引，避免重复索引问题。',
    category: 'code'
  },
  {
    id: 7,
    question: '订单表和客户表合并时，应该使用什么连接类型来确保所有订单都有客户信息？',
    options: ['内连接', '左连接(订单表为左)', '右连接', '外连接'],
    correctAnswer: 0,
    explanation: '使用内连接可以确保只保留有匹配客户信息的订单，避免出现没有客户信息的订单。',
    category: 'application'
  },
  {
    id: 8,
    question: '合并两个表后发现数据量比预期少，可能的原因是什么？',
    options: ['使用了内连接，部分记录没有匹配', '数据丢失', '代码错误', '内存不足'],
    correctAnswer: 0,
    explanation: '内连接只保留两个表都有匹配的记录，如果部分记录没有匹配，数据量会减少。',
    category: 'application'
  },
  {
    id: 9,
    question: '合并三个表A、B、C，A有100行，B有80行，C有60行。使用内连接后剩50行，这说明了什么？',
    options: ['数据丢失', '只有50行在三个表中都有匹配', '应该使用外连接', '合并错误'],
    correctAnswer: 1,
    explanation: '内连接结果为三个表的交集，50行表示只有这些记录在三个表中都有匹配。',
    category: 'analysis'
  },
  {
    id: 10,
    question: '合并后出现_x和_y后缀的列，是什么原因？',
    options: ['代码错误', '两个表有同名列', '数据重复', '索引问题'],
    correctAnswer: 1,
    explanation: '当两个表有同名列时，pandas会自动添加_x和_y后缀区分，可用suffixes参数自定义。',
    category: 'analysis'
  }
];

export const allQuestions: Record<string, TestQuestion[]> = {
  '1': project01Questions,
  '2': project02Questions,
  '3': project03Questions,
  '4': project04Questions,
  '5': project05Questions,
  '6': project06Questions,
  '7': project07Questions,
  '8': project08Questions,
  '9': project09Questions,
  '10': project10Questions
};
