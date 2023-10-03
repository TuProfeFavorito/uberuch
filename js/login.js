//login
const $phone = $("#phone");
const $password = $("#password");
const urlMain = "http://dev.desarrolloweb.com";
const ajaxUrl = urlMain+"/json";
$("#submitForm").on("click", function(e) {
    e.preventDefault();
    if ($phone.val() == '') {
        alert("Ingrese su correo");
    }
    if ($password.val() == '') {
        alert("Ingrese su password");
    }
    /*
        post = envia datos en la cabecera
        get = envia datos en la URL
        https protocolo
            --> POST = CREATE
            --> GET = READ
            --> PUT = UPDATE
            --> DELETE = DELETE
        CRUD <-- 
    */
    $.ajax({
        type: "post",
        dataType: "json",
        url: ajaxUrl+'/login.json?v1',
        //url: "https://desarrolloweb.free.beeceptor.com/login",
        data: {
            phone : $phone.val(),
            $password : $password.val()
        },
        beforeSend: function() {
            $("#submitForm").addClass("loading");
        },
        success: function(response) {
            $("#submitForm").removeClass("loading");
            localStorage.setItem("token", response.token);
            if (response.userType == 1) {
                window.location.href = urlMain+"/dashboard_taxista.html";    
            }
            if (response.userType == 2) {
                window.location.href = urlMain+"/dashboard_user.html";
            }
        },
        error: function(error) {
            alert("Me equivoque");
        }
    });   
   
});

