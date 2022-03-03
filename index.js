const PORT = 8000
const express = require("express")
const axios = require("axios").default;
const cors = require("cors")
require('dotenv').config() 

const app = express()

app.use(cors())


//random words API
app.get('/word', (req, res) => {
    //run axios code
  const options = {
    method: 'GET',
    url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
    params: {count: '5', wordLength: '5'},
    headers: {
      'x-rapidapi-host': 'random-words5.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_KEY
    }
  };
        
  axios.request(options).then(function (response) {
    console.log(response.data);
    res.json(response.data[0])
  }).catch(function (error) {
    console.error(error);
  });
})

//dictionary API
app.get('/check', (req, res) => {
  const word = req.query.word

  const options = {
    method: 'GET',
    url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/association/',
    params: {entry: 'word'},
    headers: {
      'x-rapidapi-host': 'twinword-word-graph-dictionary.p.rapidapi.com',
      'x-rapidapi-key':  'e4158dcd41msh341b45f20962b54p13bae2jsn330a4d015d03'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    res.json(response.data.result_msg)
  }).catch(function (error) {
    console.error(error);
  });

})




app.listen(PORT, () => console.log('Server running on port ' + PORT))


