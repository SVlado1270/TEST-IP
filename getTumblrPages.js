window.onload = getTumblrPages();

function getTumblrPages() {
    const invocation = new XMLHttpRequest();
    const url = "https://sma-a4.herokuapp.com/";
    const nume_platforma = "tumblr/"
    const actiune = "profile"

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
            for (i = 0; i < resp.pages.length; i++) {
                array.push(resp.pages[i]);
                appendTumblrList(resp.pages[i]);
            }
            sessionStorage.setItem("TumblrPages", JSON.stringify(array));

        } else
            tempo++;
        if (count == 0) {
            count = 1;
            this.open("GET", url + nume_platforma + actiune, true);
            this.send();
        }
    };

    invocation.send(requestDataLogin);

}

function appendTumblrList(pageName) {
    const selectList = document.getElementById("tumblr-pages");
    var option = document.createElement("option");
    option.value = pageName;
    option.text = pageName;
    selectList.appendChild(option);
}