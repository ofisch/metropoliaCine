"use strict";

const express = require("express");
const app = express();
const http = require("http").createServer(app);

app.use(express.static(__dirname));

http.listen(3000, () => {
  console.log("listening on port 3000");
});
