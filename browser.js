var split = require('split2')
var through = require('through2')
var html = require('yo-yo')
var onend = require('end-of-stream')
var root = document.querySelector('#content')

var wswarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var swarm = wswarm(signalhub('chat-test', [
  'https://signalhub.mafintosh.com'
]))
var peers = {}
swarm.on('peer', function (peer, id) {
  peers[id] = peer
  onend(peer, function () {
    delete peers[id]
  })

  peer.pipe(split()).pipe(through(write))
  function write (buf, enc, next) {
    state.lines.push(buf.toString())
    update()
    next()
  }
})

var state = { lines: [] }
update()

function update () {
  html.update(root, render())
}

function render () {
  return html`<div>
    <form onsubmit=${onsubmit}>
      <input type="text" name="msg">
    </form>
    ${state.lines.map(function (line) {
      return html`<div class="line">${line}</div>`
    })}
  </div>`
  function onsubmit (ev) {
    ev.preventDefault()
    var msg = this.elements.msg.value + '\n'
    Object.keys(peers).forEach(function (id) {
      peers[id].write(msg)
    })
    this.reset()
  }
}

