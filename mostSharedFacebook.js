function mostSharedFacebook() {
    var xhttp;
    var url1 = 'https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?';
    var getShared = 'MostShared';
    var postId = sessionStorage.getItem("postID_FB");
    var jwt = sessionStorage.getItem("token");

    const requestData = `${url1}do=${getShared}&postId=${postId}&jwt=${jwt}`;
    console.log(requestData);

    //console.log(url1);

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest()
    } else {
        xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    };


    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.response);
            var obj = JSON.parse(xhttp.responseText);
            postID = obj.PAGE_IDS[0];
            console.log(postID);
            sessionStorage.setItem('postID', obj.PAGE_IDS[0]);
            //console.log(postID);
        }
    }
    xhttp.open("GET", requestData, true);
    xhttp.send(null);

    var xhttp2;
    var url1 = 'https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?';
    var getText = 'getText';

    const requestData2 = `${url1}do=${getText}&postId=${postId}&jwt=${jwt}`;
    console.log(requestData2);

    if (window.XMLHttpRequest) {
        xhttp2 = new XMLHttpRequest()
    } else {
        xhttp2 = new ActiveXObject('Microsoft.XMLHTTP')
    };

    xhttp2.onreadystatechange = function() {
        if (xhttp2.readyState == 4 && xhttp2.status == 200) {
            console.log(xhttp2.response);
            removeChilds();
            var obj2 = JSON.parse(xhttp2.responseText);
            alert_message = obj2.MESSAGE;
            modifyHTMLMostShared(alert_message);
            console.log('Get most shared post ' + alert_message);
            //alert(alert_message);

        } else {
            console.log('eroare de aia mare');
        }


    };
    xhttp2.open('GET', requestData2, true);
    xhttp2.send(null);
}

function modifyHTMLMostShared(comentariu) {
    var elem = document.createElement("div")
    var heading = document.createElement("h4");
    var comment = document.createElement("p");
    var comm_text = document.createTextNode(comentariu);
    var node = document.createTextNode('Most shared post: ');
    heading.appendChild(node);
    comment.appendChild(comm_text);
    elem.appendChild(heading);
    elem.appendChild(comment);
    var original = document.getElementById("content-area");
    original.append(elem);
}