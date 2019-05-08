// mapping Fields

function mappingFileds(authorization) {
    $.ajax({
        url: "https://qb.tecmend.in/qbetl/api/fieldmapping/",
        data: { authorization: authorization },
        type: "GET",
        datatype: "jsonp",
        beforeSend: function (xhr) { xhr.setRequestHeader('authorization', authorization); },
        success: function (responce) {
            var j = 0;
            for (var i = 0; i < responce["0"].mapping.mapping.length; i++) {
                j = j + 1;
                tr = $('<tr class=cls' + j + '>');
                tr.append("<td>" + responce[0].mapping.mapping[i].QBField.code + "</td>");
                tr.append("<td>" + responce[0].mapping.mapping[i].SourceField.fieldXPath + "</td>");
                tr.append("</tr>");
                $('tr.cls' + i).after(tr);
            }
        }
    });
}