// Dashboard

function loadDashboard(authorization) {
    $.ajax({
        url: "https://qb.tecmend.in/qbetl/api/dashboard/",
        data: { authorization: authorization },
        type: "GET",
        datatype: "jsonp",
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', authorization); },
        success: function (responce) {
            //alert('Dashboard Success!' + responce.invoice_warnings);
            $("#success").html(responce.invoice_success);
            $("#warnings").html(responce.invoice_warnings);
            $("#failed").html(responce.invoice_failed);
            var total = responce.invoice_success + responce.invoice_warnings + responce.invoice_failed;
            //alert(total);
            $("#total").html(total);
        }
    });
}

function Details(obj) {
    //alert('Calling...' + obj);
    Cookies.set('obj', obj);
    var pathname = window.location.href; // Returns full URL
    var pathname = pathname.substring(0, pathname.lastIndexOf("/") + 1);
    window.location.href = pathname + "moreinvdetails.html";
}

