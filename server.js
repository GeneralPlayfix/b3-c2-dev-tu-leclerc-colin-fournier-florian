const express = require('express');
const evaluate = require('./eval');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/calculate', function (req, res) {

    res.send({"result":12});
})
app.listen(3000, () => {
  console.log('listening on port 3000');
});