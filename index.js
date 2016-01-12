//app entry point

//express
var express = require('express'),
    app = express();

//set view engine
app.set('view engine', 'ejs');

//set directories
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

//serve index ejs
app.get('/', function(request, response){
  response.render('pages/index');
});

//port and listen
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
