+++
title = 'LLM开发之RAG'
date = 2024-12-15T12:00:00+08:00
draft = false
categories = ['RAG', 'LLM']
#tags = ['RAG', 'LLM', '大模型', '检索增强生成']
description = "大模型应用开发之RAG"
column = "大模型相关"
csdn_url = "https://blog.csdn.net/weixin_46516647/article/details/147849351"
slug = "llm-rag"
aliases = ["/blogs/llm%E5%BC%80%E5%8F%91%E4%B9%8Brag/", "/blogs/llm开发之rag/"]
+++

# 一、RAG 概述

## （一）LLM 的缺陷

  * **幻觉** ：LLM 可能生成无事实依据、不与现实世界一致，甚至完全虚构的内容。
  * **知识更新滞后** ：LLM 知识的有效性取决于训练数据的时间，存在知识更新滞后问题。
  * **回答缺乏透明度** ：LLM 生成的回答通常缺乏引用来源，导致用户难以判断答案的真实性，降低模型可信度。

## （二）Definition

为缓解上述问题，RAG 通过检索外部知识库相关信息，并将信息作为上下文输入语言模型，增强生成能力，减少幻觉、提供事实依据，借外部知识库实现实时更新，使生成结果带检索来源，提升专业领域表现。

## （三）组件

  * **向量数据库 (Vector DB)** ：存储和检索嵌入向量，如 FAISS、Pinecone、Weaviate。
  * **嵌入模型 (Embedding Model)** ：将文本转换为向量，如 OpenAI Embeddings、BERT。
  * **检索模型 (Retriever)** ：检索相关信息，可使用 BM25、Dense Retrieval (DPR) 等方法。
  * **LLM (Large Language Model)** ：如 GPT - 4 等，负责生成最终答案。
  * **融合策略 (Fusion Strategy)** ：结合检索信息与 LLM 结果，提高生成可信度。

## （四）常见应用领域

  * **企业知识问答**
  * **法律 / 医疗领域问答**
  * **金融风控**
  * **搜索增强对话**

# 二、RAG 实现

## （一）数据处理

### 1\. 数据清洗 cleaning

  * **去重 (Deduplication)** ：去除重复文档或内容，提高存储效率，减少无效检索。
  * **噪声过滤 (Noise Filtering)** ：删除无关内容、广告、低质量文本，避免干扰 LLM 生成。
  * **格式标准化 (Normalization)** ：统一文本编码、标点符号、日期格式，保证数据一致性。

### 2\. 数据分片 chunking

#### 基于规则的 chunking

  * **固定长度分片** ：按固定字符数或单词数切分，如每 512 词分为一个 Chunk。适合结构化文本（如 Wikipedia），但可能导致句子或段落拆散，影响语义完整性。
  * **基于段落的 Chunking** ：以自然语言逻辑单元（如句子、段落）进行分片，保持上下文完整性。适用于法律、医学文档，但 Chunk 长度不均匀，可能影响索引效率。
  * **滑动窗口分片** ：相邻 Chunk 之间有部分重叠，如窗口大小 256 词，滑动步长 128 词。可保证跨段落上下文信息，减少查询时信息丢失，但增加存储和计算开销。

#### 基于模型的 chunking

  * **Transformer 句子分割** ：用 Transformer 模型（如 BERT、RoBERTa）检测句子边界，以高语义相关性进行分片。适用于复杂文档（如法律、医学文本），避免破坏逻辑结构。
  * **基于依存关系的 Chunking** ：依存句法分析识别主谓宾结构，以语法结构为基础拆分 Chunk。适用于技术文档（如 API 说明书、论文摘要）。
  * **基于 LLM 的 Chunking** ：让 LLM 自适应判断 Chunk 切分点，根据上下文哪些部分应作为独立片段。适用于非结构化文本（如用户评论、社交媒体内容）。

