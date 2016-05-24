var wsock = require('websocket-stream')
var split = require('split2')
var through = require('through2')
var html = require('yo-yo')
var root = document.querySelector('#content')

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
    stream.write(this.elements.msg.value + '\n')
    this.reset()
  }
}

var stream = wsock('ws://' + location.host)
stream.pipe(split()).pipe(through(write))

function write (buf, enc, next) {
  state.lines.push(buf.toString())
  update()
  next()
}
