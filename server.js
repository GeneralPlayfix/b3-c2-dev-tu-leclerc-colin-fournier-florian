const express = require("express");
const app = express();
const evaluate = require("./utils");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/calculate", function (req, res) {
  if (req.query.calcul === undefined && req.query.calcul === "")
    return res.send({ result: "error" });
  const result = evaluate.customEval(req.query.calcul);
  res.send({ result: result });
});
app.listen(3000, () => {
  console.log("listening on port 3000");
});
