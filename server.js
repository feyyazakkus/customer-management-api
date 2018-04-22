
var app = require('./app'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000;

// parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// bind routes
var customers = require('./routes/CustomerController');
app.use('/api', customers);

// create server
var server = app.listen(port, function () {
    console.log("Server running at http://localhost:" + port);
})

exports.server = server