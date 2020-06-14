
var express = require('express');
var bodyParser = require('body-parser');
var Pusher = require('pusher');

var cors = require('cors')

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// to serve our JavaScript, CSS and index.html
app.use(express.static('./'));

var pusher = new Pusher({
  appId: '992529',
  key: 'f502e1cc8bb7e62a0d77',
  secret: '0ea23cae89672a219aae',
  cluster: 'mt1',
  encrypted: true
});

app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});





var port = process.env.PORT || 5000;
app.listen(port, () => console.log('Listening at port 5000'));