var express = require('express');
var axios = require('axios');
var app = express();
var cors = require('cors');
var PORT = 5000;
require('dotenv').config()

app.use(express.json());
app.use(cors());

app.get('/search', function(req, res) {
  axios.get('https://openapi.naver.com/v1/search/news.json', {
    params: {
      query: req.query.query,
      display: 100,
      sort: req.query.sort
    },
    headers: {
      'X-Naver-Client-Id': process.env.CLIENT_ID,
      'X-Naver-Client-Secret': process.env.SECRET_KEY,
    }, 
  })
  .then(function(response) {
    res.json(response.data);
  })
  .catch(function(error) {
    console.error('Error fetching data from Naver API:', error);
    res.status(500).json({ error: 'An error occurred while fetching data from Naver API' });
  });
});

app.listen(PORT, function() {
  console.log('Server is running on port ' + PORT);
});