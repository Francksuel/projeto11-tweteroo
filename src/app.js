import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const tweets = [];
const users = [];
app.post("/sign-up", (req, res) => {
	const { username, avatar } = req.body;
	if (!username || !avatar) {
		res.status(400).send("Todos os campos são obrigatórios!");
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
	tweets.push({ tweet, username, avatar: user.avatar });
	res.status(201).send({ username, avatar: user.avatar, tweet });
});

app.get("/tweets", (req, res) => {
	const recentTweets = tweets.slice(-10);
	res.send(recentTweets);
});

app.listen(5000, () => console.log("Listining on port 5000"));
