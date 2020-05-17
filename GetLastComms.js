function getLastComms () {
  var xhttp
  //var postID = '112510383726603_128873248756983' // Cel mai probabil pe viitor vom salva id-ul postarii in functie de cea pe care o alege utilizatorul (TBD)
  var postID = sessionStorage.getItem("postID"); // vlado
  var url = 'https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=last3comments&postId=112510383726603_119708059673502&jwt=' + sessionStorage.getItem('token')

  console.log(url)

  var displayed = 0

  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest()
  } else {
    xhttp = new ActiveXObject('Microsoft.XMLHTTP')
  };

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttp.response)
      var obj = JSON.parse(this.responseText)
      alert_message = ''

      removeChildren()
      for (var i = 0; i < obj.COMMENTS.length; i++) {
        var temp = obj.COMMENTS[i]
        alert_message = alert_message + temp[0] + ' Postat de: ' + temp[1]
        modifyHTML(temp[0], temp[1])
        // console.log(temp);
      }

      console.log(alert_message)
      // alert(alert_message);
    }
  }

  xhttp.open('GET', url, true)
  xhttp.send(null)
}

function modifyHTML (comentariu, owner) {
  var elem = document.createElement('div')
  var heading = document.createElement('h4')
  var comment = document.createElement('p')
  var comm_text = document.createTextNode(comentariu)
  var node = document.createTextNode('@' + owner)
  heading.appendChild(node)
  comment.appendChild(comm_text)
  elem.appendChild(heading)
  elem.appendChild(comment)
  var original = document.getElementById('content-area')
  original.append(elem)
}

function removeChildren () {
  const myNode = document.getElementById('content-area')
  while (myNode.lastElementChild) {
    myNode.removeChild(myNode.lastElementChild)
  }
}

