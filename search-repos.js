const { Octokit } = require("@octokit/rest");
const octokit = new Octokit();

const express = require('express');
const app = express();
app.get('/search/:keyword', (req, res) => {
  let keyword = req.params.keyword;
  octokit.search.repos({
    q: keyword
  })
    .then(result => {
      res.send(result.data)
    })
    .catch(res.send)

});

app.listen(3000, () => {
  console.log('Listening');
});