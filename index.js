const express = require('express')
const app = express()
const path = require('path')
var MongoClient = require('mongodb').MongoClient

const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})


app.get('/users', (req, res) => {

  var response = res;

  MongoClient.connect('mongodb://admin:password@localhost:27017', function (err, client) {
    if (err) throw err

    var db = client.db('user-app')

    db.collection('users').find().toArray(function (err, result) {
      if (err) throw err

      console.log(result)
      client.close()
      response.send(result);
    })
  })

});


app.get('/add', (req, res) => {

  var response = res;

  MongoClient.connect('mongodb://admin:password@localhost:27017', function (err, client) {
    if (err) throw err

    var db = client.db('user-app')

    const user = {
      "firstName": "Hank",
      "lastName": "Monero",
      "email": "hand@fork.com"
    }

    db.collection('users').insertOne(user).then(resutl => {
      console.log(resutl)
      client.close()
      response.send("Done")
    })
  });

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})