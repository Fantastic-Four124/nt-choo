const html = require('choo/html')

module.exports = function renderSearchBar (state, emit) {
  return html`
    <div id="search-bar">
      <form action="/search" method="GET">
        <input type="text" name="search" size="50">
        <input type="submit" value="Search">
      </form>
    </div>
  `
}

