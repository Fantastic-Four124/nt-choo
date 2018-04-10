const html = require('choo/html')

module.exports = function tweetbar (state, emit) {
  return html`
    <div id="tweet-bar">
      <form id="tweet" onsubmit=${onsubmit}>
        <input id="tweet-input" name="tweet-input"
          type="text"
          required
          pattern=".{1,}"
          title="Tweet must be at least one character long."
          size="70"
         >
         <input type="submit" value="Tweet">
       </form>
     </div>
  `

  function onsubmit (e) {                                              // 2.
    e.preventDefault()                                                 // 3.
    var form = e.currentTarget                                         // 4.
    var body = new FormData(form)                                      // 5.
    state.tweet(body)
  }
}




