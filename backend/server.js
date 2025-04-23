import express from 'express'

const port = 5000;
const app = express()

app.get('/', (req, res)=>{
    console.log("backend working")
    res.send("hello world")
})

app.listen(port, ()=>{
    console.log(`Server running at https://localhost:${port}`)
})