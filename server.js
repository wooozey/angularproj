const express = require('express');
const PORT = process.env.PORT || 4200;
const app = express(),
      bodyParser = require("body-parser");
      port = PORT;

app.use(bodyParser.json());
app.use(express.static(process.cwd()+"/dist/angularproj/"));


app.get('**', (req,res) => {
  res.sendFile(process.cwd()+"/dist/angularproj/index.html")
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});