function popularHashTagFacebook() {
  
    var xhttp
    //var postID = '49765475798'
    var postID = sessionStorage.getItem("postID_FLICKR"); // vladoo
    var url = 'https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=MostTagged&jwt=' + sessionStorage.getItem('token');
  
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
       
        alert_message = alert_message + 'tag: ' + obj.popularHashTag;
        modifyHTML2(obj.popularHashTag)
        
        console.log(alert_message)
      }
    }
  
    xhttp.open('GET', url, true)
    xhttp.send(null)
  }
  
  function modifyHTML2 (hashtag) {
    var elem = document.createElement('div')
    var tag_p = document.createElement('p')

    var tag_d = document.createTextNode('Most popular tag: ' + hashtag)

    tag_p.appendChild(tag_d)

    elem.appendChild(tag_p)

    var original = document.getElementById('content-area')
    original.append(elem)
  }
  
  function removeChildren () {
    const myNode = document.getElementById('content-area')
    while (myNode.lastElementChild) {
      myNode.removeChild(myNode.lastElementChild)
    }
  }
  