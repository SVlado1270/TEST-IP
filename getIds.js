function getBestPostsID() {

	getPostID_FB();
	getPostID_FLICKR();
	getToken_FB();

	//a = getPostID_FB();
	//b = getPostID_FLICKR();

	//sessionStorage.setItem("postID_FB", a);
	//sessionStorage.setItem("postID_FLICKR", b);

	//if( a != null && b != null)
	setTimeout(function(){ console.log("yes")
		location.assign("./stats-page.html");
    }, 2500);  

		//location.assign("./stats-page.html");
}

function getPostID_FB() {
	var xhttp;
    var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=getBestPost&jwt=" + sessionStorage.getItem("token");

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
            //console.log(postID);
            sessionStorage.setItem('postID_FB', obj.PAGE_IDS[0]);
            console.log(postID);
        }
    }
    xhttp.open('GET', url, true);
    xhttp.send(null);

}

function getPostID_FLICKR() {
	var xhttp;
    var url1 = "https://web-rfnl5hmkocvsi.azurewebsites.net/DPZ/REST.php?do=getBestPost&token=" + sessionStorage.getItem("token");

    //console.log(url1);

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest()
    } else {
        xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    };


    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //console.log(xhttp.response);
            var obj = JSON.parse(xhttp.responseText);
            postID = obj.POST_ID;
            //console.log(postID);
            sessionStorage.setItem('postID_FLICKR', obj.POST_ID);
            console.log(postID);

        }
    }
    xhttp.open('GET', url1, true);
    xhttp.send(null);

}

function getToken_FB() {

    const invocation = new XMLHttpRequest();
    const url = "https://sma-a4.herokuapp.com/";

    if (!invocation) return;
    const requestDataLogin = `email=${sessionStorage.getItem("current_email")}&password=${sessionStorage.getItem("current_pass")}`;

    invocation.open("POST", url + "auth/login", true);
    invocation.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
    );

    invocation.withCredentials = true;

    var count = 0;
    var tempo = 0;

    invocation.onreadystatechange = function() {
    	if(tempo == 4){
    	//console.log(this.response)
    	var responseLines = this.responseText.split("\n");
    	var obj = JSON.parse(responseLines[1])
    	sessionStorage.setItem("token", obj.token);
    	console.log(sessionStorage.getItem("token"));

    }
    else
    	tempo++;
        if (count == 0) {
            count = 1;
            this.open("GET", url + "token" , true);
            this.send();
        }
    };

    invocation.send(requestDataLogin);

}
