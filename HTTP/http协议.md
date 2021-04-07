### 概述
`HTTP`是获取像`HTML`这样的网络资源的通信协议（protocol）。

#### HTTP的发展

##### HTTP/0.9 - 单行协议
单行文本协议，请求有单行完成，唯一可用方法`GET`开头，其后跟着目标资源的路径
```
GET /mypage.html
```
响应头也极其简单：只包含响应文档本身

```
<HTML>
Hello World!
</HTML>
```
HTTP/0.9 的响应内容并不包含`HTTP`头，这意味着只有`HTML`文件可以传送，==无法传输其他类型的文件==；也没有状态码和错误代码；一旦出现问题，一个特殊包含问题描述信息的HTML文件会被发回。供人们查看。

---

#### HTTP/1.0 - 构建可扩展性 RFC 1945
- 协议版本号（请求头）
- 状态码（响应）
- 引入HTTP头的概念（请求和响应），可以传输纯文本HTML文件以外其他类型文档的能力

请求头
```
GET /mypage.html HTTP/1.0
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)

200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Server: CERN/3.0 libwww/2.17
Content-Type: text/html
<HTML>
hello world
    <IMG SRC='/myimage.gif'/>
</HTML>
```
获取图片的请求头

```
GET /myimage.gif HTTP/1.0
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)

200 OK
Date: Tue, 15 Nov 1994 08:12:32 GMT
Server: CERN/3.0 libwww/2.17
Content-Type: text/gif
```
---

#### HTTP/1.1 - 标准化协议

- 连接可以复用，节省了多次打开`TCP`连接加载网页文档资源的时间;
- 增加管线化技术，允许在第一次应答被完全发送之前就发送第二个请求，以降低通信延迟;（一次性发送多个请求，不必等请求回来再发送第二个请求）。
- 引入额外的缓存控制技术。
- 支持响应分块（`Transfer-Encoding:chunked`）。
- 引入内容协商机制。包括语言、编码、类型等。
- 感谢`HOST`头，可以让不同域名配置在同一个IP地址的服务器

##### HTTP/1.1 连接复用
```
Connection: keep-alive // 判断后续请求使用长连接
Keep-Alive: timeout=5,max=1000
Content-Length: 500 // 使用长连接 响应必须返回content-length，用于表示HTTP响应是否结束
```
- 较少的使用`CPU`和内存的使用（同时打开的连接减少）;
- 允许请求和应答的`HTTP`流水线（多个`HTTP`请求同时推送到服务端，服务端必须遵守`HTTP/1.1`规范，按照请求顺序依次回复请求【使用`FIFO队列`来完成，但是容易造成队头堵塞；而且这种技术只能使用GET、HEAD请求】）==管线化技术==
- 减低拥塞控制（TCP连接减少了）
- 减少了后续请求的延迟（后续请求无需握手）
- 报告错误无需关闭TCP连接

==任何服务器和代理服务器不应该维持超过2个链接==

##### HTTP/1.1 分块传输（Chunked Transfer Encoding）

> 是超文本协议（HTTP）中的一种数据传输机制，允许http有网页服务器发送给客户端应用的数据可以分成多个部分。

响应头
```
HTTP/1.1 200 OK
Transfer-Encoding:chunked

<chunked 1 length>
<chunked 1 length>
<chunked 2 length>
<chunked 2 length>

0 // 最后以0结束
```
==分块编码==
服务器动态创建内容，无法在发送之前得知主题的长度。 分块编码允许服务器吧主体逐块发送，说明每块的大小就可以了。

```
HTTP/1.1 200 OK
Content-type: text/plain
Transfer-encoding: chunked
Trailer: Content-MD5

27 // 十六进制表示每块的大小
hello world 

27
hello world

0 // 表示结尾
Content-MD5: gjeqi54p26tjisgj3p4utjgrj53 // 可选（当报文首部有Trailer首部是才出现）
```
==Content-length==
1. 如果特定的HTTP报文类型中不允许带有主体，就忽略Content-Length。（因为并不存在主体）
2. 如果报文中Content-length（并且报文类型允许有实体主体），而且没有非恒定的Transfer-encoding，那么content-length 就是实体的长度。
3. 如果存在恒定的Transfer-Encoding，那就按照传输编码解析。
4. 如果报文使用了multipart/byteranges(多部分/字节范围)，并且没有用Content—Length首部指出实体主体的长度，那么多部分的报文中的每个部分都要说明字节的大小

