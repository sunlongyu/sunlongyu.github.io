---
title:       "Distributed Denial of Service (DDoS) Flooding Attacks"
subtitle:    "DDOS attack scope and classfication & DDOS defense scope and classfication"
description: ""
date:        2023-09-11
author:      "SLY"
image:       ""
tags:        ["DDOS attack", "DDOS defense"]
categories:  ["SECRUITY"]
---


## section ---categorization of different DDoS flooding attacks

based on the protocol level

1）Network/transport-level DDoS flooding attacks

·disrupting legitimate user’s connectivity by exhausting victim network’s bandwidth”

·exploit bugs of  victim’s protocols in order to consume excess amounts of the victim’s resources

·send forged requests to the reflectors

·generate large messages or multiple messages  to amplify the traffic towards the victim

2）application-level DDoS flooding attacks

·reflection&amplification flooding att（DNS Vo IP）

·HTTP flooding att（session request asymmetric  slow req/res  ）

## section ---the structure of botnets and major botnet types that could be  launched DDoS flooding attacks

structure：![](/mdimg/STRUCTURE.png)

classification of botnet：

1）IRC

an on-line text-based instant messaging protocol,has default channels to communicate between servers

2）WEB

“using HTTP as a communication protocol to send commands to the bots，they hide themselves within legitimate HTTP traffic

3）P2P

## section ---classification of the defense mechanisms based on location & time and discuss various defense mechanisms against DDoS flooding attacks”

classfication based on location % time：
![](/mdimg/classfication.png)

### location/network&tran level

1）source-based

deployed near the sources of the attack

·Ingress/Egress6 filtering at the sources’ edge routers--检查网络内的有效 IP 地址范围，并过滤掉源地址不在此范围内的数据包

·D-WARD--通过监控源网络的入站和出站流量来检测和缓解 DDoS泛洪攻击，将网络流量与预定义的正常流量模型进行比较，并过滤掉偏离这些模型的攻击流量

·MULTOPS&TOPS--MULTOPS 通过监控传入和传出流量的速率来识别可能预示攻击的异常情况。不过容易受到内存耗尽攻击，而且当流量速率不成正比时，假阴性率可能会很高；TOPS监控数据包流量速率，并使用哈希算法检测流量不平衡。然而这里假定传入和传出流量速率成正比，而实际情况可能并非总是如此，这就导致了潜在的假阴性和攻击者操纵流量速率的能力

·MANAnet’s Reverse Firewall--通过限制转发来自网络内部的数据包的速率，保护网络免受DDoS泛洪攻击。不同于传统防火墙对传入数据包的保护，反向防火墙侧重于防止来自网络内部的数据包泛洪攻击。不过它需要手动配置，且无法在运行时动态更改设置

2）destination-based

“detection and response is mostly done at the destination of the attack (victim)

·IP traceback--回溯 DDoS 攻击中伪造 IP 数据包的真正来源。可分为数据包标记机制（路由器用标识信息标记数据包）和链路测试机制（回溯过程反复测试上游链路，以确定攻击者流量的路径）。部署 IP 回溯机制需要确保足够的路由器支持、回溯信息的验证和计算开销

·Management information base--分析数据包和路由统计。通过持续监控 MIB 数据，受害者可以检测到 DDoS 攻击，并识别 ICMP、UDP 和 TCP 数据包中的统计异常。MIB 还能提供调整网络参数以减轻攻击影响的方法，但在真实网络环境中的有效性还需要进一步评估

·Packet marking and filtering--在通往目的地的路径上的每个路由器上标记合法数据包，并允许目的地的边缘路由器根据这些标记过滤掉攻击流量。不同的技术（基于历史记录的 IP 过滤、跳数过滤和路径标识符 (Pi)）用来识别和阻止不需要的流量

·Packet dropping based on the level of congestion--根据网络拥塞程度在目的地丢弃数据包。当网络高度拥塞时，来自潜在攻击者的数据包会被丢弃，以优先处理合法流量。不过它也可能在高度拥堵期间丢弃合法数据包，导致网络通信中断

3）Network-based

deployed inside networks and mainly on the routers of the ASs

·Route-based packet filtering--它将入口过滤扩展到互联网的核心路由器，并过滤意外出现的数据包，并认为这些数据包已被欺骗。但如果攻击者使用真正的 IP 地址或精心选择的源 IP 地址，而这些地址未被过滤，那么这种机制可能无法有效抵御 DDoS 攻击

·Detecting and filtering malicious routers--采用异常检测协议来识别参与恶意活动（如 DDoS 攻击或错误路由数据包）的路由器。通过检测和过滤这些恶意路由器，加强网络安全并防止有害流量的传播

4）Hybrid (Distributed) mechanisms

deployed at (or their components are distributed over) multiple locations such as source, destination or intermediate networks and there is usually cooperation among the deployment points

·Hybrid packet marking and throttling/filtering mechanisms--多个部署点（如源网络、目的地网络或中间网络）的合作，以检测和应对 DDoS 攻击。通常采用数据包标记、节流和过滤等技术识别和缓解恶意流量

