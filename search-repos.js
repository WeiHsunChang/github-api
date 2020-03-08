const fetch = require('node-fetch')
const express = require('express');
const search_url = require('./url')
const app = express();

let resData = {}

function checkStatus(res) {
  if (res.ok) {
    return res.json()
  } else {
    throw {
      error: res.statusText,
      errorCode: res.status
    }
  }
}

function normalize(obj){
  const data = obj.data || {}
  const error = obj.error || 'non-error'
  const errorCode = obj.errorCode || 200
  return {
    data : data,
    error : error,
    errorCode : errorCode
  }
}

app.get('/search/:keyword', async (req, res) => {
  const keyword = req.params.keyword
  try{
    const data = await fetch( search_url + keyword)
    const json = await checkStatus(data)
    resData.data = json
  }
  catch(err){
      resData.error = err.error
      resData.errorCode = err.errorCode
  }
  res.send(normalize(resData))
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening')
});