哪些特定的HTTP报文类型中不允许带有主体？
> HEAD请求，HEAD请求服务器会发生等价的GET请求，但是不包括主体。


##### 由管线化产生的问题
HTTP队头堵塞。和TCP队头堵塞不一样。

###### TCP队头堵塞

队头堵塞，发生在一个TCP分节丢失，导致后续分节不是按照顺序到达客户端。 该后续分节将被接收端一直保持直到丢失的第一个分节被发送端重传并到达接收端为止。该后续分节的延迟递送确保接收应用进程能够按照发送端的发送顺序接收数据。


产生TCP队头堵塞，是因为TCP本身的实现机制有关；想要避免就必须舍弃TCP。比如使用QUIC协议、SCTP协议。


###### HTTP队头堵塞
使用keep-alive，http/1.1使用管道化，客户端把多个请求依次发往服务器，服务器必须依次响应这些个请求，但是如果某个请求客户端没有收到或者连接中断时，客户端必须重新发送请求。

如何避免HTTP1.1管道化实现的队头堵塞？可以使用`HTTP/2.0`。

##### HTTP/1.1 的缓存控制

Cache-Control:
1. no-store: 缓存中不得存储任何关于客户端请求和服务端响应的内容。
2. no-cache: 每次有请求发出时，缓存会将次请求发送到服务器（但是不会带有本地缓存相关的验证字段），服务器会验证请求缓存是否过期，没过期304（使用本地缓存）
3. 

##### HTTP/2.0


---

#### Cookie 和 Session


---

##### Cookie 

是`服务器`发送到`用户浏览器`并保存在本地的一小块数据，它会在浏览器下次向同一服务器再次请求是会携带并发送到服务器上。

==`Cookie` 的生命周期==
- `会话期Cookie`：浏览器关闭之后会自动删除；不需要指定的过期时间（`expires`) 或者有效期；但是有的浏览器会出现会话恢复的功能，这种情况下即使关闭了浏览器，会话也会是被保存的，就好像从来没有关闭一样
- 持久期cookie：设定额过期时间`expires`和`max-age`。
```
Set-Cookie: id=123; Expires=Web，21 Oct 2015 07:28:00 GMT;
```
==`Cookie` 导致的安全问题==

第三方能够确定一个用户的会话标识符（例如：通过读取Cookie或设置）。

==`限制访问 Cookie`==

###### `Secure` `HttpOnly`和属性

被标记`Secure`属性的`Cookie`，只允许`HTTPS`协议加密发送给服务器；即使这样，敏感信息不能用`Cookie`发送；有可能通过访问磁盘来读取`Cookie`

JS中`document.cookie`无法读取标记为`HttpOnly`。不能设置含有`HttpOnly`以及`Expires`小于当前时间的`Cookie`。

```
Set-Cookie: id=123; Expires=Web, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly;
```

==`Path` 和 `Domain`==
规定了哪些主机可以接受`Cookie`，`Domain`默认为`origin`，不包含子域名。设置了`Domain`则包含了子域名。`path`表示域名下的路径可以接受`Cookie`。

新增的`SameSite`属性

```
Set-Cookie: id=12; SameSite=Strict
```
含有SameSite属性的Cookie 允许服务器要求某个cookie在跨站请求时不会被发送。

==同站、同域==的概念
同站： 指的是`有效顶级域名`再加上它的`下一级域名`（eTLD + 1）
同域：协议、域名、端口一致。

具体的属性值：
1. None: 浏览器会在同站请求、和跨站带上这个域下的`Cookie`
2. Strict： 同站请求会带上这个`Cookie`
3. Lax：同站请求会带上；跨站请求只有在（安全的跨站顶级跳转）

`安全的跨站顶级跳`包括：
- 点击`a`链接
- 以`GET`方式提交表单
- JS修改location
- JS调用`window.open()`;

