function getUsername() {
    var xhttp;
    var id = sessionStorage.getItem("id_user");
    var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/DPZ/REST.php?do=getAccountName&token=" + sessionStorage.getItem('token');
    console.log(url);

    var displayed = 0;

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest()
    } else {
        xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    };

    xhttp.onreadystatechange = function() {

        //console.log('sunt aici');
        if (this.readyState == 4 && this.status == 200) {

            console.log(xhttp.response);

            var obj = JSON.parse(this.responseText);
            removeChilds();
            var comentariu = obj.FULLNAME;
            modific(comentariu);

        } else
        if (this.status == 404) {
            if (displayed == 0) {
                alert('No information found')
                location.reload()
                displayed++
            }
            //console.log('sunt aici bad');
        }

    };

    xhttp.open('GET', url, true);
    xhttp.send(null);
}

function modific(comentariu) {

    console.log("sunt in functie");
    var elem = document.createElement("div")
    var heading = document.createElement("h4");
    var comment = document.createElement("p");
    var comm_text = document.createTextNode(comentariu);
    var node = document.createTextNode('Full Name:');
    heading.appendChild(node);
    comment.appendChild(comm_text);
    elem.appendChild(heading);
    elem.appendChild(comment);
    var original = document.getElementById("content-area");
    original.append(elem);
}