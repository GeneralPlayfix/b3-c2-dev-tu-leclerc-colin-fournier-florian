const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/calculate', function (req, res) {

    res.send({"result":12});
})
app.listen(3000, () => {
  console.log('listening on port 3000');
});