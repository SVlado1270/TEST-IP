function retrieveProfileTwitter () {
  const invocation = new XMLHttpRequest()
  const url = 'https://sma-a4.herokuapp.com/'
  // http://sma-a4.herokuapp.com/nume_platforma/profile
  const nume_platforma = 'twitter/'// se seteaza in functie de ce e nevoie
  const actiune = 'profile'// se seteaza in functie de ce e nevoie

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
    if (tempo == 4) {
      var responseLines = this.responseText.split('\n')
      console.log(responseLines[1])
      var obj = JSON.parse(responseLines[1])
      removeChildren()
      modifyHTMLProfile(obj.name, obj.followers, obj.id)

    } else { tempo++ }
    if (count == 0) {
      count = 1
      this.open('GET', url + nume_platforma + actiune, true)
      this.send()
    }
  }

  invocation.send(requestDataLogin)
}

function modifyHTMLProfile (owner, comentariu, id) {
  var elem = document.createElement('div')
  var heading = document.createElement('h4')
  var comment = document.createElement('p')
  var id_p = document.createElement('p')
  var comm_text = document.createTextNode('Followers: ' + comentariu)
  var id_node = document.createTextNode('Id: ' + id)
  var node = document.createTextNode('@' + owner)
  heading.appendChild(node)
  comment.appendChild(comm_text)
  id_p.appendChild(id_node)
  elem.appendChild(heading)
  elem.appendChild(comment)
  elem.appendChild(id_p)
  var original = document.getElementById('content-area')
  original.append(elem)
}

function removeChildren () {
  const myNode = document.getElementById('content-area')
  while (myNode.lastElementChild) {
    myNode.removeChild(myNode.lastElementChild)
  }
}
