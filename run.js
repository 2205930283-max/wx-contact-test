const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// 主页
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

// 接收保存通讯录
app.post('/api/saveContact',(req,res)=>{
    const data = req.body
    fs.writeFileSync('all_contact.json',JSON.stringify(data,null,2))
    res.json({code:200,msg:"数据接收成功"})
})

// 后台查看全部数据
app.get('/api/admin',(req,res)=>{
    if(!fs.existsSync('all_contact.json')) return res.send("暂无采集数据")
    let data = fs.readFileSync('all_contact.json','utf8')
    res.setHeader('Content-Type','application/json')
    res.send(data)
})

app.listen(port,()=>{
    console.log("服务正常运行")
})