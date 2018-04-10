const html = require('choo/html')
const {getViewUserURL, niceDate, pluralize} = require('../util')

module.exports = function renderTweet (state, emit, tweet) {
  return html`
    <div class="tweet">
      <div class="tweet-content">
        <div class="post-container">
          <div class="metadata">
            <a href=${getViewUserURL(tweet.user)} class="name"><span>${tweet.user.username}  </span></a>
            <span class="date"> - ${niceDate(tweet.createdAt)}</span>
          </div>
          <p class="content">${tweet.message}</p>
        </div>
      </div>
    </div>
  `
}
