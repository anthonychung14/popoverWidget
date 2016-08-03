var express = require('express');
var compress = require('compress');
var app = express();

app.use(express.static(__dirname + '/'));

app.listen(process.env.PORT || 3000);