#### Small2Big Chunking

  * **核心思想** ：先生成较小 Chunk，再按语义相似度合并成较大 Chunk，形成合理文档分片结构，结合固定长度切分与语义分析，避免传统 Chunking 方法弊端。
  * **初步切分小片段 (Small Chunks)** ：用固定长度或自然段落切分，保持文本语义完整性。
  * **计算 Chunk 之间语义相似度** ：用 BERT/SBERT 向量嵌入将 Chunk 表示为向量；计算相邻 Chunk 余弦相似度 S_{i,i+1}；设相似度阈值 \tau ，若 S_{i,i+1} > \tau 则合并。
  * **相似度高的 Chunk 合并** ：形成更大、更有信息密度的片段，逐步执行直至不满足合并条件。
  * **存入向量数据库** ：采用 FAISS/Pinecone 存储优化后的 Chunk。

### 3\. 数据嵌入 embedding

  * **嵌入模型选择** ：
    * **OpenAI—text-embedding-ada-002** ：输出 1536 维向量，适合通用任务，支持多种语言。
    * **SBERT（Sentence-BERT）** ：BERT 变体，专为句子级 Embedding 设计，适合语义匹配和问答任务。
    * **BAAI（bge-base-zh）** ：在中文任务上表现优异，适合中文 RAG 应用。
    * **DistilBERT** ：BERT 轻量级版本，计算效率高，适合资源受限环境。
    * **自定义微调模型** ：微调现有模型（如 BERT、RoBERTa）以适应特定专业领域或任务的 RAG 应用。

  * **优化 query** ：
    * **Query Rewriting（查询重写）** ：用语言模型（LLM）使用户查询更自然、易检索。
    * **HyDE（假想文档嵌入）** ：生成 “假想文档” 或 “假想答案”，以其向量匹配真实文档提升检索效果。

  * **优化文档 Embedding** ：
    * **生成摘要** ：为长文档（如论文）生成简短摘要，存储摘要与全文的 Embedding。
    * **假想问题** ：为每个文档生成可能回答的问题，存储问题的 Embedding。

## （二）检索 Retrieval

### 1\. 检索流程

RAG 检索流程通常包括两个阶段：

  * **召回 (Retrieval)** ：基于关键词（如 BM25）或语义（Embedding ANN）快速检索出候选文档。
  * **重排序 (Rerank)** ：对初步召回文档进行精细语义相关度计算，得到精确排序结果。

### 2\. 召回

  * **关键词检索** ：基于精确词汇匹配检索，典型代表是 BM25 算法。
  * **语义检索** ：利用向量空间模型表示文本语义，通过向量相似度检索，包括余弦相似度算法、FAISS、HNSW。
  * **混合检索** ：结合关键词检索和语义检索优势，采用多阶段检索策略，并行召回或串行召回。

### 3\. 重排序

  * **Rerank 一般流程** ：输入候选文档集合 {D1,…,Dn} 和查询文本 Q；利用 Cross-Encoder 模型分别计算每对 (Q,Di) 相关度评分（常见模型有基于 BERT 的 Cross-Encoder、领域特定 Finetuned Cross-Encoder）；按分数高低重新排序，取前 k 个文档作为最终结果。
  * **提升 Rerank 算法效果的方法** ：
    * **领域微调 (Finetune)** ：用相关领域数据微调 Cross-Encoder 模型。
    * **知识蒸馏 (Knowledge Distillation)** ：训练轻量级模型，降低延迟。
    * **难负例 (Hard Negative) 训练** ：增强模型识别能力。

## （三）生成 Generation

### 1\. 生成策略流程

检索阶段获取与查询相关的文档或片段；将检索内容融入 Prompt 中；使用生成模型（如 GPT - 4）基于 Prompt 生成最终答案。

### 2\. 几种生成策略

  * **Prompt-based 生成策略** ：将检索到的文档直接放入 Prompt 中生成，简单高效易实现，但受限于模型最大上下文长度，可能产生幻觉问题。Prompt =[Instruction]+[Retrieved Docs]+[Query]
  * **融合生成策略 (Fusion-in-Decoder)** ：在 Decoder 阶段结合多个检索文档信息，增强答案精准度，减少幻觉问题，但推理速度较慢，实现成本高。
    * **RAG-Sequence** ：逐步选择合适文档生成答案，每一步动态选择上下文。
    * **RAG-Token** ：每生成一个词 (Token) 都动态选择不同文档的信息支持当前生成内容。

  * **选代生成策略 (Iterative Generation)** ：允许模型在多轮迭代中优化答案，用于需极高准确性的场景。根据初步答案再次检索相关文档；重新生成答案，迭代至达到期望质量。
  * **自一致性生成策略 (Self-Consistency)** ：多次生成并融合多个候选答案提高整体质量，提高结果稳定性，但计算成本高。对同一检索结果多次调用生成模型，得多个答案；用多数投票或评分融合机制选最优答案。

