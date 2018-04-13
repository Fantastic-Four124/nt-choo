var css = require('sheetify')
var choo = require('choo')
var html = require('choo/html')

css('tachyons')
css('./public/styles.css')
css('bootstrap')
//css('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.use(require('./stores/tweets'))
app.use(require('./stores/users'))
app.use(require('./stores/auth'))

app.route('/', require('./views/main'))
app.route('/alltweets', require('./views/main'))
app.route('/users/:id', require('./views/main'))
app.route('/users/:id/timeline', require('./views/main'))
app.route('/users/:id/leaders', require('./views/users'))
app.route('/users/:id/followers', require('./views/users'))
app.route('/login', require('./views/login'))
app.route('/users/register', require('./views/register'))
app.route('/*', require('./views/main'))

app.mount('body')
