# mock-sever

> express + mockjs server

## Build Setup

``` bash
# 安装
npm install

# 看效果+启服务
npm run mock-dev

# 只启服务
npm run mock

```
由于每个项目携带的请求头不同 响应头也要进行相应配置 否则会出现如下关于跨域的报错
`Request header field xxx is not allowed by Access-Control-Allow-Headers in preflight response`

在mock文件夹下的index.js中进行修改

```javascript
// 允许跨域
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  // 此处根据前端请求携带的请求头进行配置 
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  // 例如： 我们公司的请求头需要携带Authorization和Client-Type，此处就应该按照以下进行配置
  // res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, Client-Type");
  next();
})
```

关于接口可以根据业务场景不同，修改字段或增加新接口~