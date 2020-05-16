function avg_CommsFlickr() {
    var xhttp;
    var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/DPZ/REST.php?do=getAverageCommentsBetween&token=" +  sessionStorage.getItem('token') + "&begin=" + sessionStorage.getItem('date_begin') + "&end=" + sessionStorage.getItem('date_end')
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
        
            alert_message = alert_message + obj.AVERAGECOMMENTS;
            console.log(obj.AVERAGECOMMENTS)
            if(alert_message === "undefined"){
                modifyHTML7(obj.ERROR,'0');
            }
            else{
                modifyHTML7(obj.AVERAGECOMMENTS,obj.TOTAL)
            }
            
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

function modifyHTML7 (faves,total) {
    var elem = document.createElement('div')
    var faves_p = document.createElement('p')
    var total_p = document.createElement('p')

    var faves_d = document.createTextNode('Average comments: ' + faves)
    var total_d = document.createTextNode('Total: ' + total)

    faves_p.appendChild(faves_d)
    total_p.appendChild(total_d)

    elem.appendChild(faves_p)
    elem.appendChild(total_p)

    var original = document.getElementById('content-area')
    original.append(elem)
  }
  
  function removeChildren () {
    const myNode = document.getElementById('content-area')
    while (myNode.lastElementChild) {
      myNode.removeChild(myNode.lastElementChild)
    }
  }