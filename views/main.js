const html = require('choo/html')
const renderFeed = require('../com/feed')
const renderNavbar = require('../com/navbar')
const renderProfile = require('../com/profile')
const renderTweetbar = require('../com/tweetbar')


const TITLE = 'test - main'

module.exports = function main (state, emit) {
  const mainUser = localStorage.getItem('mainUser')
  const token = localStorage.getItem('token')
  if (token && mainUser) {
    state.mainUser = JSON.parse(mainUser)
    state.token = JSON.parse(token)
    state.appLoaded = true
    state.loggedIn = true
  }
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  if (!state.currUser) state.loadUser()
  if (state.userLoaded && !state.tweets) {
    if (!state.loggedIn || state.href.indexOf('alltweets') !== -1) {
      state.loadAllTweets()
    } else {
      state.loadTweets()
    }
  }
 
  return html`
    <body>
      <div class="main-container">
          ${renderNavbar(state, emit)}
        <div class="main-content feed-container">
          ${flashDBError()}
          ${renderFeed(state, emit)}
        </div>
      </div>
    </body>
  `

  function flashDBError() {
    if (state.databaseError) {
      return html`
        <div class="alert alert-danger">
          <strong>Database Error!</strong> Something went wrong on our end. :(
        </div>
      `
    }
    return ''
  }
}
