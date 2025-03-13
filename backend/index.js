import express from 'express';
const app=express();
import airouter from './Routes/ai.routes.js';
 
import cors from 'cors';
import AuthRouter from './Routes/AuthRouter.js';
import doctorRoutes from "../backend/routes/mainRoutes.js";
 
import './Models/db.js';

const PORT = process.env.PORT || 8080;

app.get('/ping',(req,res)=>{
    res.send('Pong');
})

 
app.use(cors());
app.use(express.json());
app.use("/api", doctorRoutes);
app.use('/ai',airouter)
app.use('/auth',AuthRouter)
app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
})
 