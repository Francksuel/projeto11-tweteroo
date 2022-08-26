import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const tweets=[];
const users=[];
app.post('/sign-up',(req,res)=>{
    const newUser = req.body;
    console.log(req);
    users.push(newUser);
    res.send(users);
});
app.get('/',(req,res)=>{
    res.send('Olá');
});


app.listen(5000,()=>console.log('Listining on port 5000'));