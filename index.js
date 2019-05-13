const express = require("express");
const app = express();
const port = 4000;
const monk = require("monk");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());
// Connection URL
//below this line is the url i got from my mongo atlas database
const url =
  "mongodb://brycemay:2012F250psd!@cluster0-shard-00-00-8nfsq.mongodb.net:27017,cluster0-shard-00-01-8nfsq.mongodb.net:27017,cluster0-shard-00-02-8nfsq.mongodb.net:27017/db1?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
//enter my password 2012F250psd! -> then over where it says test, enter my database name which is "db1" -----------------------------------------------------------------^ right here
const db = monk(url);

db.then(() => {
  console.log("Connected correctly to server");
});

//the collection name thats under the db name needs to get entered..
const people = db.get("collection1"); //in this case, its 'collection1'
// need to add a get for a single record from my database
app.get("/", async (req, res) => {
  const result = await people.find();
  console.log("got called");
  res.status(200).send(result);
});
app.post("/", async (req, res) => {
  const result = await people.insert(req.body);
  console.log("post called");
  res.status(201).send(result);
});
app.put("/:_id", async (req, res) => {
  const result = await people.findOneAndUpdate( req.params._id, req.body);
  console.log("put called");
  res.status(200).send(result);
});
app.delete("/:_id", async (req, res) => {
  const result = await people.findOneAndDelete(req.params._id);
  console.log("delete called");
  res.status(200).send(result);
});
//
app.get ("/:id", async (req, res) => {
  const result = await people.findOne(req.params._id. req.body);
  console.log("update put called");
  res.status(200).send(result);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
