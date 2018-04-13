const html = require('choo/html')
const {getViewUserURL, niceDate, pluralize, isFollowing} = require('../util')

module.exports = function renderProfile (state, emit, tweet) {
  if (!state.loggedIn) {
    return html`
      <div class="login-box position-fixed" id="profile-1">
        Login to nanoTwitter
        <br>
          <a href="/login" class="btn btn-primary" role="button">Login</a>
      </div>
    `
  }

  if (!state.currUser) {
    return ''
  }

  if (state.currUser.id === state.mainUser.id) {
    return html`
      <div class="profile position-fixed" id="profile-<%= @curr_user.id %>">
        <p>User: ${state.currUser.username} </p>
        <p>Leaders: <a href="/users/${state.currUser.id}/leaders">${state.currUser.leaders.length}</a></p>
        <p>Followers: <a href="/users/${state.currUser.id}/followers">${state.currUser.followers.length}</a></p>
        <p><a href="/">Your Timeline</a></p>
        <p><a href="/users/${state.mainUser.id}">Your Feed</a></p>
        <p><a href="/alltweets">All Recent Tweets</a></p>
      </div>
    `
  }

  return html`
    <div class="profile position-fixed" id="profile-${state.currUser.id}>">
      <p>User: ${state.currUser.username} </p>
      <p>Leaders: <a href="/users/${state.currUser.id}/leaders">${state.currUser.leaders.length}</a></p>
      <p>Followers: <a href="/users/${state.currUser.id}/followers">${state.currUser.followers.length}</a></p>
      <p><a href="/users/${state.currUser.id}/timeline">Timeline</a></p>
      ${renderFollowButton()}
    </div>
  `

  function gotoLogin () {
    emit.global('pushState', '/login')
  }
  
  function renderFollowButton () {
    console.log('weee', isFollowing(state.mainUser, state.currUser))
    if (isFollowing(state.mainUser, state.currUser)) {
      return html`
      <button id="follow-btn" type="submit" name="follow" class="btn btn-primary" onclick=${toggleFollow}>Unfollow</button>
      `
    } 
  
    return html`
       <button id="follow-btn" type="submit" name="unfollow" class="btn btn-primary" onclick=${toggleFollow}>Follow</button>
    `
  }
  
  function toggleFollow () {
    state.toggleFollow(state.currUser)
    const btn = document.getElementById('follow-btn')
    console.log('btn', btn.innerHTML)
    if (btn.innerHTML === 'Follow') {
      btn.innerHTML = 'Unfollow' 
    } else {
      btn.innerHTML = 'Follow' 
    }
  }
}


