window.onload = setDefault();

function setDefault() {
    //setLinkedInPages();
    setTumblrPages();
}

function setLinkedInPages() {
    const invocation = new XMLHttpRequest();
    const url = "https://sma-a4.herokuapp.com/";
    const nume_platforma = "linkedin/"
    const actiune = "default_page"

    let formData = new FormData();

    formData.append("default_page", "urn:li:organization:42812360");

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
            let array = [];
            var responseLines = this.responseText.split("\n");
            let resp = JSON.stringify(responseLines[1]);
            console.log("Set Default Page " + resp);
        } else
            tempo++;
        if (count == 0) {
            count = 1;
            this.open("PUT", url + nume_platforma + actiune, true);
            this.send(formData);
        }
    };

    invocation.send(requestDataLogin);

}

function setTumblrPages() {
    const invocation = new XMLHttpRequest();
    const url = "https://sma-a4.herokuapp.com/";
    const nume_platforma = "tumblr/"
    const actiune = "default_page"

    let formData = new FormData();

    formData.append("default_page", 'testip-sma4a.tumblr.com');

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
            let array = [];
            var responseLines = this.responseText.split("\n");
            let resp = JSON.parse(responseLines[1]);
            console.log("Set Default Page " + resp);
        } else
            tempo++;
        if (count == 0) {
            count = 1;
            this.open("PUT", url + nume_platforma + actiune, true);
            this.send(formData);
        }
    };

    invocation.send(requestDataLogin);

}