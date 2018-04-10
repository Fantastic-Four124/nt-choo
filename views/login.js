const html = require('choo/html')
const renderNavbar = require('../com/navbar')

const TITLE = 'Login'

module.exports = function login (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body>
      <div class="main-container">
        ${renderNavbar(state, emit)}
        <h2>Log in to nanoTwitter</h2>
        <form id="login" onsubmit=${onsubmit}>
          <label for="username">
            username
          </label>
          <input id="username" name="username"
            type="text"
            required
            pattern=".{1,36}"
            title="Username must be between 1 and 36 characters long."
          >
          <label for="password">
            password
          </label>
          <input id="password" name="password"
            type="password"
            required
          >
          <input type="submit" value="Login">
        </form>
        <p>Haven't registered? Click <a href="/users/register">here</a>.</p>
      </div>
    </body>
  `

  function onsubmit (e) {                                              // 2.
    e.preventDefault()                                                 // 3.
    var form = e.currentTarget                                         // 4.
    var body = new FormData(form)                                      // 5.
    state.login(body)
  }
}



