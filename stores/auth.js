const {getRegisterURL, getLoginURL} = require('../util')

module.exports = function authStore (state, emitter) {
  state.mainUser = null
  state.loggedIn = false
  state.token = null

  state.register = (body) => {
    const registerURL = getRegisterURL()
    fetch(registerURL, {
      method: 'POST',
      body,
      headers: { Accept: 'application/json'}})
    .then(res => {
      res.json()
    .then(resObj => {
      console.log('resObj', resObj)
      localStorage.setItem('mainUser', JSON.stringify(resObj.user))
      localStorage.setItem('token', JSON.stringify(resObj.token))
      state.token = resObj.token
      state.mainUser = resObj.user
      state.loggedIn = true
      emitter.emit('pushState', '/')
    })}).catch(err => console.log('oh no!'))
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
      console.log('resObj', resObj)
      localStorage.setItem('mainUser', JSON.stringify(resObj.user))
      localStorage.setItem('token', JSON.stringify(resObj.token))
      state.mainUser = resObj.user
      state.token = resObj.token
      state.loggedIn = true
      console.log('state after login', state)
      emitter.emit('pushState', '/')
    })}).catch(err => console.log('oh no!'))
  }

  state.logout = () => {
    localStorage.removeItem('mainUser')
    localStorage.removeItem('token')
    state.loggedIn = false
    state.token = null
    state.mainUser = null
    console.log('state after logging out', state)
    emitter.emit('pushState', '/')
  }
}
