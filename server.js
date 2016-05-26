var http = require('http')
var ecstatic = require('ecstatic')
var st = ecstatic('public')

var server = http.createServer(function (req, res) {
  st(req, res)
})
server.listen(5000)
