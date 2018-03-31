import nav from './templates/nav.html'
import root from './templates/root.html'
import checkout from './templates/checkout.html'
import store from './templates/store.html'
import user from './templates/user.html'

// import _ from 'lodash'
import $ from 'jquery'

import style from "./main.css"

let templates = {
  nav, root, checkout, store, user,
}

let URL = '/'
function render (app) {
  let outHTML = ''
  // const hash = window.location.hash.substring(1)
  // switch (hash) {
  switch (window.location.pathname) {
    // switch (URL) {
    case '/': case '':
    outHTML = templates.nav + templates.root
    break;
    case '/store':
      import(/* webpackChunkName: "lodash1_join" */ 'lodash/join').then(module => {
        const join = module.default
        outHTML = join([templates.nav, templates.store], ' ')
        app.innerHTML = outHTML
      })
      // outHTML = templates.nav + templates.store
      // outHTML = _.join([templates.nav, templates.store], ' ')
      break;
    case '/checkout':
      outHTML = templates.nav + templates.checkout
      break;
    case '/submit':
      outHTML = templates.nav + templates.root
      break;
  }
  app.innerHTML = outHTML
  // if (URL === '/checkout') {
  if (window.location.pathname === '/checkout') {
    app.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault()
      const username = app.querySelector('form input[name="username"]').value
      const password = app.querySelector('form input[name="password"]').value
      let myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded")
      fetch("/submit", {
        method: "POST",
        headers: myHeaders,
        body: `username=${username}&password=${password}&my=aaaa`
      }).then(res => res.json())
        .then(json => {
          alert(JSON.stringify(json))
        })
    })
  }
}

function run () {
  const app = document.getElementById('app')

  document.body.addEventListener('click', (e) => {
    const {target} = e
    // var target = e.target
    if (target.nodeName === 'A' && target.nodeType === 1) {
      e.preventDefault()
      // URL = target.getAttribute('href')
      history.pushState({}, target.textContent, target.getAttribute('href'))
      // window.location.hash = target.getAttribute('href').substring(1)
      render(app)
    }
  })

  render(app)
}

document.addEventListener('DOMContentLoaded', () => {
  run()
})