//引入express
let express = require('express')
//引入mock
let Mock = require('mockjs')
//实例化express
let app = express();

// post请求体相关
let bodyParser = require('body-parser')
// mock数据API
let articleAPI = require('./article')
let loginAPI = require('././login')

app.use(bodyParser.json())

// 允许跨域
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

// table列表接口
app.get('/article/list', function (req, res) {
  res.json(Mock.mock(articleAPI.getList(req)))
})

// 登入
app.post('/login/login', function (req, res) {
  res.json(Mock.mock(loginAPI.loginByUsername(req)))
})

// 登出
app.post('/login/logout', function (req, res) {
  res.json(Mock.mock(loginAPI.logout(req)))
})

// 获取用户信息
app.get('/user/info', function (req, res) {
  res.json(Mock.mock(loginAPI.getUserInfo(req)))
})

app.listen('3000', () => {
  console.log('监听端口 3000')
})
