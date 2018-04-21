
var app = require('./app'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var server = app.listen(port, function () {
    console.log("Server running at http://localhost:" + port);
})

exports.server = server