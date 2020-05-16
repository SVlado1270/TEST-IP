function postAll_Message() {
    var fb = document.getElementById("facebook").checked;
    var twitter = document.getElementById("twitter").checked;
    var linkedin = document.getElementById("linkedin").checked;
    var flickr = document.getElementById("flickr").checked;
    var tumblr = document.getElementById("tumblr").checked;

    if (fb) {
        postMessage_fb();
        console.log("Postez mesaj text fb");
    }
    if (twitter) {
        post_Twitter();
        console.log("Postez mesaj text pe twitter");
    }
    if (linkedin) {
        post_Linkedin();
        console.log("Postez mesaj text pe linkedin");
    }
    if (flickr) {

    }
    if (tumblr) {
        post_Tumblr();
        console.log("Postez mesaj text pe tumblr.");
    }
    // nu poti posta doar text pe flickr :)
}

function postAll_Image() {
    var fb = document.getElementById("facebook").checked;
    var twitter = document.getElementById("twitter").checked;
    var linkedin = document.getElementById("linkedin").checked;
    var flickr = document.getElementById("flickr").checked;
    var tumblr = document.getElementById("tumblr").checked;

    if (fb) {
        postImage_fb();
        console.log("Postez img pe fb");
    }
    if (twitter) {
        post_Twitter();
        console.log("Postez img pe twitter");
    }
    if (linkedin) {
        post_Linkedin();
        console.log("Postez img pe linkedin");
    }
    if (flickr) {
        postImage_Flickr();
        console.log("Postez img pe flickr");
    }
    if (tumblr) {
        post_Tumblr();
        console.log("Postez img pe tumblr");
    }
}

function postAll_URL() {
    var fb = document.getElementById("facebook").checked;
    var twitter = document.getElementById("twitter").checked;
    var linkedin = document.getElementById("linkedin").checked;
    var flickr = document.getElementById("flickr").checked;
    var tumblr = document.getElementById("tumblr").checked;

    if (twitter) {
        post_Twitter();
        console.log("Postez url pe twitter");
    }
    if (linkedin) {
        post_Linkedin();
        console.log("Postez url pe linkedin");
    }
    if (tumblr) {
        post_Tumblr();
        console.log("Postez url pe tumblr");
    }
    if (fb) {
        postURL_fb();
        console.log("Postez url pe fb");
    }
    // Nu am vazut url pt flickr
}


/*-------------------------------------------------------------------------------------------*/
// POSTARE TEXT



function postMessage_fb() {
    var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=PostMessage";
    var jwt = sessionStorage.getItem("token");
    var message = document.getElementById("source").value;
    getSelectedPage("facebook");

    var requestedData = `${url}&messenger=${message}&token=${jwt}&submit=Message`;
    console.log(requestedData);

    var displayed = 0
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest()
    } else {
        xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    };
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.response, this.status)
            location.assign('main-page.html')
        } else
        if (this.status == 404) {
            if (displayed == 0) {
                alert('Could not post message');
                location.reload()
                displayed++
            }
        }
    }
    xhttp.open('GET', requestedData, true);
    xhttp.send(null);
}
/*Get selected Page FACEBOOK */
function getSelectedPage(platform) {
    if (platform == "facebook") {
        const fb = document.getElementById("facebook-pages");
        let fb_option = fb.options[fb.selectedIndex].value;
        console.log("Facebook Page: " + fb_option);
        return fb.options[fb.selectedIndex];
    } else if (platform === "tumblr") {
        const tum = document.getElementById("tumblr-pages");
        let tumblr_option = tum.options[tum.selectedIndex].value;
        console.log("Facebook Page: " + tumblr_option);
        return tum.options[tum.selectedIndex];
    } else if (platform === "linkedin") {
        const link = document.getElementById("linkedin-pages");
        let linked_option = link.options[link.selectedIndex].value;
        console.log("Facebook Page: " + linked_option);
        return link.options[link.selectedIndex];
    }

}

function post_Twitter() {
    const invocation = new XMLHttpRequest();
    const url = "https://sma-a4.herokuapp.com/";
    const nume_platforma = "twitter/"
    const actiune = "post"

    var id = sessionStorage.getItem("id_user");
    var message = document.getElementById("source").value;
    var image = document.getElementById("test_image").files[0];
    var urlLocal = getUrl();

    let fd = new FormData();

    fd.append('text', message);
    fd.append('files[]', document.getElementById("test_image").files[0]);
    fd.append('file_url[]', urlLocal);


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
        if (tempo == 4) {
            var responseLines = this.responseText.split("\n");
            console.log(responseLines[1]);

        } else
            tempo++;
        if (count == 0) {
            count = 1;

            this.open("POST", url + nume_platforma + actiune, true);
            this.send(fd);
        }
    };

    invocation.send(requestDataLogin);
}

function getUrl() {
    let urlRegEx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g
        //var target = document.getElementById("urlArea");
    var source = document.getElementById("source").value;
    var word = source.split(' ');
    for (var i = 0; i < word.length; i++) {
        //console.log(word[i]);
        //console.log(word[i].match(urlRegEx));
        if (word[i].match(urlRegEx)) {
            console.log(word[i]);
            return word[i];
        }
    }
    source.replace(urlRegEx, "<a href='$1'>$1</a>");
}

