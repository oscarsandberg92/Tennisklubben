// Get all the id's from index.html
var closeoverlay = document.getElementsByClassName("closeoverlay");
var closelogin = document.getElementById('closelogin');
var closereg = document.getElementById('closereg')
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

let isLoggedIn = false;
let loggedInUser; 

if(!isLoggedIn)menuMyBookings.style.visibility = 'hidden';


navbar.style.right = "-250px";

// Opens or closes the navbar.
function handleNavbar(){
    
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

function loginButton(){
    clearList();
    if (isLoggedIn) {
        logout();
    }
    else {
        overlay.style.display = "block";
        // navbar.style.right = "-250px";
        // navbar.style.width = "250px";
        menu.src = "resources/images/close.png";
        loginbox.style.display = "block";
    }             
    
}

function openRegForm(){
    loginbox.style.display = "none";
    regbox.style.display = "block";
}

function logout(){
    alert(loggedInUser.username + ' är nu utloggad.');
    isLoggedIn = false;
    loggedInUser = null;
    loginbtn.innerHTML = 'Logga in';
    loginstatus.innerHTML = 'Ej inloggad';
    menuMyBookings.style.visibility = 'hidden';
    
    hideAll();
    start.style.display = 'block';
    handleNavbar();
}


//-------Classes------------

// The User class
class User{
    constructor(username, fname, lname, email, password){
                this.username = username;
                this.fname = fname;
                this.lname = lname;
                this.email = email;
                this.password = password;
                
            }   
            ownBookings = [];
            checkPassword(passwordToCheck){
                return this.password === passwordToCheck;
            }
}

// Array to store all Users.
let userArray= []





