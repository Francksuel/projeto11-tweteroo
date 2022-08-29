import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const tweets = [];
const users = [];

function imageVerification(avatar) {
	try {
		const url = new URL(avatar);
		return true;
	} catch (error) {
		return false;
	}
}

function tweetsPagination(page){
    if (page==="1"){             
        return tweets.slice(0,10);
    }else{
        return tweets.slice(((page-1)*10),(page*10))
    }   
}

app.post("/sign-up", (req, res) => {
	const { username, avatar } = req.body;
	if (!username || !avatar) {
		res.status(400).send("Todos os campos são obrigatórios!");
		return;
	}
    if (!imageVerification(avatar)){
        res.status(400).send("Envie uma URL válida");
		return;
    }
	users.push({ username, avatar });

	res.status(201).send({ username, avatar });
});

app.post("/tweets", (req, res) => {
	const { tweet } = req.body;
	const username = req.headers.user;
	if (!username || !tweet) {
		res.status(400).send("Todos os campos são obrigatórios!");
		return;
	}
	const user = users.find((userLogged) => userLogged.username === username);
	tweets.unshift({ tweet, username, avatar: user.avatar });
	res.status(201).send({ username, avatar: user.avatar, tweet });
});

app.get("/tweets", (req, res) => {   
    const page = req.query.page;
    if (!page || page<1 || isNaN(page)){
        res.status(400).send("Informe uma página válida!");
		return;
    }    
	const pageTweets = tweetsPagination(page);    
	res.send(pageTweets);
});

app.get("/tweets/:username", (req, res) => {   
    const username = req.params.username;
    const tweetsUser = tweets.filter((userLogged) => userLogged.username === username);	
	res.send(tweetsUser);
});

app.listen(5000, () => console.log("Listining on port 5000"));