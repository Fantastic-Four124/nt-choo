const moment = require('moment')

//const SERVICE_URL = 'https://serene-mountain-37189.herokuapp.com'
//const SERVICE_URL = 'http://localhost:4567'
//const FOLLOW_SERVICE_URL = 'https://fierce-garden-41263.herokuapp.com'
const SERVICE_URL = 'https://boiling-castle-61613.herokuapp.com'
const REGISTER = 'register'
const RECENT = 'recent'
const USERS = 'users'
const LOGIN = 'login'
const TIMELINE = 'timeline'
const TWEETS = 'tweets'
const FEED = 'feed'
const NEW = 'new'
const FOLLOW = 'follow'
const UNFOLLOW = 'unfollow'
const FOLLOWER_LIST = 'follower-list'
const LEADER_LIST = 'leader-list'
const PREFIX = 'api/v1'

exports.pluralize = function (num, base, suffix = 's') {
  if (num === 1) { return base }
  return base + suffix
}

exports.niceDate = function (ts, opts) {
  const endOfToday = moment().endOf('day')
  if (typeof ts === 'number') { ts = moment(ts) }
  if (ts.isSame(endOfToday, 'day')) {
    if (opts && opts.noTime) { return 'today' }
    return ts.fromNow()
  } else if (ts.isSame(endOfToday.subtract(1, 'day'), 'day')) { return 'yesterday' } else if (ts.isSame(endOfToday, 'month')) { return ts.fromNow() }
  return ts.format('ll')
}

exports.getViewUserURL = function (user) {
  if (!user) return ''
  return '/users/' + user.id
}

exports.isFollowing = (mainUser, otherUser) => {
  let flag = false
  mainUser.leaders.forEach(l => {
    console.log('leader in each', l)
    if (l === otherUser.id) {
      flag = true
    }
  })
  return flag
}

exports.getRegisterURL = () => {
  return SERVICE_URL + '/' + PREFIX + '/' + USERS + '/' + REGISTER
}

exports.getLoginURL = () => {
  return SERVICE_URL + '/' + PREFIX + '/' + LOGIN
}

exports.getLoadUserURL = (id, token) => {
  return SERVICE_URL + '/' + PREFIX + '/' + token + '/' + USERS + '/' + id
}

exports.getTimelineURL = (id, token) => {
  return SERVICE_URL + '/' + PREFIX + '/' + token + '/' + USERS + '/' + id + '/' + TIMELINE
}

exports.getFeedURL = (id, token) => {
  return SERVICE_URL + '/' + PREFIX + '/' + token + '/' + USERS + '/' + id + '/' + FEED
}

exports.getRecentTweetsURL = () => {
  return SERVICE_URL + '/' + PREFIX + '/' + TWEETS + '/' + RECENT
}

exports.getPostTweetURL = (token) => {
  return SERVICE_URL + '/' + PREFIX + '/' + token + '/' + TWEETS + '/' + NEW
}

exports.getFollowURL = (id, token) => {
  return SERVICE_URL + '/' + PREFIX + '/' + token + '/' + USERS + '/' + id + '/' + FOLLOW
}

exports.getUnfollowURL = (id, token) => {
  return SERVICE_URL + '/' + PREFIX + '/' + token + '/' + USERS + '/' + id + '/' + UNFOLLOW
}

exports.getFollowerListURL = (id, token) => {
  return SERVICE_URL + '/' + PREFIX + '/' + token + '/' + USERS + '/' + id + '/' + FOLLOWER_LIST
}

exports.getLeaderListURL = (id, token) => {
  return SERVICE_URL + '/' + PREFIX + '/' + token + '/' + USERS + '/' + id + '/' + LEADER_LIST
}
