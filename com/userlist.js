const html = require('choo/html')
const renderUserItem = require('./user-item')
const renderTweetbar = require('./tweetbar')
const renderProfile = require('./profile')

module.exports = function renderUserList (state, emit) {
  if (!state.userList || !state.currUser) {
    return html`
      <p class="card">
        <i class="fa fa-spinner"></i> Loading users...
      </p>
    `
  }

  let userList = state.userList

  let title = ''
  if (state.href.indexOf('leaders') !== -1) {
    title = 'Leaders'
  } else {
    title = 'Followers'
  }

  return html`
    <div class="user-list-wrapper">
      <div class="container">
        <div class="row">
          <div class="col-lg-9">
            <h1>${title}</h1>
            <ul class="feed">${userList.map(u => renderUserItem(state, emit, u))}</ul>
          </div>
          <div class="col-lg-3">
            ${renderProfile(state, emit)}
          </div>
        </div>
      </div>
    </div>
  `
}

