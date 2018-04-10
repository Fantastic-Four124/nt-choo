const html = require('choo/html')
const renderTweet = require('./tweet')
const renderTweetbar = require('./tweetbar')
const renderProfile = require('./profile')

module.exports = function renderFeed (state, emit) {
  if (!state.tweets) {
    return ''
  }

  let tweets = state.tweets

  return html`
    <div class="tweets-wrapper">
      <div class="container">
        <div class="row">
          <div class="col-lg-9">
            ${state.loggedIn ? renderTweetbar(state, emit) : ''}
            <ul class="feed">${tweets.map(t => renderTweet(state, emit, t))}</ul>
          </div>
          <div class="col-lg-3">
            ${renderProfile(state, emit)}
          </div>
        </div>
      </div>
    </div>
  `
}