function post_Linkedin() {
    const invocation = new XMLHttpRequest();
    const url = "https://sma-a4.herokuapp.com/";
    const nume_platforma = "linkedin/";
    const actiune = "post";

    var id = sessionStorage.getItem("id_user");
    var message = document.getElementById("source").value;
    var image = document.getElementById("test_image").files[0];
    var urlLocal = getUrl();

    let fd = new FormData();

    fd.append('text', message);
    fd.append('files[]', document.getElementById("test_image").files[0]);
    fd.append('file_url[]', urlLocal);


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
        if (tempo == 4) {
            var responseLines = this.responseText.split("\n");
            console.log(responseLines[1]);

        } else
            tempo++;
        if (count == 0) {
            count = 1;

            this.open("POST", url + nume_platforma + actiune, true);
            this.send(fd);
        }
    };

    invocation.send(requestDataLogin);
}

function post_Tumblr() {
    const invocation = new XMLHttpRequest();
    const url = "https://sma-a4.herokuapp.com/";
    const nume_platforma = "tumblr/"
    const actiune = "post"

    var id = sessionStorage.getItem("id_user");
    var message = document.getElementById("source").value;
    var image = document.getElementById("test_image").files[0];
    var urlLocal = getUrl();

    let fd = new FormData();

    fd.append('text', message);
    fd.append('files[]', document.getElementById("test_image").files[0]);
    fd.append('file_url[]', urlLocal);


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
        if (tempo == 4) {
            var responseLines = this.responseText.split("\n");
            console.log(responseLines[1]);

        } else
            tempo++;
        if (count == 0) {
            count = 1;

            this.open("POST", url + nume_platforma + actiune, true);
            this.send(fd);
        }
    };

    invocation.send(requestDataLogin);
}


/*-------------------------------------------------------------------------------------------*/
// POSTARE IMAGINI FB-FLICKR



function postImage_Flickr() {
    /*Post to Imgur*/
    var image_url;
    img_url = 'https://api.imgur.com/3/image';

    var image = document.getElementById("test_image").files[0];
    let fd = new FormData();
    fd.append('image', image);

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', img_url);
    xhr.setRequestHeader('Authorization', 'Client-ID a8a4a5ed7327935');
    xhr.onload = function() {
        var response = xhr.response;
        if (response.success) {
            console.log(response.data);
            image_url = response.data.link;
            /*al doilea request*/
            var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/DPZ/REST.php?do=PostImage&";
            var jwt = sessionStorage.getItem("token");
            var message = document.getElementById("source").value;
            var requestedData = `${url}image=${image_url}&token=${jwt}&message=${message}&image=${image_url}&submit=PostImage`;
            console.log(requestedData);

            var displayed = 0;
            if (window.XMLHttpRequest) {
                xhttpLocal = new XMLHttpRequest()
            } else {
                xhttpLocal = new ActiveXObject('Microsoft.XMLHTTP')
            };
            xhttpLocal.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(xhttpLocal.response, this.status)
                } else
                if (this.status == 404) {
                    if (displayed == 0) {
                        alert('Could not post message');
                        location.reload()
                        displayed++
                    }
                }
            }
            xhttpLocal.open('GET', requestedData, true);
            xhttpLocal.send(null);
            /*al doilea request end  */
        } else {
            console.log('not successful');
        }
    }
    xhr.send(fd);
}

function postImage_fb() {
    /*Post to Imgur*/
    var image_url;
    img_url = 'https://api.imgur.com/3/image';

    var image = document.getElementById("test_image").files[0];
    let fd = new FormData();
    fd.append('image', image);

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', img_url);
    xhr.setRequestHeader('Authorization', 'Client-ID a8a4a5ed7327935');
    xhr.onload = function() {
        var response = xhr.response;
        if (response.success) {
            console.log(response.data);
            image_url = response.data.link;
            /*al doilea request*/
            var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=PostImage&";
            var jwt = sessionStorage.getItem("token");
            var message = document.getElementById("source").value;
            var requestedData = `${url}image=${image_url}&mesaj=${message}&token=${jwt}&submit=Image`;
            console.log(requestedData);

            var displayed = 0;
            if (window.XMLHttpRequest) {
                xhttpLocal = new XMLHttpRequest()
            } else {
                xhttpLocal = new ActiveXObject('Microsoft.XMLHTTP')
            };
            xhttpLocal.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(xhttpLocal.response, this.status)
                } else
                if (this.status == 404) {
                    if (displayed == 0) {
                        alert('Could not post message');
                        location.reload()
                        displayed++
                    }
                }
            }
            xhttpLocal.open('GET', requestedData, true);
            xhttpLocal.send(null);
            /*al doilea request end  */
        } else {
            console.log('not successful');
        }
    }
    xhr.send(fd);

    /*Post to imgur end */
}

/*---------------------------------------------------------------------------------------*/
// POSTARE URL + TEXT

function postURL_fb() {
    var urlLocal = getUrl();
    console.log(urlLocal);
    var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?submit=Url&do=PostUrl&jwt=" + sessionStorage.getItem("token") + "&url=" + urlLocal + "&mesaj=" + document.getElementById("source").value;
    console.log(document.getElementById("source").value);
    console.log(url);

    var displayed = 0
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest()
    } else {
        xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    };
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // url found
            console.log(xhttp.response, this.status)
        } else
        if (this.status == 404) { // url not found
            if (displayed == 0) {
                alert('The url does not exist')
                location.reload()
                displayed++
            }
        }
    }
    xhttp.open('GET', url, true);
    xhttp.send(null);
}