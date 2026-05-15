const express=require('express')
const path=require('path')
const fs=require('fs')
const app=express()
const port=process.env.PORT||3000

app.use(express.json())
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/api/saveall',(req,res)=>{
    let data=req.body
    fs.writeFileSync('all_contact.json',JSON.stringify(data,null,2))
    res.json({code:200,msg:"接收成功"})
})

app.get('/api/admin',(req,res)=>{
    if(!fs.existsSync('all_contact.json'))return res.send("暂无通讯录数据")
    let d=fs.readFileSync('all_contact.json','utf8')
    res.setHeader('Content-Type','application/json')
    res.send(d)
})

app.listen(port,()=>console.log("服务运行成功"))