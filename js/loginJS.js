
//Login form

function userAuthentication(username, password) {
    //alert('Calling...');
    //$.post("https://qbetldev.zemesoft.com/qbetl/api-token-auth/",
    $.post("https://qb.tecmend.in/qbetl/api-token-auth/",
                    {
                        username: username,
                        password: password
                    })
                    .done(function (response) {
                        var token = response.token;
                        Cookies.set('token', token);
                        Cookies.set('username', username);
                        var pathname = window.location.href; // Returns full URL
                        pathname = pathname.replace('login.html', '');
                        window.location.href = pathname + "index.html";
                    })
                .fail(function (xhr, status, error) {
                    alert('Login failed please try again.');
                }
                , 'json');
}