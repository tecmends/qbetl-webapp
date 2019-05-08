//upload Form

function doesConnectionExist() {
    var xhr = new XMLHttpRequest();
    var file = "https://www.kirupa.com/blank.png";
    var randomNum = Math.round(Math.random() * 10000);

    xhr.open('HEAD', file + "?rand=" + randomNum, true);
    xhr.send();

    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 304) {
                alert("connection exists!");
            } else {
                alert("connection doesn't exist!");
            }
        }
    }
}

function fileUpload(authorizationtoken, files) {
    var ext = "";
    var width = 0;
    var filescountwidth = 0;
    var totalwoidth = 100;
    var uploadkey = 0;
    //var authorizationtoken = 'Token ' + Cookies.get('token');
    var data = new FormData();
    //var files = $('[type="file"]').get(0).files;
    // Add the uploaded image content to the form data collection
    if (files.length > 0) {
        data.append("upload_file", files[0]);
        //var filesext = $('[type="file"]')[0].files[0]
        //ext = filesext.name.split('.').pop();

        for (var i = 0; i < files.length; i++) {
            var filesext = $('[type="file"]')[0].files[0]
            ext = filesext.name.split('.').pop();
            debugger;
            if (ext == "csv") {
                uploadkey = 1;
                filescountwidth = totalwoidth / files.length;
                width = width + filescountwidth;
                $.ajax({
                    type: "POST",
                    url: 'https://qb.tecmend.in/qbetl/api/csv/',
                    type: 'POST',
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    beforeSend: function (xhr) { xhr.setRequestHeader('authorization', authorizationtoken); },
                    success: function (data) {
                    }
                });
            }
            else {
                alert(filesext.name + ' is not a csv file. Please select csv file only..');
            }
            $("#divper").html('Upload Progress ' + width + '% Completed');
            sleep(1000);
            $("#divProgress").css('width', width + '%');
        }
        if (uploadkey == 1) {
            alert('Files Uploaded Successfully!');
        }
        else {
            $('input[type=file]').clear;
        }
        //$('[type="file"]').val("");
        //LoadList();
        location.reload();
    }
    $('input[type=file]').clear;
    $("#divProgress").css('width', width + '%');
}