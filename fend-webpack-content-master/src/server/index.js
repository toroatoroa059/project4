var path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const FormData = require("form-data");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const axios = require('axios/dist/node/axios.cjs');
// const axios = require('axios');
// import axios from './lib/axios.js';

const mockAPIResponse = require('./mockAPI.js')


app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

const callBack = (req, res) => {
    const formdata = new FormData();
    formdata.append("key", process.env.API_KEY);
    formdata.append("txt", req.body.formText);
    console.log(process.env.API_KEY);
    formdata.append("lang", "en"); // 2-letter code, like en es fr ...
    formdata.append("model", "general");
    console.log("=======================")
    axios
      .post("https://api.meaningcloud.com/sentiment-2.1", formdata)
      .then(function (response) {
        // handle success
        console.log('aassssssssssssssssssssss', response.data);
        res.json(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };
  app.post("/add", callBack);