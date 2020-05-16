window.onload = getPages();

function getPages() {
    var xhttp;
    var url = "http://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=getPages&jwt=" + sessionStorage.getItem("token");

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest()
    } else {
        xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    };


    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let pageId = [];
            var obj = JSON.parse(xhttp.responseText);
            for (i = 0; i < obj.PAGE_IDS.length; i++) {
                pageId.push(obj.PAGE_IDS[i]);
            }
            sessionStorage.setItem('facebookPageId', JSON.stringify(pageId));
            getPagesName();
        }
    }
    xhttp.open('GET', url, true);
    xhttp.send(null);

}

function getPagesName() {
    var storedArray = JSON.parse(sessionStorage.getItem("facebookPageId"));
    var i;
    for (i = 0; i < storedArray.length; i++) {
        var xhttp;
        var url = "https://web-rfnl5hmkocvsi.azurewebsites.net/FBFINAL/REST.php?do=getPageName&jwt=" + sessionStorage.getItem("token") + "&paginaId" + storedArray[i];
        if (window.XMLHttpRequest) {
            xhttp = new XMLHttpRequest()
            xhttp.variabila = storedArray[i]; //vv bad practice
        } else {
            xhttp = new ActiveXObject('Microsoft.XMLHTTP')
        };


        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var obj = JSON.parse(xhttp.responseText);
                appendSelect(xhttp.variabila, obj.NAME);
            }
        }
        xhttp.open('GET', url, true);
        xhttp.send(null);
    }

}


function appendSelect(index, pageName) {
    const selectList = document.getElementById("facebook-pages");
    var option = document.createElement("option");
    option.value = index;
    option.text = pageName;
    selectList.appendChild(option);
}