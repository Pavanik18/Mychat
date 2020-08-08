const express = require("express");
const app = express();
const port= 8000;
const usermodel = require('./models/users');
const connection = require('./config');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/loginuser", (req,res) => {
	usermodel.loginUser(req.body).then(item => {
		if(item && item.length>0){
		res.status(200).send(item[0]);
	} else {
		res.status(201).send({message: "Invalid email address or password"});
	}
	})
	.catch(err => {
		res.status(400).send("Unable to find user");
	});
});
app.get("/userlist", (req,res) => {
	usermodel.userList().then(item => {
		if(item && item.length>0){
		res.status(200).send(item);
	} else {
		res.status(201).send({message: "No records found"});
	}
	})
	.catch(err => {
		res.status(400).send(err);
	});
});
app.listen(port, () => {
	console.log("Server listening on port: "+ port);
})