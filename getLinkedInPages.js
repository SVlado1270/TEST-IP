window.onload = getLinkedInTumblrPages();

function getLinkedInTumblrPages() {
    const invocation = new XMLHttpRequest();
    const url = "https://sma-a4.herokuapp.com/";
    const nume_platforma = "linkedin/"
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
                elem = resp.pages[0];
                appendLinkedInList(elem, resp.pages_names[elem]);
            }
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

function appendLinkedInList(pageId, pageName) {
    const selectList = document.getElementById("linkedin-pages");
    var option = document.createElement("option");
    option.value = pageId;
    option.text = pageName;
    selectList.appendChild(option);
}