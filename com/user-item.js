const html = require('choo/html')

module.exports = function renderUserItem (state, emit, user) {
  return html`
    <div class="user-item" id="user-item-${user.id}">
      <div class="row">
        <div class="col-lg-9">
          <p>User: ${user.username}</p>
        </div>
        <div class="col-lg-3">
          <a class="btn btn-primary" href="/users/${user.id}">Profile</a>
        </div>
      </div>
    </div>
  `
}
