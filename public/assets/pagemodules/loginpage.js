function login(){
    console.log("called")
    var form = $('#login_form');
    var formData = $(form).serialize();
    event.preventDefault();
    $.ajax({
        type: 'POST',
        url: "/login/authenticate",
        data: formData
    }).done(function(response) {
        console.log(response);
        if(response.message=='loggedin'){
            window.location = "/dashboard";
        }else{
            alert(response.message);
            form[0].reset();
        }
    })
}
$(document).ready(function() {
    App.init();
    Demo.initThemePanel();
    // console.log(req.status);
});