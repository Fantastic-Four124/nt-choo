const {getRegisterURL, getLoginURL, getLogoutURL} = require('../util')

module.exports = function authStore (state, emitter) {
  state.mainUser = null
  state.loggedIn = false
  state.token = null
  state.invalidLogin = false
  state.databaseError = false

  emitter.on('pushState', () => {
    state.invalidLogin = false
    state.databaseError = false
  })

  emitter.on('popState', () => {
    state.invalidLogin = false
    state.databaseError = false
  })

  state.register = (body) => {
    const registerURL = getRegisterURL()
    fetch(registerURL, {
      method: 'POST',
      body,
      headers: { Accept: 'application/json'}})
    .then(res => {
      res.json()
    .then(resObj => {
      if (resObj.err) {
        state.databaseError = true
        emitter.emit('render')
      } else {
        localStorage.setItem('mainUser', JSON.stringify(resObj.user))
        localStorage.setItem('token', JSON.stringify(resObj.token))
        state.token = resObj.token
        state.mainUser = resObj.user
        state.loggedIn = true
        emitter.emit('pushState', '/')
      }
    })}).catch(err => {
      state.databaseError = true
      emitter.emit('render')
    })
  }

  state.login = (body) => {
    const loginURL = getLoginURL()
    fetch(loginURL, {
      method: 'POST',
      body,
      headers: {Accept: 'application/json'}})
    .then(res => {
      res.json()
    .then(resObj => {
      if (resObj.err) {
        state.invalidLogin = true
        emitter.emit('render')
      } else {
        localStorage.setItem('mainUser', JSON.stringify(resObj.user))
        localStorage.setItem('token', JSON.stringify(resObj.token))
        state.mainUser = resObj.user
        state.token = resObj.token
        state.loggedIn = true
        state.invalidLogin = false
        emitter.emit('pushState', '/')
      }
    })}).catch(err => {
      state.databaseError = true
      emitter.emit('render')
    })
  }

  state.logout = () => {
    const logoutURL = getLogoutURL(state.token)

    fetch(logoutURL, {method: 'POST', headers: {Accept: 'application/json'}})
    .then(res => {
      res.json()
    .then(resJSON => {
      localStorage.removeItem('mainUser')
      localStorage.removeItem('token')
      state.loggedIn = false
      state.token = null
      state.mainUser = null
      emitter.emit('pushState', '/')
    })}).catch(err => {
      state.databaseError = true
      emitter.emit('render')
    })
  }
}
