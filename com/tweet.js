const html = require('choo/html')
const {getViewUserURL, niceDate, pluralize} = require('../util')
const $ = require('jquery')

module.exports = function renderTweet (state, emit, tweet) {
  return html`
    <div class="tweet">
      <div class="tweet-content">
        <div class="post-container">
          <div class="metadata">
            <a href=${getViewUserURL(tweet.user)} class="name"><span>${tweet.user.username}</span></a>
            <span class="date"> - ${niceDate(tweet.createdAt)}</span>
          </div>
          <p class="content">${tweet.message}</p>
        </div>
      </div>
    </div>
  `

  function linkify(str){
    var re = [
      "\\b((?:https?|ftp)://[^\\s\"'<>]+)\\b",
      "\\b(www\\.[^\\s\"'<>]+)\\b",
      "\\b(\\w[\\w.+-]*@[\\w.-]+\\.[a-z]{2,6})\\b", 
      "#([a-z0-9]+)"];
    re = new RegExp(re.join('|'), "gi");

    const res = str.replace(re, (match, url, www, mail, hashtag) => {
      if(url)
        return "<a href=\"" + url + "\">" + url + "</a>";
      if(www)
        return "<a href=\"http://" + www + "\">" + www + "</a>";
      if(mail)
        return "<a href=\"mailto:" + mail + "\">" + mail + "</a>";
      if(hashtag)
        return "<a href=\"http://" + hashtag + "\">" + hashtag + "</a>";
        //return html`<a href="hashtag/${twitler}">#${twitler}</a>`;
      return match;
    })

    return res

    console.log('1',res)
    const resChoo = html`<div>${res}</div>`

    //    const htmhell = html`<p class="content">${resChoo}</p>`
    console.log('2',resChoo)
    //    return html`
    //      <p class="content">resChoo</p>
    //    `
  }
}


