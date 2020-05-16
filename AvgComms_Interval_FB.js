function avg_CommsFB() {
    var xhttp;
    var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=avgCommsTime&jwt=" +  sessionStorage.getItem('token') + "&begin=" + sessionStorage.getItem('date_begin') + "&end=" + sessionStorage.getItem('date_end')
    console.log(url);

    var displayed = 0;

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest()
    } else {
        xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    };

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            console.log(xhttp.response);

            // Parsare raspuns + adaugare in fisier functie de modificare html + adaugare in pagina raspuns :)
            var obj = JSON.parse(this.responseText)
            alert_message = ''
            console.log(obj);
    
            removeChildren()
        
            alert_message = alert_message + 'tag: ' + obj.AVGCOMMS;
            modifyHTML4(obj.AVGCOMMS)
            
            console.log(alert_message)

        } else
        if (this.status == 404) {
            if (displayed == 0) {
                alert('No information found')
                location.reload()
                displayed++
            }
        }

    };

    xhttp.open('GET', url, true);
    xhttp.send(null);
}

function modifyHTML4 (hashtag) {
    var elem = document.createElement('div')
    var tag_p = document.createElement('p')

    var tag_d = document.createTextNode('Average comments: ' + hashtag)

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