### 3\. 生成策略优化

  * **Prompt 工程优化** ：合理设计 Prompt 结构，提升生成质量。
  * **领域特定模型微调 (Finetune)** ：在专业领域内优化生成效果。
  * **Temperature 和 Top-k 调整** ：调低 temperature 参数提高生成稳定性和一致性。

## （四）增强 Augment

### 1\. 预训练数据增强

  * **随机掩蔽 (Random Masking)** ：随机掩盖句子或文档中的词汇，让模型预测被掩盖内容，增强语言理解能力。
  * **随机替换同义词 (Synonym Replacement)** ：用 WordNet 或词典随机替换句子中的词汇，提升对同义表达的泛化能力。
  * **上下文乱序 (Sentence Permutation)** ：在段落级别随机打乱句子顺序，增强对整体语义的理解。
  * **回译 (Back Translation)** ：利用多语言模型，将文本翻译成另一种语言再回译，生成语义等价但表达不同的文本，提升语义泛化能力。

### 2\. 微调数据增强

  * **领域术语增强 (Domain-specific Term Replacement)** ：在特定领域内用同领域同义术语替换，强化模型对领域术语的理解。
  * **句子拼接与切分 (Sentence Concatenation and Splitting)** ：将多个句子拼接或长句切分为短句，增加训练样本多样性，提高对复杂上下文的处理能力。
  * **对比学习增强 (Contrastive Learning Augmentation)** ：构造正负样本对（如问答对），采用对比学习提高检索精确度和生成连贯性。
  * **知识注人 (Knowledge Injection)** ：从知识图谱或百科知识库抽取相关知识，嵌入训练数据，提升对知识的捕获和利用能力。

### 3\. 推理数据增强

  * **Prompt 增强 (Prompt Augmentation)** ：使用多样化的 Prompt 结构或模板，提高生成模型对问题的理解能力与稳定性。
  * **上下文扩展与补充 (Context Expansion)** ：在原始检索文档基础上，增加相关背景文档或扩展信息，降低生成幻觉风险。
  * **多次推理融合 (Multi-sampling Generation)** ：针对同一问题多次生成（不同 temperature 或 top-k），通过投票或打分机制选最优答案，提升答案质量和稳定性（Self-consistency 方法）。
  * **迭代自问白答 (Iterative SelfAsk)** ：利用生成结果多次检索和迭代生成，增强生成内容的深度与准确性。

# 三、RAG 评估

## （一）评估方法

### 1\. 检索评估

评估召回质量，即系统能否召回正确且相关的文档。关注检索阶段的准确性和召回率，特别是 context relevance 指标（检索到的 chunks 与 query 的相似度）。常用方法包括：MRR、Recall@k、NDCG、Hit rate 等。

### 2\. 生成评估

评估最终生成答案的质量，包括准确性、流畅性与一致性。一方面衡量生成答案能否忠实地反映检索到的上下文内容，避免幻觉或无根据答案，确保可信与基于事实；另一方面关注答案是否直接有效回答用户问题，体现准确性和有效性。

## （二）评估框架

  * **LangChain Evaluation** ：内置标准化评估流程，支持检索评估、生成评估及自动指标计算。
  * **LlamaIndex Eval Framework** ：专注 RAG 场景，提供综合检索与生成质量评估。
  * **Haystack Eval Framework** ：集成检索与问答场景评估能力，适用于工业级 RAG 系统。
  * **RAGAS (Retrieval-Augmented Generation Assessment)** ：专门用于 RAG 场景的评估框架，可同时评估检索与生成质量。
