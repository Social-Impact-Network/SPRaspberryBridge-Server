const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Frank:<password>@spcluster.e3gqe.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Good sign');
});

app.listen(3000, () => {
	console.log("Listening on 3000")
});

app.get('/api/users', (req, res) => {
	client.connect(err => {
		const collection = client.db("test").collection("users");
		collection.find().toArray((error, documents) => {
			if(error){
				throw error;
			}
			res.send(documents);
		});
		// perform actions on the collection object
		client.close();
	});
});

app.post('/api/users', (req, res) => {
	client.connect(err => {
		const collection = client.db("test").collection("users");
		collection.insertOne(req.body, (error, result) => {
			if(error){
				throw error;
			}
			res.send(result.InsertedId)
		});
		client.close();
	});
});