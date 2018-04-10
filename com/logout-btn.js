const html = require('choo/html')

module.exports = function renderLogoutButton (state, emit, tweet) {
  return html`
    <p class="btn btn-primary logout" onclick=${logout} role="button">Log Out</p>
  `

  function logout () {
    state.logout()
  }
}
