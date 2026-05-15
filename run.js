const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const port = process.env.PORT||3000

app.use(express.json())
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

//保存通讯录
app.post('/api/saveContact',(req,res)=>{
    let data = req.body
    fs.writeFileSync('contactData.json',JSON.stringify(data,null,2))
    res.json({code:200,msg:"通讯录已自动上传保存完成"})
})

//后台查看数据
app.get('/api/admin',(req,res)=>{
    if(!fs.existsSync('contactData.json')) return res.send("暂无通讯录数据")
    let txt = fs.readFileSync('contactData.json','utf8')
    res.setHeader("Content-Type","application/json")
    res.send(txt)
})

app.listen(port,()=>{
    console.log("服务启动成功")
})