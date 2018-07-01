// $('.message a').click(function(){
//    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
// });

function showRegForm(){
    document.getElementById("register-form").style.display = 'block';
    document.getElementById("login-form").style.display = 'none';
}

function showLoginForm(){
    document.getElementById("register-form").style.display = 'none';
    document.getElementById("login-form").style.display = 'block';
}