·DEFensive Cooperative Overlay Mesh (DEFCOM--促进了专业防御节点之间的协作和通信，使它们能够检测和应对受害者和源头附近的攻击。利用点对点网络结构来近似底层拓扑结构，从而能够识别攻击流量来源，并在这些来源附近实施速率限制。不过对在线部署分类器节点的依赖可能会限制其大规模部署，并在攻击期间对来自传统网络的合法客户端造成潜在的（DoS）攻击

·COSSACK--在边缘网络的边界路由器上运行，依赖于入口/出口过滤机制和根据攻击特征过滤数据包的能力等假设。但无法有效抵御来自未部署该防御机制的传统网络的攻击。

·Capability-based mechanisms--机制允许目的地明确授权其希望接收的流量，向发送方授予称为能力的短期授权。网络路径上的验证点会根据这些能力检查流量是否合法，优先处理有权限的数据包，并丢弃未经授权的流量

·Active Internet Traffic Filtering (AITF) as a filter-based (datagram) mechanism--允许接收方有选择地接受授权流量，同时默认拒绝所有其他流量。AITF 在数据报级别运行，提供了一种过滤和控制网络流量的方法

·StopIt--允许接收者安装网络过滤器来阻止不良流量，使用 Passport 安全源验证系统，采用封闭式控制和开放式服务架构。在各种 DDoS 攻击下提供持续通信方面，StopIt 的性能优于 AITF 等其他基于过滤器的设计，但它可能容易受到向路由器和 StopIt 服务器发出大量过滤器请求和数据包洪水的攻击

summary

“stopping the attack as close as possible to the attack sources” ([pdf](zotero://open-pdf/library/items/C6ZRBNWK?page=14))

“hybrid (Distributed) defense mechanism is the best way to combat DDoS Attacks” ([pdf](zotero://open-pdf/library/items/C6ZRBNWK?page=14))
![](/mdimg/summary.png)

### location/app level

1）destination-based

closely observe the server and model its clients’ behavior so that they can detect any anomalies and drop or rate limit the malicious requests

·Defense against Reflection/Amplification attacks--过采用收集和分析网络数据、使用机器学习算法以及采用统计方法来识别和阻止恶意流量等技术来检测和缓解此类攻击

·DDoS-Shield--利用统计方法检测 HTTP 会话的特征，并采用速率限制作为主要防御机制。DDoS-Shield 为每个客户端会话分配一个连续值，并使用抗 DDoS 调度器来决定何时调度会话请求，但目前还不清楚如果合法会话被调度器放弃，是否会再给它一次机会

·Anomaly detector based on hidden semi-Markov model--利用隐藏半马尔科夫模型的来描述访问矩阵的动态，并检测潜在的攻击。缺点是算法复杂度高

·DAT (Defense Against Tilt DDoS attacks)--在整个连接会话期间监控用户的特征，以确定用户是否是恶意的，并根据用户的行为提供有区别的服务。该机制旨在通过分析用户行为来检测和应对 DDoS 攻击，但其有效性可能会受到算法复杂性的限制

2）Hybrid (Distributed) mechanisms

between clients and servers to detect and respond to the attacks

·Speak-up--鼓励客户端自动发送更高的流量，以排挤恶意请求，获取更多的服务器资源。这种机制对会seesion泛洪攻击有效，但不适用于request泛洪攻击或asymmetric攻击

·DOW (Defense and Offense Wall)--结合了 Speak-up 的鼓励方法和基于 K-means 聚类的异常检测方法。通过鼓励合法客户端提高会话速率，同时放弃可疑会话，来检测和过滤会话泛洪攻击、请求泛洪攻击和非对称攻击

·Differentiate DDoS flooding bots from human--使用 "区分计算机和人类的全自动图灵测试"（CAPTCHA），要求用户通过解谜来验证自己的身份。种方法可能会给用户带来不便，而且可能会妨碍网络爬虫访问网站。另一种方法涉及分析请求动态、内容选择和忽略不可见内容的能力，以区分人类和机器人

·Admission control and congestion control--利用信任来区分合法用户和攻击者。每个用户都会根据其历史记录分配一个许可证和一个信任值，这样服务器就能在攻击期间优先保护好用户的连接，而不是识别所有攻击请求。

·“Hybrid detection based on trust and information theory based metrics--基于信任的客户端评估与信息论指标（如熵）相结合，以过滤和限制可疑流量。通过考虑客户的信任值和浏览行为，准确区分合法请求和恶意请求

### time

1）before

be deployed at the attack sources, intermediate networks, destinations or a combination of them

2）during

在网络的不同点部署各种机制来检测这些攻击，如监控网络拥塞程度或分析网络/传输和应用层面的异常流量模式。检测机制通常采用数据挖掘和人工智能技术来学习正常的流量行为，并识别预示着 DDoS 攻击的偏差

3）after

检测到（DDoS）攻击后，防御系统需要识别攻击源并阻止攻击流量。但是，完全预防或阻止 DDoS 攻击具有挑战性，因此重点在于将影响降至最低并最大限度地提高服务可用性。执法机构和互联网提供商之间的合作对于收集证据和保护资产免受 DDoS 攻击至关重要。

