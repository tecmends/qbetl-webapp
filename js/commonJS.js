function start() {
    $("#wait").css("display", "block");
}
function stop() {
    $("#wait").css("display", "none");
}
function getCookie() {
    if (Cookies.get('token') == null || Cookies.get('token') == undefined) {
        var pathname = window.location.href; // Returns full URL
        var pathname = pathname.substring(0, pathname.lastIndexOf("/") + 1);
        window.location.href = pathname + "login.html";
    }
    else {
        window.open("https://qb.tecmend.in/qbetl/connect/?token=" + Cookies.get('token'));
    }
}

function loginValidation(token) {
    //alert('Cookie =' + Cookies.get('token'));
    if (Cookies.get('token') == null || Cookies.get('token') == undefined) {
        var pathname = window.location.href; // Returns full URL
        var pathname = pathname.substring(0, pathname.lastIndexOf("/") + 1);
        window.location.href = pathname + "login.html";
    }
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function LoadList(authorization) {

    //alert('Calling..');
    $.ajax({
        //url: "https://qbetldev.zemesoft.com/qbetl/qbetl/api/csv/list/",
        url: "https://qb.tecmend.in/qbetl/api/csv/",
        data: { authorization: authorization },
        type: "GET",
        datatype: "jsonp",
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', authorization); },
        success: function (responce) {
            //alert('Success!' + responce.length);
            //debugger;
            if (responce.length > 0) {
                var tr;
                var status = '';
                var j = 0;
                for (var i = 0; i < responce.length; i++) {
                    //tr = $('<tr/>');
                    j = j + 1;
                    tr = $('<tr class=cls' + j + '>');

                    tr.append("<td style='border: 1px solid #e6e6e6;' id=clsmain" + j + "  onclick='hideandshow(" + j + ",0," + responce[i].batch_id + ")'>" + "<a style='cursor: pointer;'>+</a> " + responce[i].batch_id + "</td>");
                    if (responce[i].batch_type == "CSV") {
                        tr.append("<td style='border: 1px solid #e6e6e6;'><a href='" + responce[i].csv_path + "' target=blank>" + responce[i].csv_path.split('/').pop() + "</a></td>");
                    }
                    else {
                        tr.append("<td style='border: 1px solid #e6e6e6;'>" + responce[i].batch_type + "</a></td>");
                    }
                    tr.append("<td style='border: 1px solid #e6e6e6;'>" + formatDate(responce[i].created_at) + "</td>");
                    tr.append("<td style='border: 1px solid #e6e6e6;'>" + responce[i].counts.invoice_success + "</td>");
                    tr.append("<td style='border: 1px solid #e6e6e6;'>" + responce[i].counts.invoice_warnings + "</td>");
                    tr.append("<td style='border: 1px solid #e6e6e6;'>" + responce[i].counts.invoice_failed + "</td>");
                    if (responce[i].status == "F") {
                        status = "Failed";
                    }
                    else if (responce[i].status == "C") {
                        status = "Completed";
                    }
                    else if (responce[i].status == "R") {
                        status = "Running";
                    }
                    else if (responce[i].status == "S") {
                        status = "Success";
                    }
                    else {
                        status = "Warning";
                    }
                    tr.append("<td style='border: 1px solid #e6e6e6;'>" + status + "</td>");
                    tr.append("</tr>");
                    $('tr.cls' + i).after(tr);
                    //$('#tbl').append(tr);
                }
                $("#moreDetails").show();
            }
            else {
                var tr;
                //tr = $('<tr>');
                tr = $('<tr>');
                tr.append("<td collspan='4' style='color: red;'>No Invoice</td>");
                tr.append("</tr>");
                $('tr').after(tr);
                //$('#tbl').append(tr);
                $("#moreDetails").hide();
            }

        }
    });

}

function formatRowDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('/');
}

