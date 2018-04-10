const html = require('choo/html')
const renderNavbar = require('../com/navbar')

const TITLE = 'Register'

module.exports = function register (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body>
      <div class="main-container">
        ${renderNavbar(state, emit)}
        <h2>Register for nanoTwitter</h2>
        <form id="register" onsubmit=${onsubmit}>
          <label for="username">
            Username
          </label>
          <input id="username" name="username"
            type="text"
            required
            pattern=".{1,36}"
            title="Username must be between 1 and 36 characters long."
          >
          <label for="password">
            Password
          </label>
          <input id="password" name="password"
            type="password"
            required
            pattern=".{1,}"
            title="Password must be at least 5 characters long"
          >
          <label for="email">
            Email
          </label>
          <input id="email" name="email"
            type="text"
            required
            pattern=".{1,}"
            title="Email must be valid"
          >
          <input type="submit" value="Register">
        </form>
      </div>
    </body>
  `

  function onsubmit (e) {                                              // 2.
    e.preventDefault()                                                 // 3.
    var form = e.currentTarget                                         // 4.
    var body = new FormData(form)                                      // 5.
    state.register(body)
  }
}