##### 为什么要新增`SameSite`属性?
起初，无论是同站请求还是跨站请求都会带上各自域下的`Cookie`，效果等同于`SameSite=None`。这会导致出现CSRF漏洞、跨站信息泄露。

引入`SameSite` 改进一下：
- 没有声明 `SameSite` 属性的`Cookie` 被处理为 `SameSite=Lax`。也就是`Cookie` 的默认行为由 `SameSite=None` 改为 `SameSite=Lax`。
- 设置为 `SameSite=None` 的 `Cookie`，必须同时被标记为 `Secure`。也就是只能在 `HTTPS` 的情况下使用 `SameSite=None`.


**但是全部使用 SameSite=Strict，可能会带来一些用户体验上的问题。例如：著名社区土司比较注重用户的安全，所以将整站的 Cookie 都设置成了 SameSite=Strict。但这样会导致很多从外站点击超链接跳转到土司的用户无法正常查看帖子，可能需要重新登录。**


服务器指定`Cookie`时，浏览器每次请求时都会带上`Cookie`。

例如：

服务器响应头部
```
HTTP/1.0 200 ok
Content-type: text/html
Set-cookie: yummy_cookie=hello
Set-cookie: tasty_cookie=world

[页面内容]
```
下次访问同一服务器
```
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=hello; tasty_cookie=world
```

---


##### Session 
Session 代表着服务器和客户端一次会话的过程。客户端请求服务器，服务器会开辟出一块内存，这个内存就是Session对象。用于保存特定用户会话所需的属性和配置信息。

##### 为什么需要`Cookie`和`Session`。

HTTP属于无状态协议，所谓无状态协议，就是2次请求不相关联，服务器不认识。常用于 `登录`。

基于`Cookie` 和 `Session` 的登录系统，如果浏览器禁止使用`Cookie`，整个系统如何正常运转？

第一种方案：在url中拼接；
第二种方案：使用Token 实现登录。

---


#### HTTP各种请求头

主要分为通用头部、请求头部、响应头部和实体头部

通用头部

|      协议头       |                                     说明                                     |                      举例                      |
| :---------------: | :--------------------------------------------------------------------------: | :--------------------------------------------: |
|   Cache-Control   |                     用来指定当前请求/回复使用的缓存机制                      |            Cache-Control: no-store             |
|    Connection     |                             请求使用哪种连接类型                             |             Connection: keep-alive             |
|       Date        |                                报文创建的时间                                |        Dec, 26 Dec 2015 17: 30: 00 GMT         |
|      Trailer      | 会实现说明报文主体记录哪些首部字段，改首部字段可以使用在HTTP/1.1分快传输编码 |                  Trailer: MD5                  |
| Transfer-Encoding |                               用来改变报文格式                               |           Transfer-Encoding:chunked            |
|      Upgrade      |                        要求服务器升级到一个高版本协议                        | Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11 |
|        Via        |                                 记录一下代理                                 | Via:1.0 fred, 1.1 itbilu.com.com (Apache/1.1)  |
|      Warning      |                    一个一般性的警告，表示实体可能存在错误                    |       Warning: 199 Miscellaneous warning       |

请求头部

|     协议头      |                                       说明                                       |                          举例                          |
| :-------------: | :------------------------------------------------------------------------------: | :----------------------------------------------------: |
|     Accept      |                          告诉服务器自己允许哪些媒体类型                          |                   Accept: text/plain                   |
| Accept-Charset  |                                  可接受的字符集                                  |                 Accept-Charset: utf-8                  |
| Accept-Encoding |                                 可接受的编码方法                                 |              Accept-Encoding:gzip,deflate              |
| Accept-Language |                               可接受的响应语言列表                               |                 Accept-Language: en-US                 |
|  Authorization  |                     用于表示HTTP协议中需要认证资源的认证信息                     | Authorization:      Basic OSdjJGRpdjpvcGVulAnLc2SdDE== |
|      From       |                             发送此请求用户的邮件地址                             |                   From:user@163.com                    |
|      Host       |                     表示服务器的域名以及服务器所监听的端口号                     |                 Host:www:baidu.com:80                  |
|     If-XXX      |                                     条件请求                                     |    If-Modified-Since: Dec, 26 Dec 2015 17:30:00 GMT    |
|  Max-Forwards   |                               限制该消息网关转发数                               |                    Max-Forwards: 10                    |
|      Range      |                    表示请求某个实体的一部分，字节偏移以0开始                     |                  Range: bytes=500-999                  |
|     Referer     | 表示浏览器所访问的前一个页面，可以认为是之前访问页面的链接将浏览器带到了当前页面 |                 Referer: www.baidu.com                 |
|   User-Agent    |                                 浏览器身份标识串                                 |                User-Agent: Mozilla/...                 |






