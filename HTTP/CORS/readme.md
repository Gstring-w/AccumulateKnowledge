### CORS 是w3c的一个标准，全称是“跨域资源共享”（cross-origin resource sharing）

#### 简单请求（simple request）和非简单请求（no-so-simple request）

1. 简单请求满足：
head，get，post请求方法，且头部信息不能超过 accept accept-language content-language last-event-id content-type 只能是application/x-www-form-urlencode, multipart/form-data,text/plain



##### 简单请求
1. Request
简单请求会在头部加一个origin字段
```
GET /cors HTTP/1.1
Origin:http://api.bob.com
Host:api.alice.com
Accept-Language:en-US
User-agent:Mozilla/5.0...
```

2. response
  - 不支持 被XMLHttpRequest的onerror
  - 无法通过状态码来得知，因为也会返回200
```
Access-Control-Allow-Origin:http://api.bob.com
Access-Control-Allow-Credentials:true
Access-Control-Expose-Headers:Foobar
Content-Type:text/html;charset=utf-8
```
```Access-Control-Allow-Origin```:表示可以支持的域，当```Access-Control-Allow-Credentials```为```true```时，改属性的值不可为```*```

```Access-Control-Allow-Credentials```：表示是否发送cookie

```Access-Control-Expose-Headers```：XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值。