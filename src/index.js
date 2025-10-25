import express from 'express'
import rotas from './routes/routes.js'
import cors from 'cors'

import cookieParser from "cookie-parser";
const app = express()
app.use(cors({
  origin:['http://127.0.0.1:5502', 'http://127.0.0.1:8080','http://127.0.0.1:5500','http://127.0.0.1:5501'],
  credentials: true
}))

app.use(express.json())


app.use(cookieParser())


app.use(rotas)



app.listen(3000,()=>{
    const data = new Date()
    console.log(data)
})