#### HTTP请求常见的面试题。

[【1-20】答案](https://leetcode-cn.com/circle/discuss/XXGdoF/)
1. 为什么网络要分层。

- 每一层独立于其他层，不需要相互依赖；
- 上下层通过标准结构来相互通信，简单易用又有扩展性；
- 复杂的系统需要分层，因为每一层都关注自己的事情。

为什么计算机网络要分层呢？ ,我们再来较为系统的说一说：
1） 各层之间相互独立：各层之间相互独立，只需要了解自己如何调用号下层功能就可以了（类似于接口调用）。**这个和我们开发也是一个道理**
2）提高了整体的灵活性：每一层可以使用最适合的技术来实现，你只需要提供功能以及暴露接口就可以了。**这个和我们平时开发时候要求的高内聚、低耦合的原则一致**
3） 大问题化小：分层可以将复杂的网络问题分解为许多比较小的、界线比较清晰的小问题来解决。这样使得复杂的计算机网络系统变得易于设计，实现和标准化。**这个和我们平时开发的时候，一般会将系统功能分解，然后将复杂的问题分解为容易理解的更小的问题；这些较少的问题具有更明确的边界（接口），同时也方便团队合作。**

2. TCP/IP 4层模型

网络模型有：OSI七层模型、TCP/IP 五层模型、TCP/IP 四层模型

OSI 七层模型
应用层：通过应用之间的交互来完成特定的网络应用（HTTP、DNS、SMTP等）

表示层：是使通信的应该程序能够**解释**交换数据的含义，数据压缩、数据加密和数据描述

会话层：负责建立、管理和终止表示层实体之间的通信会话。提供数据交换的定界和同步功能，包括了建立检查点和恢复方案的方法

传输层：主要为2台主机进程之间提供通信服务

网络层：就是把传输层产生的报文或用户数据封装成分组和包向下传输到数据链路层

数据链路层：将网络层交下来的IP数据包组装成帧，在2个相邻的节点的链路上传送帧

物理层：实现计算机节点之间比特流的透明传送，尽可能屏蔽掉具体传输介和物理设备的差异。


TCP/IP 五层协议（参考协议）
应用层
传输层
网络层
数据链路层
物理层

TCP/IP 四层模型
应用层：FTP、Telnet、DNS、SMTP
传输层：TCP/UDP
网络互联层：网络层
网络接入层: 物理层和数据链路层


3. HTTP 是哪一层的协议？http常见的状态码？

应用层。

|         code         |                                                                                            描述                                                                                             |
| :------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|         200          |                                                                                          请求成功                                                                                           |
| 301（永久性重定向）  | 比如建设一个网站后，将网站的url变换了，重新申请一个域名，但是希望之前的用户访问之前url仍然可以访问到，就可以做一个重定向新的url下面。比如京东最早域名www.360buy.com名重定向到现在www.jd.com |
| 302（临时性重定向）  |                                                                              比如用户未登录，重定向到登录页面                                                                               |
| 304 （Not Modified） |                                                  客户端访问服务器（通过ETag lastModified），服务器判断缓存没有过期，客户端收到，使用缓存。                                                  |
|     400 请求出错     |                                                                               客户端发送的语法，服务器不认识                                                                                |
|      401 未授权      |                                                              请求要求身份证。对于需要登录的页面，服务器禁止访问可能返回此响应                                                               |
|   403 没有访问权限   |                                                      系统中的某些页面只有在某些权限下才能访问；当用户访问的页面没有权限时，返回此响应                                                       |
|    404 not Found     |                                                                                     服务器没有这个资源                                                                                      |
|   405 不允许此方法   |                               对于请求所标识的资源，不允许使用请求行中所指定的方法（GET/POST/PUT/DETELE请求混用了。）请确保为所请求的资源设置了正确的MIME类型                               |
|    500 服务器错误    |                                                                                    服务器函数代码出错了                                                                                     |
|      501 未实现      |                                                                            web服务器不支持实现此请求所需的功能。                                                                            |
|     502 网关错误     |                                        Bad Gateway，网关出错，当用作网关或代理时，服务器将从试图实现此请求时所访问的upstream 服务器中接收无效的响应                                         |
|    503 服务器停机    |                                                                                服务器正在维护或者暂定的时候                                                                                 |
| 504 GateWay Timeout  |                                                                          代理服务器无法及时的从上游服务器获得响应                                                                           |


4. HTTP和HTTPS有什么区别？

- HTTP 协议以明文方式发送内容，数据都是未加密的，安全性较差。HTTPS 数据传输过程是加密的，安全性较好。
- HTTP 和 HTTPS 使用的是完全不同的连接方式，用的端口也不一样，前者是 80 端口，后者是 443 端口。
- HTTPS 协议需要到数字认证机构（Certificate Authority, CA）申请证书，一般需要一定的费用。
- HTTP 页面响应比 HTTPS 快，主要因为 HTTP 使用 3 次握手建立连接，客户端和服务器需要握手 3 次，而 HTTPS 除了 TCP 的 3 次握手，还需要经历一个 SSL 协商过程。


5. 讲一下对称加密算法和非对称加密算法？


6. HTTP/2.0 概述


7. HTTP报文详解？详细说一下请求报文，以及HTTP和TCP的区别。


8. TCP三次握手的过程，以及三次握手的原因？


9. TCP四次挥手的过程，以及四次挥手的原因？



10. TCP滑动窗口时干什么的？TCP的可靠性体现在哪里？拥塞控制如何实现？



11. TCP和UDP有什么区别？以及适用的场景。


12. Mac 地址和 ip 地址的区别？既然有了 Mac 地址，为什么还要 ip 地址呢？


13. 当你打开一个电商网站，都需要经历哪些过程？分别用到了什么协议。



14. 电子邮件的发送过程?



15. DNS解析过程，DNS劫持了解吗？



16. GET和POST有什么不一样？



17. session和cookie的问题？



18. HTTP是不保存状态的协议,如何保存用户状态?


19. Arp协议？


20. DDos攻击了解吗？

分布式拒绝服务，一般来说是指攻击者利用一些被控制的设备对目标网站在较短的时间内发起大量请求，大规模消耗目标网站的主机资源，让它无法正常服务。


[【21】答案](https://muyiy.cn/question/network/15.html)
21. 简单讲解一下http2的多路复用


22. A、B 机器正常连接后，B 机器突然重启，问 A 此时处于 TCP 什么状态?


23. HTTPS 握手过程中，客户端如何验证证书的合法性


24. 介绍下 HTTPS 中间人攻击


25. 介绍下 http1.0、1.1、2.0 协议的区别？


26. 永久性重定向（301）和临时性重定向（302）对 SEO 有什么影响?


27. Http 状态码 301 和 302 的应用场景分别是什么?


28. 接口如何防刷


29. 为什么 HTTP1.1 不能实现多路复用（腾讯）？


30. Websocket？
31. 跨域的方法
32. XSS
33. CSRF
34. [【设计一个无懈可击的浏览器缓存方案：关于思路，细节，ServiceWorker，以及HTTP/2】](https://zhuanlan.zhihu.com/p/28113197)
35. [【你应该知道的前端——缓存】](https://juejin.cn/post/6844903598556446733)
36. [HTTP 缓存机制一二三](https://zhuanlan.zhihu.com/p/29750583)
37. [通过HTTP的HEADER完成各种骚操作](https://juejin.cn/post/6844903661596835854)
38. [九个问题从入门到熟悉HTTPS](https://juejin.cn/post/6844903521272201223)
39. [谈谈 HTTPS](https://juejin.cn/post/6844903504046211079)