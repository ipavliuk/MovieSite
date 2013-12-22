var express = require('express'),
    path = require('path'),
    http = require('http'),
    movie = require('./routes/movies');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/movies', movie.findAll);
app.get('/movies/:id', movie.findById);
app.post('/movies', movie.addMovie);
app.put('/movies/:id', movie.updateMovie);
app.delete('/movies/:id', movie.deleteMovie);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
