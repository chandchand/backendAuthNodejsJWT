const express = require('express')
const cors = require('cors')
const dbConfig = require('./config/db.config')
const Role = require('./model/roleModel')
const mongoose = require('mongoose')

const app = express()
// db.mongoose
//   .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Successfully connect to MongoDB.");
//     initial();
//   })
//   .catch(err => {
//     console.error("Connection error", err);
//     process.exit();
//   });

mongoose.connect('mongodb://127.0.0.1:27017/testnodejwt?directConnection=true').then(()=> {
    console.log('Mongodb is connected')
})

var corsOption = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOption))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.json({message: "Hello World!"})
})

//routes
require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

    function initial() {
        Role.estimatedDocumentCount((err, count) => {
            if (!err && count === 0) {
                new Role({
                    name: 'user'
                }).save(err => {
                    if (err) {
                        console.error(err)
                    }
                    console.log("added user to role collection");
                })
                new Role({
                    name: 'admin'
                }).save(err => {
                    if (err) {
                        console.error(err)
                    }
                    console.log("added admin to role collection");
                })
            }
        })
    }
