// MoreDetials Form

function loadMoreDetails(authorization) {
    $.ajax({
        //url: "https://qbetldev.zemesoft.com/qbetl/qbetl/api/csv/list/",
        url: "https://qb.tecmend.in/qbetl/api/csv/",
        data: { authorization: authorization },
        type: "GET",
        datatype: "jsonp",
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', authorization); },
        success: function (responce1) {

            //alert('Success!' + responce.length);
            var responce = [];
            if (responce1.length > 0) {
                var tr;
                var j = 0;
                if (Cookies.get('obj') == "A") {
                    responce = responce1;
                }
                else if (Cookies.get('obj') == null) {
                    responce = responce1;
                }
                else {
                    responce = jQuery.grep(responce1, function (status, i) {
                        return status.status == Cookies.get('obj');
                    });
                }
                if (responce.length > 0) {
                    for (var i = 0; i < responce.length; i++) {
                        //tr = $('<tr/>');
                        var status = "";
                        j = j + 1;
                        tr = $('<tr class=cls' + j + '>');

                        tr.append("<td style='border: 1px solid #e6e6e6;' id=clsmain" + j + "  onclick='hideandshow(" + j + ",0," + responce[i].batch_id + ")'>" + "<a style='cursor: pointer;'>+</a> " + responce[i].batch_id + "</td>");
                        if (responce[i].batch_type == "CSV") {
                            tr.append("<td style='border: 1px solid #e6e6e6;'><a href='" + "https://qbetldev.zemesoft.com/" + responce[i].csv_path + "' target=blank>" + responce[i].csv_path.split('/').pop() + "</a></td>");
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
                }
                else {
                    var tr;
                    //tr = $('<tr>');
                    tr = $('<tr>');
                    tr.append("<td collspan='4' style='color: red;'>No Invoice</td>");
                    tr.append("</tr>");
                    $('tr').after(tr);
                }
                //$("#moreDetails").show();
            }
            else {
                var tr;
                //tr = $('<tr>');
                tr = $('<tr>');
                tr.append("<td collspan='4' style='color: red;'>No Invoice</td>");
                tr.append("</tr>");
                $('tr').after(tr);
                //$('#tbl').append(tr);
                //$("#moreDetails").hide();
            }

        }
    });
}