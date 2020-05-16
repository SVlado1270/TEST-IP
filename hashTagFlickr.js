function popularHashTagFlickr() {
  
    var xhttp
    //var postID = '49765475798'
    var postID = sessionStorage.getItem("postID_FLICKR"); // vladoo
    var url = 'https://web-rfnl5hmkocvsi.azurewebsites.net/DPZ/REST.php?do=getMostCommonTag&token=' +sessionStorage.getItem('token');
  
    console.log(url)
  
    if (window.XMLHttpRequest) {
      xhttp = new XMLHttpRequest()
    } else {
      xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    };
  
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.response);
        var obj = JSON.parse(this.responseText)
        alert_message = ''
        console.log(obj);
  
        removeChildren()
       
        alert_message = alert_message + 'tag: ' + obj.MOSTCOMMONTAG +'\n'+ 'appearences: ' + obj.APPEARANCES;
        modifyHTML1(obj.MOSTCOMMONTAG, obj.APPEARANCES)
        
        console.log(alert_message)
      }
    }
  
    xhttp.open('GET', url, true)
    xhttp.send(null)
  }
  
  function modifyHTML1 (hashtag,appearences) {
    var elem = document.createElement('div')
    var tag_p = document.createElement('p')
    var appear_p = document.createElement('p')

    var tag_d = document.createTextNode('Most common tag: ' + hashtag)
    var appear_d = document.createTextNode('Appearances: ' + appearences)

    tag_p.appendChild(tag_d)
    appear_p.appendChild(appear_d)

    elem.appendChild(tag_p)
    elem.appendChild(appear_p)

    var original = document.getElementById('content-area')
    original.append(elem)
  }
  
  function removeChildren () {
    const myNode = document.getElementById('content-area')
    while (myNode.lastElementChild) {
      myNode.removeChild(myNode.lastElementChild)
    }
  }
  