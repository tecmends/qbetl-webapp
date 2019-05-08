$(document).ready(function (e) {


    function to_json(workbook) {

        var result = {};
        workbook.SheetNames.forEach(function (sheetName) {
            var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if (roa.length > 0) {
                //result[sheetName] = roa;
                result = roa;
            }
        });
        return result;
    }

    function handleFile(e) {

        //alert('Calling...');
        var files = e.target.files;
        var i, f;
        for (i = 0, f = files[i]; i != files.length; ++i) {
            var reader = new FileReader();
            var name = f.name;
            reader.onload = function (e) {
                try {
                    var authorization = 'Token ' + Cookies.get('token');
                    var data = $.trim(e.target.result);
                    if (name.split(".").pop() == "xlsx" || name.split(".").pop() == "xls") {
                        var workbook = XLSX.read(data, {
                            type: 'binary'
                        });
                        var jsondata = vkbeautify.json(to_json(workbook), 4);
                        alert(jsondata);
                        debugger;
                        $.ajax({
                            type: "POST",
                            //url: 'https://qbetldev.zemesoft.com/qbetl/api/invoice/',
                            url: 'https://qb.tecmend.in/qbetl/api/post/invoicelegacy',
                            data: jsondata,
                            cache: false,
                            contentType: "application/json",
                            processData: false,
                            beforeSend: function (xhr) { xhr.setRequestHeader('authorization', authorization); },
                            success: function (data) {
                                alert(data);
                                debugger;
                            }
                        });
                    }
                    else if (name.split(".").pop() == "csv") {
                        debugger;
                        var jsondata = vkbeautify.json(CSV2JSON(data), 4);
                        alert(jsondata);
                        //var jsondata1 = JSON.parse(eval("[" + jsondata + "]"));
                        
                        //var testjson = jQuery.parseJSON("[" + jsondata + "]");
                        $.ajax({
                            //url: 'https://qbetldev.zemesoft.com/qbetl/api/invoice/',
                            url: 'https://qb.tecmend.in/qbetl/api/post/invoicelegacy',
                            type: 'POST',
                            data: jsondata,
                            cache: false,
                            contentType: "application/json",
                            processData: false,
                            beforeSend: function (xhr) { xhr.setRequestHeader('authorization', authorization); },
                            success: function (data) {
                                alert(data);
                                debugger;
                            }
                        });
                    } else {
                    }

                } catch (e) {

                }
            };
            reader.readAsBinaryString(f);
        }
    }

    $('input[type = file]').change(function (e) {
        e.preventDefault();
        //editorAce1.setValue("Please wait while loading your file.");
        handleFile(e);
    });


});