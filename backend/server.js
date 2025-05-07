import express from 'express'
import cors from 'cors';
const port = 5000;
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', // only allow React dev server
    credentials: true // if using cookies
}));

app.get('/backend/server', (req, res)=>{
    console.log("Backend Started")
    res.json({
        user: "https://i.pinimg.com/736x/db/4c/3b/db4c3bb595c2220012b8b10f654eed6d.jpg",
        msg: "Hello world"
    })
})

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})