function hideandshow(j, k, batch_id) {
    //alert(j);
    if (k == "0") {
        //var json = [{ "User_Name": "John Doe", "score": "10", "team": "1" }, { "User_Name": "Jane Smith", "score": "15", "team": "2" }, { "User_Name": "Chuck Berry", "score": "12", "team": "2" }];
        var authorization = 'Token ' + Cookies.get('token');
        $.ajax({
            url: "https://qb.tecmend.in/qbetl/api/csvresult/?batchid=" + batch_id,
            //data: { authorization: authorization, batch_id: batch_id },
            type: "GET",
            datatype: "jsonp",
            beforeSend: function (xhr) { xhr.setRequestHeader('authorization', authorization, 'batch_id', batch_id); },
            success: function (responce) {
                //alert('Success!' + responce.length);
                //debugger;
                responce.reverse();
                if (responce.length > 0) {
                    var tr;
                    //var j = 0;

                    tr = $('<tr class=clschildheader' + j + ' style="background: #e6e6e6;">');
                    //tr.append("<td style='text-align: center;border: 1px solid #fff; width: 125px;'><b>ID<b/></td>");
                    tr.append("<td style='text-align: center;border: 1px solid #fff; width: 125px;'><b>Invoice #<b/></td>");
                    tr.append("<td style='text-align: center;border: 1px solid #fff; width: 250px;'><b>Customer Name<b/></td>");
                    tr.append("<td style='text-align: center;border: 1px solid #fff; width: 100px;'><b>Invoice Date<b/></td>");
                    tr.append("<td style='text-align: center;border: 1px solid #fff; width: 100px;'><b>Invoice Amount<b/></td>");
                    tr.append("<td style='text-align: center;border: 1px solid #fff; width: 100px;'><b>Balance<b/></td>");
                    tr.append("<td style='text-align: center;border: 1px solid #fff; width: 100px;'><b>Due Date<b/></td>");
                    tr.append("<td style='text-align: center;border: 1px solid #fff; width: 150px;'><b>Status<b/></td>");
                    tr.append("</tr>");
                    $('tr.cls' + j).after(tr);

                    for (var i = 0; i < responce.length; i++) {
                        //alert(responce[i].batch_id);
                        var tr;
                        var status = "";
                        tr = $('<tr class=clschild' + j + ' style="background: #e6e6e6;">');
                        //tr.append("<td style='text-align: center;padding-left: 10px;border: 1px solid #fff;'>" + responce[i].batch_id + "</td>");
                        tr.append("<td style='padding-left: 10px;border: 1px solid #fff;'>" + responce[i].invoice_id + "</td>");
                        tr.append("<td style='padding-left: 10px;border: 1px solid #fff;'>" + responce[i].customer_name + "</td>");
                        tr.append("<td style='text-align: right;padding-right: 10px;border: 1px solid #fff;'>" + formatRowDate(responce[i].created_at) + "</td>");
                        //tr.append("<td style='text-align: right;padding-right: 10px;border: 1px solid #fff;'>$ 0.00</td>");
                        tr.append("<td style='text-align: right;padding-right: 10px;border: 1px solid #fff;'>" +"$ "+" "+ parseFloat(responce[i].total_amount).toFixed(2) + "</td>");
                        tr.append("<td style='text-align: right;padding-right: 10px;border: 1px solid #fff;'>$ 0.00</td>");
                        tr.append("<td style='text-align: right;padding-right: 10px;border: 1px solid #fff;'>" + formatRowDate(responce[i].created_at) + "</td>");

                        if (responce[i].status == "F") {
                            status = "Failed";
                        }
                        else if (responce[i].status == "C") {
                            status = "Completed";
                        }
                        else if (responce[i].status == "R") {
                            status = "Running";
                        }
                        else if (responce[i].status == "S") {
                            status = "Success";
                        }
                        else {
                            status = "Warning";
                        }

                        tr.append("<td style='text-align: center;border: 1px solid #fff;'>" + status + "</td>");
                        tr.append("</tr>");
                        //$('tr.cls' + j).after(tr);
                        $('tr.clschildheader' + j).after(tr);
                    }
                }
                else {
                    alert('No Invoice');
                }
            }
        });


        $("tr td#clsmain" + j).removeAttr("onclick");
        $("td#clsmain" + j).attr("onclick", "hideandshow(" + j + ",1," + batch_id + ")");
    }
    else {
        $('tr.clschild' + j).remove();
        $('tr.clschildheader' + j).remove();
        $("tr td#clsmain" + j).removeAttr("onclick");
        $("td#clsmain" + j).attr("onclick", "hideandshow(" + j + ",0," + batch_id + ")");
    }

}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('/');
}

function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}