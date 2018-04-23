module.exports = function searchStore (state, emitter) {
  state.search = (body) => {
    const searchURL = getSearchURL(state.token)
    fetch(searchURL, {method: 'GET', body, headers: {Accept: 'application/json'}})
    .then(res => {
      res.json()
    .then(resJSON => {
      if (resJSON.type == 'userSearch') {
        state.userList = resJSON.users
        emitter.emit('pushState', '/user-search')
      } else {
        state.tweets = resJSON.tweets
        emitter.emit('pushState', '/tweet-search')
      }
    })}).catch(err => console.log('oh no!'))
  }
