export function _getNumberOfPosts() {
  return fetch('http://jsonplaceholder.typicode.com/posts')
    .then(res => res.json().length);
}

export function _getNumberOfUsers() {
  return fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json().length);
}

export function _getTweets(page, limit) {
  return fetch('http://jsonplaceholder.typicode.com/posts?_page=' + page + '&_limit=' + limit)
    .then(res => res.json());
}

export function _addTweet() {
  return fetch('http://jsonplaceholder.typicode.com/posts', {method: 'POST', cache: 'reload'})
    .then(res => res.json());
}

export function _deleteTweet() {
  return fetch('http://jsonplaceholder.typicode.com/posts/1', {method: 'DELETE', cache: 'reload'})
    .then(res => res.json());
}

export function _getTweetComments(id) {
  return fetch('http://jsonplaceholder.typicode.com/posts/' + id + '/comments')
    .then(res => res.json());
}

export function _addComment() {
  return fetch('http://jsonplaceholder.typicode.com/posts', {method: 'POST', cache: 'reload'})
    .then(res => res.json());
}

export function _updateComment() {
  return fetch('http://jsonplaceholder.typicode.com/posts', {method: 'POST', cache: 'reload'})
    .then(res => res.json());
}

export function _deleteComment() {
  return fetch('http://jsonplaceholder.typicode.com/posts/1', {method: 'DELETE', cache: 'reload'})
    .then(res => res.json());
}

export function _getUsers() {
  return fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json());
}

export function _getUser(id) {
  return fetch('http://jsonplaceholder.typicode.com/users/' + id)
    .then(res => res.json());
}
