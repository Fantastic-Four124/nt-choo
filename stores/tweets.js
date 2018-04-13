const {getTimelineURL, getFeedURL, getPostTweetURL, getRecentTweetsURL} = require('../util')
const $ = require('jquery')

module.exports = function feedStore (state, emitter) {
  state.tweets = null
  state.appLoaded = false

  emitter.on('pushState', () => {
    state.tweets = null
  })

  emitter.on('popState', () => {
    state.tweets = null
  })

  state.loadAllTweets = () => {
    console.log('state in loadall', state)
    if (!state.appLoaded) {
      emitter.on('DOMContentLoaded', () => {
        state.appLoaded = true
        state.fetchAllTweets()
      })
    } else {
      state.fetchAllTweets()
    }
  }

  state.fetchAllTweets = () => {
    const recentTweetsURL = getRecentTweetsURL()
    fetch(recentTweetsURL, { method: 'GET'})
    .then(res => {
      res.json()
    .then(tweets => {
      state.tweets = tweets
      emitter.emit('render')
      //     state.renderHashtags()
    })}).catch(err => console.log('oh no!'))
  }

  state.renderHashtags = () => {
    $(document).ready(() => {
      $('.content').each(function() {
        const me = $(this)
        console.log('me', me)
        let txt = me.html()
        var re = [
          "\\b((?:https?|ftp)://[^\\s\"'<>]+)\\b",
          "\\b(www\\.[^\\s\"'<>]+)\\b",
          "\\b(\\w[\\w.+-]*@[\\w.-]+\\.[a-z]{2,6})\\b", 
          "#([a-z0-9]+)"];
        re = new RegExp(re.join('|'), "gi");
        ///(#([a-z0-9]+))(?!.*?<\/a>)/gi, '<a href="''">$1</a>');

        //txt = txt.replace(/(#([a-z0-9]+)), '<a href="''">$1</a>');

        txt = txt.replace(re, (match, url, www, mail, hashtag) => {
          if(url)
            return "<a href=\"" + url + "\">" + url + "</a>";
          if(www)
            return "<a href=\"http://" + www + "\">" + www + "</a>";
          if(mail)
            return "<a href=\"mailto:" + mail + "\">" + mail + "</a>"
          if(hashtag)
            console.log('hashtag found', hashtag)
            return '<a href="http://' + hashtag + '">' + hashtag + '</a>'
          return match;
        })
        console.log('txt', txt)
        me.html(txt);
      })
    })
  }

  state.loadTweets = () => {
    let tweetURL = state.getTweetURL()
    fetch(tweetURL, { method: 'GET'})
    .then(res => {
      res.json()
    .then(tweets => {
      state.tweets = tweets
      console.log('tweets', tweets)
      //  state.renderHashtags()
      emitter.emit('render')
      // state.renderHashtags()
    })}).catch(err => console.log('oh no!'))
  }

  state.tweet = (body) => {
    const postTweetURL = getPostTweetURL(state.token)
    fetch(postTweetURL, {method: 'POST', body, headers: {Accept: 'application/json'}})
    .then(res => {
      res.json()
    .then(resJSON => {
      emitter.emit('pushState', '/users/' + state.mainUser.id)
    })}).catch(err => console.log('oh no!'))
  }

  state.getTweetURL = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (state.href === '') {
      return getTimelineURL(state.mainUser.id, token)
    } else if (state.href.indexOf('timeline') !== -1) { 
      return getTimelineURL(state.currUser.id, token)
    } else {
      return getFeedURL(state.currUser.id, token)
    }
  }
}
