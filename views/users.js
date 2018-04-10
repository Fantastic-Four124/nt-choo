const html = require('choo/html')
const renderUserList = require('../com/userlist')
const renderNavbar = require('../com/navbar')


const TITLE = 'Users'

module.exports = function users (state, emit) {
  if (!state.loggedIn) emit('pushState', '/')
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  if (!state.currUser) state.loadUser()
  if (state.currUser && !state.userList) state.loadUserList()

  return html`
    <body>
      <div class="main-container">
          ${renderNavbar(state, emit)}
        <div class="main-content feed-container">
          ${renderUserList(state, emit)}
        </div>
      </div>
    </body>
  `
}
