//http://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=getComments&postId=(aici pui tu id-ul postului la care vrei sa afli comms)&fbid=userID
function getComm() {

    //var url = 'https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?';
    var url = 'https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=getComments&postId=112510383726603_127510862226555&jwt=' + sessionStorage.getItem('token');

    var get_comm = 'getComments';
    //var postId = '112510383726603_127510862226555';
    //var postId = "112510383726603_128873248756983"; //VLADOOO
    var postId = sessionStorage.getItem("postID_FB"); // ALSO VLADOO
    var jwt = sessionStorage.getItem("token");

    var result = [];

    const requestData = `${url}do=${get_comm}&postId=${postId}&jwt=${jwt}`;
    console.log(requestData);

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest()
    } else {
        xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    };

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.response);

            var obj = JSON.parse(this.responseText);
            console.log(obj);
            alert_message = "";
            removeChilds();
            for (var i = 0; i < obj.COMMENTS.length; i++) {
                var temp = obj.COMMENTS[i];
                alert_message = alert_message + temp[0] + " Postat de: " + temp[1];
                modify(temp[0], temp[1]);
                console.log(temp);

            }

            console.log(alert_message);
        }

    };

    xhttp.open("GET", url, true);
    xhttp.send(null);

}

function modify(comentariu, owner) {
    var elem = document.createElement("div")
    var heading = document.createElement("h4");
    var comment = document.createElement("p");
    var comm_text = document.createTextNode(comentariu);
    var node = document.createTextNode('@' + owner);
    heading.appendChild(node);
    comment.appendChild(comm_text);
    elem.appendChild(heading);
    elem.appendChild(comment);
    var original = document.getElementById("content-area");
    original.append(elem);
}


function removeChilds() {
    const myNode = document.getElementById("content-area");
    while (myNode.lastElementChild) {
        myNode.removeChild(myNode.lastElementChild);
    }
}