//Customers Form

function getCustomers(authorization) {
    $.ajax({
        url: "https://qb.tecmend.in/qbetl/api/customers",
        data: { authorization: authorization },
        type: "GET",
        datatype: "jsonp",
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', authorization); },
        success: function (responce) {
            //responce.reverse();
            var j = 0;
            for (var i = 0; i < responce.length; i++) {
                j = j + 1;
                tr = $('<tr class=cls' + j + '>');
                tr.append("<td style='border: 1px #e6e6e6 solid; width: 100px; padding-left: 10px;'>" + responce[i].customer_no + "</td>");
                tr.append("<td style='border: 1px #e6e6e6 solid; padding-left: 10px;'>" + responce[i].customer_name + "</td>");

                tr.append("</tr>");
                $('tr.cls' + i).after(tr);
            }
        }
    });
}