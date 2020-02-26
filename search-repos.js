const fetch = require('node-fetch')
const express = require('express');
const app = express();

function checkStatus(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw {
      error: res.statusText,
      errorCode: res.status
    }
  }
}

app.get('/search/:keyword', async (req, res) => {
  let keyword = req.params.keyword;
  let resData = {}

  await fetch('https://api.github.com/search/repositories?q=' + keyword)
    .then(checkStatus)
    .then(json => {
      resData.data = json
    })
    .catch(err => {
      resData.error = err.error
      resData.errorCode = err.errorCode
    })
  res.send(resData)
});

app.listen(3000, () => {
  console.log('Listening');
});