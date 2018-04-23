/* globals localStorage fetch */

const {getLoadUserURL,
  getFollowURL,
  getUnfollowURL,
  getFollowerListURL,
  getLeaderListURL,
  isFollowing
} = require('../util')

module.exports = function userStore (state, emitter) {
  state.currUser = null
  state.userLoaded = false
  state.userList = null

  emitter.on('pushState', () => {
    state.currUser = null
    state.userList = null
    state.userLoaded = false
  })

  emitter.on('popState', () => {
    state.currUser = null
    state.userList = null
    state.userLoaded = false
  })

  state.loadUser = () => {
    if (state.params.id) {
      state.token = JSON.parse(localStorage.getItem('token'))
      const userURL = getLoadUserURL(state.params.id, state.token)
      fetch(userURL, { method: 'GET'})
      .then(res => {
        res.json()
      .then(user => {
        console.log('user', user)
        state.currUser = user
        state.userLoaded = true
        emitter.emit('render')
      })}).catch(err => {
        state.databaseError = true
        emitter.emit('render')
      })
    } else {
      if (state.loggedIn) {
        state.currUser = state.mainUser
        state.userLoaded = true
        emitter.emit('render')
      } else {
        state.currUser = 'anon'
        state.userLoaded = true
        emitter.on('DOMContentLoaded', () => {
          emitter.emit('render')
        })
      }
    }
  }

  state.loadUserList = () => {
    const id = state.params.id
    const token = JSON.parse(localStorage.getItem('token'))
    let userListURL = ''
    if (state.href.indexOf('leaders') !== -1) {
      userListURL = getLeaderListURL(id, token)
    } else {
      userListURL = getFollowerListURL(id, token)
    }
    fetch(userListURL, { method: 'GET'})
    .then(res => {
      res.json()
    .then(userList => {
      state.userList = userList
      emitter.emit('render')
    })}).catch(err => {
      state.databaseError = true
      emitter.emit('render')
    })
  }

  state.toggleFollow = (otherUser) => {
    let toggleURL = state.localToggle(otherUser)
    fetch(toggleURL , {
      method: 'POST',
      headers: { Accept: 'application/json'}})
    .then(res => {
      res.json()
    .then(resObj => {
      emitter.emit('render')
    })}).catch(err => {
      state.databaseError = true
      emitter.emit('render')
    })
  }

  state.localToggle = (otherUser) => {
    const token = JSON.parse(localStorage.getItem('token'))
    let toggleURL = ''
    if (!isFollowing(state.mainUser, otherUser)) {
      toggleURL = getFollowURL(otherUser.id, token)
      state.mainUser.leaders.push(otherUser.id)
      state.mainUser.number_of_leaders++
      state.currUser.number_of_followers++
      //      otherUser.followers.push(state.mainUser.id)
      localStorage.setItem('mainUser', JSON.stringify(state.mainUser))
    } else {
      toggleURL = getUnfollowURL(otherUser.id, token)
      state.mainUser.leaders = state.mainUser.leaders.filter(l => {
        return l !== otherUser.id
      })

      state.mainUser.number_of_leaders--
      state.currUser.number_of_followers--
      // otherUser.followers = otherUser.followers.filter(f => {
      //   return f !== state.mainUser.id
      // })
      localStorage.setItem('mainUser', JSON.stringify(state.mainUser))
    }
    return toggleURL
  }
}
