+++
title = 'web开发中的通信协议'
date = '2026-04-23T10:38'
draft = false
column = '开发'
+++
​



#  1. websocket

 

def：websocket协议是基于tcp的，实现浏览器与服务器之间全双工通信的一种网络协议

 

websocket是一种持久协议，多应用在聊天，客服咨询等有实时报送需求的场景下。

 

早期没有websocket时，通过ajax短时轮询，客户端发送http请求给服务器，服务器再给客户端进行响应，服务器无法给浏览器主动发送数据，所以浏览器需要定时给服务器发送请求，这很大程度的浪费资源和性能。

 

![](https://i-blog.csdnimg.cn/blog_migrate/942dfd999153b7213457ad2833b801a2.png)




&nbsp;

 

特点：

 

![](https://i-blog.csdnimg.cn/blog_migrate/94d7ea5119aa3d574a290a32182fc36e.png)





&nbsp;

 

websocket事件与方法

 

![](https://i-blog.csdnimg.cn/blog_migrate/9eda858874799e364344f07547f251f1.png)





&nbsp;

 

![](https://i-blog.csdnimg.cn/blog_migrate/68f8f9fe8998300ea35ebb31e0c59b35.png)





&nbsp;

 

nodejs创建自己的websocket服务：

 

1）导入nodejs-websocket包

 

2）创建server

 

3）监听端口

 



# 2.webrtc

 

def：web real time communication 网页及时通信，一种支持网页浏览器进行实时语音对话或视频对话的 API，允许浏览器之间直接连接

 

在websocket中客户端之间的通信还是需要经过服务器的中转，在webrtc中两个客户端可以直接进行对等连接

 

![](https://i-blog.csdnimg.cn/blog_migrate/2b2dcf6ef6b78c69aded1f9d5a9f9783.png)





&nbsp;

 

1）信服令服务器

 

![](https://i-blog.csdnimg.cn/blog_migrate/3b3d2c02babdba28e01427694802ce20.png)





&nbsp;

 

2）stun服务器

 

当设备不在同一个本地网络中时，只能通过公共IP地址来实现相互访问，但设备有时难以获得公共IP地址，所以需要stun服务器获取公共 IP地址

 

![](https://i-blog.csdnimg.cn/blog_migrate/e13621d0e61f6829484a41b3ff21ab81.png)




&nbsp;

 

3）turn服务器

 

turn服务器是在客户端连接失败时，进行转接的点，由于其本身位于公网上，所以能被各个客户端找到

 

![](https://i-blog.csdnimg.cn/blog_migrate/a4c46d5249998e513b019b2f042b35fd.png)





&nbsp;

 


# 3. sse

 

def：[Server-sent events](https://www.zhihu.com/search?q=Server-sent%20events&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A%222926278692%22%7D "Server-sent events")（SSE）是一种用于实现服务器到客户端的单向通信的协议。使用SSE，服务器可以向客户端推送实时数据，而无需客户端发出请求

 

SSE建立在HTTP协议上，使用基于文本的数据格式（通常是JSON）进行通信。客户端通过创建一个EventSource对象来与服务器建立连接，然后可以监听服务器发送的事件。服务器端可以随时将事件推送给客户端，客户端通过监听事件来接收这些数据

 

与其他实时通信协议（如WebSocket）相比，[Server-sent events通信](https://www.zhihu.com/search?q=Server-sent%20events%E9%80%9A%E4%BF%A1&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A%222926278692%22%7D "Server-sent events通信")是一种轻量级协议，易于实现和部署。此外，它也具有广泛的浏览器兼容性，并且可以在不需要特殊网络配置的情况下使用

 

![](https://i-blog.csdnimg.cn/blog_migrate/711737208d01fb9108e91c0f2392582d.png)





&nbsp;

 

ChatGPT是一个基于深度学习的大型语言模型，处理自然语言文本需要大量的计算资源和时间。因此，返回响应的速度肯定比普通的读数据库要慢的多，Http接口显然并不合适，因为Http是一次性返回，等待时间过长，而Websocket又过重，因为全双工通信并不适合这种单项对话场景，所谓单项对话场景，就是对话双方并不会并发对话，而是串行的一问一答逻辑，同时持久化链接也会占用服务器资源，要知道ChatGPT几乎可以算是日均活跃用户数全球最高的Web应用了。

 

效率层面，大型语言模型没办法一下子返回所有计算数据，但是可以通过Server-sent events将前面计算出的数据先“推送”到前端，这样用户也不会因为等待时间过长而关闭页面，所以ChatGPT的前端观感就是像打字机一样，一段一段的返回答案，这种“边计算边返回”的生成器模式也提高了ChatGPT的回答效率。

 

sse详细：[https://www.zhihu.com/question/583939974/answer/2926278692](https://www.zhihu.com/question/583939974/answer/2926278692)

 

  


 ​