function avgFavesCommsFlickr() {
    var xhttp;
    var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/DPZ/REST.php?do=getAverageFaves&token=" + sessionStorage.getItem('token');
    console.log("1");

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
            console.log("2");

            removeChildren()

            alert_message = alert_message + obj.AVERAGEFAVES;
            console.log(obj.AVERAGEFAVES)
            if (alert_message === "undefined") {
                modifyHTML1999(obj.ERROR);
            } else {
                modifyHTML1999(obj.AVERAGEFAVES, obj.TOTAL)
            }

            console.log("3")

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

    var xhttp2;
    var url2 = "https://web-rfnl5hmkocvsi.azurewebsites.net/DPZ/REST.php?do=getAverageComments&token=" + sessionStorage.getItem('token');
    console.log("4");

    var displayed2 = 0;

    if (window.XMLHttpRequest) {
        xhttp2 = new XMLHttpRequest()
    } else {
        xhttp2 = new ActiveXObject('Microsoft.XMLHTTP')
    };

    xhttp2.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            console.log(xhttp2.response);

            // Parsare raspuns + adaugare in fisier functie de modificare html + adaugare in pagina raspuns :)
            var obj2 = JSON.parse(this.responseText)
            alert_message2 = ''
            console.log("5");



            alert_message2 = alert_message2 + obj2.AVERAGECOMMENTS;
            console.log(obj2.AVERAGECOMMENTS)
            if (alert_message2 === "undefined") {
                modifyHTML2000(obj2.ERROR);
            } else {
                modifyHTML2000(obj2.AVERAGECOMMENTS, obj2.TOTAL)
            }

            console.log("6")

        } else
        if (this.status == 404) {
            if (displayed2 == 0) {
                alert('No information found')
                location.reload()
                displayed2++
            }
        }

    };

    xhttp2.open('GET', url2, true);
    xhttp2.send(null);
}

function modifyHTML1999(faves, total) {
    var elem = document.createElement('div')
    elem.id = 'first_div'
    var faves_p = document.createElement('p')
    var total_p = document.createElement('p')

    var faves_d = document.createTextNode('Average faves: ' + faves)
    var total_d = document.createTextNode('Total faves: ' + total)

    faves_p.appendChild(faves_d)
    total_p.appendChild(total_d)

    elem.appendChild(faves_p)
    elem.appendChild(total_p)

    var original = document.getElementById('content-area')
    original.append(elem)
}

function modifyHTML2000(comms, total) {
    var elem = document.getElementById('first_div')

    var comms_p = document.createElement('p')
    var total_p = document.createElement('p')

    var comms_d = document.createTextNode('Average comments: ' + comms)
    var total_d = document.createTextNode('Total comments: ' + total)

    comms_p.appendChild(comms_d)
    total_p.appendChild(total_d)

    elem.appendChild(comms_p)
    elem.appendChild(total_p)

}

function removeChildren() {
    const myNode = document.getElementById('content-area')
    while (myNode.lastElementChild) {
        myNode.removeChild(myNode.lastElementChild)
    }
}