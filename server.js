const express = require('express');
const app = express();
const evaluate = require('./utils');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
console.log(evaluate.customEval("2+2"));
app.get('/calculate', function (req, res) {

    res.send({"result":12});
})
app.listen(3000, () => {
  console.log('listening on port 3000');
});