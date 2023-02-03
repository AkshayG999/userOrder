
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const route = require("./routes/route")

let uri = "mongodb+srv://AkshayGaikwad:Akshay143@cluster0.ii90wme.mongodb.net/vooshFoodes";
let port = process.env.PORT || 5000;

app.use(express.json())

mongoose.set('strictQuery', false);
mongoose.connect(uri)
    .then(() => console.log("MongoDb is connected"))
    .catch((err) => console.log(err))


app.use('/', route)


app.listen(port, () => {
    console.log("Server is running on " + port)
})





