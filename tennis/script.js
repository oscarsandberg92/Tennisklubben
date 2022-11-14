// Get all the id's from index.html
var closeoverlay = document.getElementById("closeoverlay");
var confirmreg = document.getElementById("confirmreg");
var confirmlogin = document.getElementById("confirmlogin");
var loginbox =document.getElementById("loginbox");
var loginbtn = document.getElementById("loginbtn");
var menu = document.getElementById("menu");
var menubtn = document.getElementById("menubtn");
var navbar = document.getElementById("navbar");
var overlay = document.getElementById("login");
var regbox =document.getElementById("regbox");
var regbtn = document.getElementById("regbtn");



            
navbar.style.right = "-250px";

menubtn.onclick = function() {
    //If menu is closed and screen width <= 670, open menu as fullscreen
    if (navbar.style.right == "-250px" && window.innerWidth <= 670){
        navbar.style.right = "0";
        navbar.style.width = "100%";
        navbar.style.textAlign = "center";
        menu.src = "resources/images/close.png";
    }
    //If menu is closed and screen width is not below the threshold (670px)
    else if (navbar.style.right == "-250px"){
        navbar.style.right = "0";      
        navbar.style.textAlign = "left";              
        menu.src = "resources/images/close.png";
    }
    //If menu is open and screen width <= 670px
    else if (navbar.style.right == "0px" && window.innerWidth <= 670){
        navbar.style.right = "-250px";
        navbar.style.width = "250px";
        navbar.style.textAlign = "left";
        menu.src = "resources/images/menu.png";
    }
    //If menu is open and screen width is not below the threshold (670px)
    else {
        navbar.style.right = "-250px";
        navbar.style.width = "250px";
        menu.src = "resources/images/menu.png"
    }
}


//Open loginwindow
loginbtn.onclick = function(){
                
    overlay.style.display = "block";
    navbar.style.right = "-250px";
    navbar.style.width = "250px";
    menu.src = "resources/images/menu.png";
    loginbox.style.display = "block";

    }

closeoverlay.onclick = function(){
    overlay.style.display = "none";
    loginbox.style.display = "none"
    regbox.style.display = "none";
    }

confirmlogin.onclick = function(){
    overlay.style.display = "none";
    loginbox.style.display = "none"
    }

regbtn.onclick = function(){
    loginbox.style.display = "none";
    regbox.style.display = "block";
    }

confirmreg.onclick = function(){
                
    loginbox.style.display = "block";
    regbox.style.display = "none";
    }



