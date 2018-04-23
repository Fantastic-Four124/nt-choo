const html = require('choo/html')
const {getViewUserURL, niceDate, pluralize} = require('../util')

module.exports = function renderTweet (state, emit, tweet) {
  console.log('tweet', tweet)
  return html`
    <div class="tweet">
      <div class="tweet-content">
        <div class="post-container">
          <div class="metadata">
            <a href=${getViewUserURL(tweet.user)} class="name"><span>@${tweet.user.username}</span></a>
            <span class="date"> - ${niceDate(tweet.date_posted)}</span>
          </div>
          <p class="content">${linkify(tweet.contents)}</p>
        </div>
      </div>
    </div>
  `


  // <!-- <p class="content">${linkify(tweet.contents)}</p> -->
  function linkify(str){
    let isHashtag = false
    let isMention = false

    //    str = str.replace(/#/gi. '*#')
    //    str = str.replace(/@/gi. '*@')
    let arr = str.split(" ").map(w => {
      if (w.match(/#([a-zA-Z]+)/)) {
        isHashtag = true
        const link = w.substring(1)
        return html`
          <a href="/hashtag/${link}">${w + ' '}</a>
        `
      }
      if (w.match(/@([a-zA-Z]+)/)) {
        isMention = true
        const link = w.substring(1)
        return html`
          <a href="/mentions/${link}">${w + ' '}</a>
        `
      }
      return w + " "
    })

    if (isHashtag) {
    console.log('arr', arr)

    }
    return arr
  }
}
