function set_time() {
    var select = document.getElementById('select_time');
    var option = select.options[select.selectedIndex].value;
    // option = 1 -> daily
    // option = 2 -> weekly
    // option = 3 -> monthly
    // console.log(option);

    if (option == 1) {

        var x = getToday();
        var y = getTomorrow();
        //var x = getYesterday();
        //var y = getToday();
        sessionStorage.setItem('date_begin', dateTo_timestamp(x));
        sessionStorage.setItem('date_end', dateTo_timestamp(y));
    }

    if (option == 2) {

        var x = getLastWeek_interval();
        var y = getToday();
        sessionStorage.setItem('date_begin', dateTo_timestamp(x));
        sessionStorage.setItem('date_end', dateTo_timestamp(y));
    }

    if (option == 3) {
        var x = getLastMonth_interval();
        var y = getToday();
        sessionStorage.setItem('date_begin', dateTo_timestamp(x));
        sessionStorage.setItem('date_end', dateTo_timestamp(y));
    }

    var p = sessionStorage.getItem('date_begin');
    sessionStorage.setItem('date_begin', correct_timestamp(p));
    p = sessionStorage.getItem('date_end');
    sessionStorage.setItem('date_end',correct_timestamp(p));

    
    console.log(sessionStorage.getItem('date_begin'));
    console.log(sessionStorage.getItem('date_end'));

}

function getLastWeek() {
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return lastWeek;
}

function getLastMonth() {
    var today = new Date();
    var lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    return lastMonth;
}

function getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;

    return today;
}

function getTomorrow() {
    var today = new Date();
    var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
    var month = tomorrow.getMonth() + 1;
    var week = tomorrow.getDate();
    var year = tomorrow.getFullYear();
    //var lastWeekDisplay = lastWeekMonth + "/" + lastWeekDay + "/" + lastWeekYear;
    var result = ("00" + week.toString()).slice(-2) + "-" + ("00" + month.toString()).slice(-2) + "-" + ("0000" + year.toString()).slice(-4);

    return result;
}

function getYesterday() {
    var today = new Date();
    var tomorrow = new Date(today.getTime() - (24 * 60 * 60 * 1000));
    var month = tomorrow.getMonth() + 1;
    var week = tomorrow.getDate();
    var year = tomorrow.getFullYear();
    //var lastWeekDisplay = lastWeekMonth + "/" + lastWeekDay + "/" + lastWeekYear;
    var result = ("00" + week.toString()).slice(-2) + "-" + ("00" + month.toString()).slice(-2) + "-" + ("0000" + year.toString()).slice(-4);

    return result;
}

function getLastWeek_interval() {
    var lastWeek = getLastWeek();
    var lastWeekMonth = lastWeek.getMonth() + 1;
    var lastWeekDay = lastWeek.getDate();
    var lastWeekYear = lastWeek.getFullYear();
    //var lastWeekDisplay = lastWeekMonth + "/" + lastWeekDay + "/" + lastWeekYear;
    var lastWeekDisplay = ("00" + lastWeekDay.toString()).slice(-2) + "-" + ("00" + lastWeekMonth.toString()).slice(-2) + "-" + ("0000" + lastWeekYear.toString()).slice(-4);

    //var result = getToday() + ' - ' + lastWeekDisplay;
    var result = lastWeekDisplay
    return result;
}

function getLastMonth_interval() {
    var lastMonth = getLastMonth();
    var lastWeekMonth = lastMonth.getMonth() + 1;
    var lastMonthDay = lastMonth.getDate();
    var lastMonthYear = lastMonth.getFullYear();
    //var lastWeekDisplay = lastWeekMonth + "/" + lastWeekDay + "/" + lastWeekYear;
    var lastMonthDisplay = ("00" + lastMonthDay.toString()).slice(-2) + "-" + ("00" + lastWeekMonth.toString()).slice(-2) + "-" + ("0000" + lastMonthYear.toString()).slice(-4);

    //var result = getToday() + ' - ' + lastMonthDisplay;
    var result = lastMonthDisplay
    return result;
}

// dd-mm-yyyy -> time stamp

function dateTo_timestamp(myDate) {
    myDate = myDate.split("-");
    //var newDate = myDate[1] + "," + myDate[0] + "," + myDate[2];

    //console.log(new Date(newDate).getTime());
    // return (new Date(newDate).getTime());
    return (new Date(parseInt(myDate[2], 10), parseInt(myDate[1], 10) - 1, parseInt(myDate[0]), 10).getTime());
}

function correct_timestamp(x) {
    // JS pune 00 in loc de 0 si iese stamp-ul prea mare (lungimea trb sa fie 10)

    var result = "";
    for (var i = 0; i < x.length; i++)
        if (result.length < 10)
            result += x[i]
    return result;
}