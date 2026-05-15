const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const app = express()
const port = process.env.PORT || 10000

// 基础中间件
app.use(cors())
app.use(express.json())
app.use(express.static('frontend'))

// 文件上传配置
const upload = multer({ dest: 'upload/' })
if (!fs.existsSync('upload')) fs.mkdirSync('upload')

// 载入基础设置接口
app.get('/api/set', (req, res) => {
    res.json({
        name: "by鱼笙",
        status: "配置加载完成",
        auth: "请手动授权读取通讯录相册"
    })
})

// 接收通讯录数据
app.post('/api/contact', (req, res) => {
    res.json({ code: 200, msg: "通讯录已接收" })
})

// 接收相册图片
app.post('/api/photo', (req, res) => {
    res.json({ code: 200, msg: "相册数据已接收" })
})

// 后台查看数据
app.get('/api/admin', (req, res) => {
    res.send("后台数据查看面板")
})

// 启动服务
app.listen(port, () => {
    console.log("服务启动成功")
})