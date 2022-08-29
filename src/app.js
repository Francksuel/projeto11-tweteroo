import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const tweets=[];
const users=[];
app.post('/sign-up',(req,res)=>{
    const {username, avatar} = req.body;   
    if (!username || !avatar){
        res.status(400).send("Todos os campos são obrigatórios!");
        return
    }
    users.push({username,avatar});

    res.send("OK");
});
app.post('/tweets',(req,res)=>{
    const newTweet = req.body;
    const user = users.find(user => user.username === req.body.username)    
    tweets.push({...newTweet, 
        avatar:user.avatar});
    res.send("OK");
});

app.get('/tweets',(req,res)=>{
    const recentTweets = tweets.slice(-10);
    res.send(recentTweets);
});

app.listen(5000,()=>console.log('Listining on port 5000'));