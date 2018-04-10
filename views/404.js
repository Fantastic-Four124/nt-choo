var html = require('choo/html')

var TITLE = 'test - route not found'

module.exports = view

function view (state, emit) {
  emit('pushState', '/')
  return html`
  <body>
    <p class="card">
      <i class="fa fa-spinner"></i> Loading...
    </p>
  </body>
  `
}
