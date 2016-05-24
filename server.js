var split = require('split2')
var through = require('through2')
var wsock = require('websocket-stream')
var onend = require('end-of-stream')
var http = require('http')
var ecstatic = require('ecstatic')
var st = ecstatic('public')

var server = http.createServer(function (req, res) {
  st(req, res)
})
server.listen(5000)

var streams = []
wsock.createServer({ server: server }, function (stream) {
  streams.push(stream)
  onend(stream, function () {
    var ix = streams.indexOf(stream)
    streams.splice(ix, 1)
  })
  stream.pipe(split()).pipe(through(write))
  function write (buf, enc, next) {
    streams.forEach(function (stream) {
      stream.write(buf + '\n')
    })
    next()
  }
})
