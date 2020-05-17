function retrieveFollowersTwitter() {
  const invocation = new XMLHttpRequest()
  const url = 'https://sma-a4.herokuapp.com/'
  // http://sma-a4.herokuapp.com/nume_platforma/profile
  const platforma = 'twitter/' // se seteaza in functie de ce e nevoie
  const actiune = 'profile/' // se seteaza in functie de ce e nevoie

  if (!invocation) return
  const requestDataLogin = `email=${sessionStorage.getItem('current_email')}&password=${sessionStorage.getItem('current_pass')}`

  invocation.open('POST', url + 'auth/login', true)
  invocation.setRequestHeader(
    'Content-type',
    'application/x-www-form-urlencoded'
  )

  invocation.withCredentials = true

  var count = 0
  var tempo = 0

  invocation.onreadystatechange = function () {
    if (tempo == 4) { // jeez christ bad code af dar asigura ca veti primi doar raspunsul la final (json-ul pe care-l asteptati)
      // console.log(this.response)
      var responseLines = this.responseText.split('\n')
      console.log(responseLines[1])
      var obj = JSON.parse(responseLines[1])
      removeChildren()
      modifyHTMLTwit(obj.followers_count[1].followers)
    } else { tempo++ }
    if (count == 0) {
      count = 1
      console.log(url + platforma + actiune + 'stats')
      this.open('GET', url + platforma + actiune + "stats?date_begin=" + sessionStorage.getItem('date_begin') + "&date_end=" + sessionStorage.getItem('date_end'), true)
      this.send()
    }
  }

  invocation.send(requestDataLogin)
}

function modifyHTMLTwit(followers) {
  var elem = document.createElement('div')
  var heading = document.createElement('h4')
  var followers_p = document.createElement('p')

  var heading_n = document.createTextNode('Your daily followers count from Twitter: ')
  var followers_n = document.createTextNode('Number of followers: ' + followers)

  heading.appendChild(heading_n)
  followers_p.appendChild(followers_n)

  elem.appendChild(heading)
  elem.appendChild(followers_p)

  var original = document.getElementById('content-area')
  original.append(elem)
}

function retrieveFollowersTumblr() {
  const invocation = new XMLHttpRequest()
  const url = 'https://sma-a4.herokuapp.com/'
  // http://sma-a4.herokuapp.com/nume_platforma/profile
  const platforma = 'tumblr/' // se seteaza in functie de ce e nevoie
  const actiune = 'profile/' // se seteaza in functie de ce e nevoie

  if (!invocation) return
  const requestDataLogin = `email=${sessionStorage.getItem('current_email')}&password=${sessionStorage.getItem('current_pass')}`

  invocation.open('POST', url + 'auth/login', true)
  invocation.setRequestHeader(
    'Content-type',
    'application/x-www-form-urlencoded'
  )

  invocation.withCredentials = true

  var count = 0
  var tempo = 0

  invocation.onreadystatechange = function () {
    if (tempo == 4) { // jeez christ bad code af dar asigura ca veti primi doar raspunsul la final (json-ul pe care-l asteptati)
      // console.log(this.response)
      var responseLines = this.responseText.split('\n')
      console.log(responseLines[1])
      var obj = JSON.parse(responseLines[1])
      removeChildren()
      modifyHTMLTumblr(obj.followers_count[1].followers)
    } else { tempo++ }
    if (count == 0) {
      count = 1
      this.open('GET', url + platforma + actiune + "stats?date_begin=" + sessionStorage.getItem('date_begin') + "&date_end=" + sessionStorage.getItem('date_end'), true)
      this.send()
    }
  }

  invocation.send(requestDataLogin)
}

function modifyHTMLTumblr(followers) {
  var elem = document.createElement('div')
  var heading = document.createElement('h4')
  var followers_p = document.createElement('p')

  var heading_n = document.createTextNode('Your daily followers count from Tumblr: ')
  var followers_n = document.createTextNode('Number of followers: ' + followers)

  heading.appendChild(heading_n)
  followers_p.appendChild(followers_n)

  elem.appendChild(heading)
  elem.appendChild(followers_p)

  var original = document.getElementById('content-area')
  original.append(elem)
}

function retrieveFollowersLinked() {
  const invocation = new XMLHttpRequest()
  const url = 'https://sma-a4.herokuapp.com/'
  // http://sma-a4.herokuapp.com/nume_platforma/profile
  const platforma = 'linkedin/' // se seteaza in functie de ce e nevoie
  const actiune = 'profile/' // se seteaza in functie de ce e nevoie

  if (!invocation) return
  const requestDataLogin = `email=${sessionStorage.getItem('current_email')}&password=${sessionStorage.getItem('current_pass')}`

  invocation.open('POST', url + 'auth/login', true)
  invocation.setRequestHeader(
    'Content-type',
    'application/x-www-form-urlencoded'
  )

  invocation.withCredentials = true

  var count = 0
  var tempo = 0

  invocation.onreadystatechange = function () {
    if (tempo == 4) { // jeez christ bad code af dar asigura ca veti primi doar raspunsul la final (json-ul pe care-l asteptati)
      // console.log(this.response)
      var responseLines = this.responseText.split('\n')
      console.log(responseLines[1])
      var obj = JSON.parse(responseLines[1])
      removeChildren()
      modifyHTMLLinked(obj.followers_count[1].followers)
    } else { tempo++ }
    if (count == 0) {
      count = 1
      this.open('GET', url + platforma + actiune + "stats?date_begin=" + sessionStorage.getItem('date_begin') + "&date_end=" + sessionStorage.getItem('date_end'), true)
      this.send()
    }
  }

  invocation.send(requestDataLogin)
}

function modifyHTMLLinked(followers) {
  var elem = document.createElement('div')
  var heading = document.createElement('h4')
  var followers_p = document.createElement('p')

  var heading_n = document.createTextNode('Your daily followers count from LinkedIn: ')
  var followers_n = document.createTextNode('Number of followers: ' + followers)

  heading.appendChild(heading_n)
  followers_p.appendChild(followers_n)

  elem.appendChild(heading)
  elem.appendChild(followers_p)

  var original = document.getElementById('content-area')
  original.append(elem)
}

function removeChildren() {
  const myNode = document.getElementById('content-area')
  while (myNode.lastElementChild) {
    myNode.removeChild(myNode.lastElementChild)
  }
}