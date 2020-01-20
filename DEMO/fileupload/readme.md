1. get和post上传文件大小的限制

在http规范里没有表明get和post上传文件大小的限制，真正限制上传文件大小的是浏览器和服务器

例如：在Tomcat中 post上传的大小限制为2m，浏览器允许的url长度的大小为2kb

2. 前端如何上传文件

使用表单，FileData对象，FileReader（只兼容到ie10）

3. post上传文件的报文格式

```
POST /api/feed HTTP/1.1
Accept-Encoding:gzip
Content-Length:225873
Content-Type: mulitipart/form-data; boundary=OCqxMF6-jX....
Host:www.myHost.com
Connection:Keep-alive

--OCqxMF6-jX....
Content-Dispostion:form-data; name='Lng'
Content-Type: text/plain; charset='utf-8'
Content-Transfer-Encoding: 8bit

116.34313
--OCqxMF6-jX....
Content-Dispostion:form-data; name='file'
Content-Type: application/octet-stream
Content-Transfer-Encodeing: binary

--OCqxMF6-jX....
```