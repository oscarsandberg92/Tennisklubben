// Get all the id's from index.html
//#region 
// Login page
const loginbox = document.getElementById("loginbox");
const loginform = document.getElementById('loginform');
const loginstatus = document.getElementById('loginstatus');
const uname = document.getElementById('uname');
const pword = document.getElementById('pword');
// ----------------------------------------------------
// Registration
const checkpword = document.getElementById('checkpword');
const email = document.getElementById('email');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const password = document.getElementById('password');
const regbox = document.getElementById("regbox");
const regform = document.getElementById('regform');
const username = document.getElementById('username');
// ----------------------------------------------------
// Content 
const booking = document.getElementById('booking');
const contact = document.getElementById('contact');
const court = document.getElementById('court');
const courts = document.getElementById('courts');
const courtInfo = document.getElementById('courtInfo');
const courtpictures = document.getElementById('courtpictures');
const date = document.getElementById('date');
const facilities = document.getElementById('facilities');
const facilitiesInfo = document.getElementById('facilitiesInfo');
const facilitiesPictures = document.getElementById('facilitiesPictures');
const myBookings = document.getElementById('myBookings');
const myBookingsList = document.getElementById('myBookingsList');
const timeContainer = document.getElementById('timeContainer');
const timelist = document.getElementsByClassName('bookBtn');
const start = document.getElementById('start');
const showTimes = document.getElementById('showTimes');

// -----------------------------------------------------
// Navbar
const bannerText = document.getElementById('banner-text');
const loginbtn = document.getElementById("loginbtn");
const menu = document.getElementById("menu");
const menuBooking = document.getElementById('menuBooking');
const menubtn = document.getElementById("menubtn");
const menuCourts = document.getElementById('menuCourts');
const menuFacilities = document.getElementById('menuFacilities');
const menuContact = document.getElementById('menuContact');
const menuMyBookings = document.getElementById('menuMyBookings');
const navbar = document.getElementById("navbar");
// ----------------------------------------------------
const overlay = document.getElementById("overlay"); // The overlay div
//#endregion

// ----------Variables-----------
//#region 

// Make sure bookings can't be made for dates that have already passed and also that the user cannot make bookings
// longer than 1 year ahead
let today = new Date();
date.min = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
date.max = (today.getFullYear() + 1) + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

let courtIndex = 0;
let facIndex = 0;
let isLoggedIn = false;
let loggedInUser;

// Available times that can be booked
const timeArray = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
];

navbar.style.right = "-250px"; //Without this line the menu button needs to be pressed 2x before the menu opens.
if (!isLoggedIn) menuMyBookings.style.visibility = 'hidden'; // Makes sure that myBookings are not shown no user is signed in.
//#endregion

// ----------Functions-----------
//#region 

function checkIfEmailExists(userArray, value) {
    const user = userArray.findIndex(function (u) {
        return u.email === value;
    })
    return user !== -1;
}

function checkIfEmpty(input) {
    return input === '';
}

function checkIfNameExists(userArray, value) {
    const user = userArray.findIndex(function (u) {
        return u.username === value;
    })
    return user !== -1;

}

function clearInputs() {
    let inputs = document.querySelectorAll('input');
    inputs = inputs.forEach(function (input) {
        input.value = '';
    })
}

// Clears the container displaying the available times.
function clearList() {
    timeContainer.replaceChildren('');
}

function clearMyBookings() {
    myBookingsList.replaceChildren('');
}

// Closes the login form and the overlay
function closeLogin() {
    overlay.style.display = "none";
    loginbox.style.display = "none";
    clearInputs();
}

// Close the myBookings box
function closeMybookings() {
    overlay.style.display = "none";
    myBookings.style.display = "none";
    clearMyBookings();
}

// Closes the registration form and returns to login form
function closeRegBox() {
    regbox.style.display = 'none';
    loginbox.style.display = 'block';
    clearInputs();
}

// Creates and saves a new Booking object
function createBooking(book) {
    // This if statement is needed to make sure that the user don't 
    if (!date.value) {
        alert('Välj ett datum.');
    }
    else if (!court.value) alert('Välj en bana. (1-4)')
    else if (!isLoggedIn) {
        alert('Du måste vara inloggad för att kunna boka');
    }
    else if (isBooked(date.value, book.innerText, court.value)) alert('Denna bokning är inte tillgänglig.\nÄndrade du datum/bana utan att uppdatera listan?');

    else {
        const newBooking = new Booking(date.value, book.innerText, court.value, loggedInUser.username);
        bookingArray.push(newBooking);
        loggedInUser.ownBookings.push(newBooking);

        // Notify the user that the booking is created.
        alert('Tack för din bokning ' + loggedInUser.fname + '!' +
            '\n-------------------------------------------' +
            '\nDu har bokat bana ' + court.value + ' i 60 min.' +
            '\nDatum: ' + date.value +
            '\nKlockan: ' + book.innerText);

        clearList();
    }
}

// Opens or closes the navbar.
function handleNavbar() {

    if (navbar.style.right == "-250px" && window.innerWidth <= 670) {
        navbar.style.right = "0";
        navbar.style.width = "100%";
        navbar.style.textAlign = "center";
        menu.src = "resources/images/close.png";
    }
    //If menu is closed and screen width is not below the threshold (670px)
    else if (navbar.style.right == "-250px") {
        navbar.style.right = "0";
        navbar.style.textAlign = "left";
        menu.src = "resources/images/close.png";
    }
    //If menu is open and screen width <= 670px
    else if (navbar.style.right == "0px" && window.innerWidth <= 670) {
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

//Hides all "content" divs 
function hideAll() {    
    start.style.display = 'none';
    booking.style.display = 'none';
    courts.style.display = 'none';
    facilities.style.display = 'none';
    contact.style.display = 'none';
}

// Check if there already is a Booking with the same date/time/court.
function isBooked(date, time, court,) {
    let exists = false;
    let filteredArray = bookingArray.forEach(function (booking) {
        if (booking.date === date) {
            if (booking.time === time) {
                if (booking.court === court) {
                    exists = true;
                }
            }
        }
    });
    return exists;
}

// Creates a HTML card for each of the logged in user's bookings
function listBookings() {
    let totalPrice = 0;
    // If no bookings are made yet, we let the user know that
    if (loggedInUser.ownBookings.length === 0) {
        const noBookings = document.createElement('p');
        noBookings.innerText = 'Du har för tillfället inga bokningar';
        myBookingsList.appendChild(noBookings);
    }
    // Otherwise, create a card for each of the bookings.
    else {
        const bookings = loggedInUser.ownBookings.forEach(function (booking) {
            // Adds date to the card
            const bookingDate = document.createElement('p');
            bookingDate.innerText = 'Datum: ' + booking.date;
            myBookingsList.appendChild(bookingDate);

            // Adds time to the card
            const bookingTime = document.createElement('p');
            bookingTime.innerText = 'Tid: ' + booking.time;
            myBookingsList.appendChild(bookingTime);

            // Adds court to the card
            const bookingCourt = document.createElement('p');
            bookingCourt.innerText = 'Bana: ' + booking.court;
            myBookingsList.appendChild(bookingCourt);

            // Adds price to the card
            const bookingPrice = document.createElement('p');
            bookingPrice.innerText = 'Pris: ' + booking.price;
            myBookingsList.appendChild(bookingPrice);

            myBookingsList.appendChild(document.createElement('hr'));
            totalPrice += parseInt(booking.price);
        });
    }

    const showTotalPrice = document.createElement('small');
    showTotalPrice.innerText = 'Du har bokat tennis för totalt: ' + totalPrice + 'kr.';
    if (loggedInUser.ownBookings.length > 0) myBookingsList.appendChild(showTotalPrice);
}

function loginButton() {
    clearList();
    if (isLoggedIn) {
        logout();
    }
    else {
        overlay.style.display = "block";
        menu.src = "resources/images/close.png";
        loginbox.style.display = "block";
    }
}

function loginValidate() {
    let errorMsg = '';
    let loginSuccess = true

    // If the userinput is not empty, we check if the username exists in userArray.
    if (uname.value !== '' && pword.value !== '') {
        // userIndex will be -1 if the username does not exist, otherwise it will hold the index of the user.
        const userIndex = userArray.findIndex(function (user) {
            return user.username === uname.value;
        })

        // If the username does not exist, alert the user and return false
        if (userIndex === -1) {
            alert('Fel användarnamn eller lösenord.');
            return false;
        }

        // Check if the password inputed by the user matches the saved password for that username.
        if (userArray[userIndex].checkPassword(pword.value)) {
            loggedInUser = userArray[userIndex];
            isLoggedIn = true;
            return true;
        }
        else {
            alert('Fel användarnamn eller lösenord');
            return false;
        }
    }

    // Alert the user if the username is empty.
    if (uname.value === '') {
        errorMsg = 'Fyll i användarnamn.';
        loginSuccess = false;
    }

    // Alert the user if the password is empty.
    if (pword.value === '') {
        errorMsg += (errorMsg === '' ? '' : '\n') + 'Fyll i lösenord.';
        loginSuccess = false;
    }

    if (!loginSuccess) {
        alert(errorMsg);
    }

    return loginSuccess;
}

function logout() {
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

function nextCourtImg() {
    if (courtIndex >= 3) {
        courtIndex = 0
    }
    else {
        courtIndex++;
    }

    if (courtIndex === 0) {
        courtpictures.src = './resources/images/bana1.jpg';
        courtpictures.alt = 'Bana1';
        courtInfo.innerText =
            'Bana 1 är vår lyxiga center-court med riktig wimbledon-känsla.\n' +
            'Pris: 500kr/h\n' +
            'Underlag: Gräs\n';
    }
    else if (courtIndex === 1) {
        courtpictures.src = './resources/images/bana2.jpg';
        courtpictures.alt = 'Bana2';
        courtInfo.innerText =
            'Bana 2 är en fin asfaltsbana som passar utmärkt för både hobbyspelare och proffs.\n' +
            'Pris: 300kr/h\n' +
            'Underlag: Asfalt\n';
    }
    else if (courtIndex === 2) {
        courtpictures.src = './resources/images/bana3.jpeg';
        courtpictures.alt = 'Bana3';
        courtInfo.innerText =
            'Bana 3, är trots sitt lite lägre pris en mycket bra bana. Fungerar bra till alla nivåer av spelare. \n' +
            'Pris: 200kr/h\n' +
            'Underlag: Konstgräs\n';
    }
    else if (courtIndex === 3) {
        courtpictures.src = './resources/images/bana4.png';
        courtpictures.alt = 'Bana4';
        courtInfo.innerText =
            'Längst ut på anläggningen hittar vi bana 4. Rekommenderas endast till nybörjare eller dom som har gett upp proffsdrömmen.\n' +
            'Pris: 100kr/h\n' +
            'Underlag: Asfallt\n';
    }
}

function nextFacImg() {
    if (facIndex >= 3) {
        facIndex = 0
    }
    else {
        facIndex++;
    }


    if (facIndex === 0) {
        facilitiesPictures.src = './resources/images/sauna.jpg';
        facilitiesPictures.alt = 'Sauna';
        facilitiesInfo.innerText =
            'Det finns väl inget bättre än att sätta sig i bastun efter ett träningspass?\n' +
            'Hos oss kan du göra just det, och det ingår i den bokning. Du betalar alltså inget extra för detta.';
    }
    else if (facIndex === 1) {
        facilitiesPictures.src = './resources/images/lockers.jpg';
        facilitiesPictures.alt = 'Lockers';
        facilitiesInfo.innerText = 'Våra skåp i omklädningsrummen är av absolut högsta klass. Här kan du lämna dina grejer när du spelar, utan att behöva oroa dig för dom. Och självklart är dom gratis.';

    }
    else if (facIndex === 2) {
        facilitiesPictures.src = './resources/images/shower.jpg';
        facilitiesPictures.alt = 'shower';
        facilitiesInfo.innerText =
            'Ta en uppfriskande dusch när du har tränat klart. Duscharna renoverades 2021 och städas flera gånger dagligen, för att DU ska trivas';
    }
    else if (facIndex === 3) {
        facilitiesPictures.src = './resources/images/cafe.jpg';
        facilitiesPictures.alt = 'cafe';
        facilitiesInfo.innerText =
            'Är du en person som gärna sitter ner och analyserar matchen efteråt? Oavsett om du behöver smälta en förlust, eller skryta om din vinst, erbjuder vårat café både varm/ kall dryck och fika.';
    }
}

function openMyBookings() {
    overlay.style.display = 'block';
    myBookings.style.display = 'block';
    listBookings();

}

function openRegForm() {
    loginbox.style.display = "none";
    regbox.style.display = "block";
}

function regValidate() {
    let message = 'Följande fel påträffades:\n';
    let regSuccess = true;
    
    // Regex patterns to match against input of first name, last name and email. 
    const onlyLettersPattern =  (/^[A-Za-z]+$/);
    const emailPattern =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // I did not write this pattern myself. I found it at https://www.w3resource.com/javascript/form/email-validation.php

    if (checkIfEmpty(username.value)) {
        message += 'Fyll i ett användarnam.\n';
        regSuccess = false;
    }
    else if (checkIfNameExists(userArray, username.value)) {
        message += 'Användernamnet finns redan\n';
        regSuccess = false;
    }
    else if(username.value.length < 4){
        message += 'Användernamnet måste vara minst 4 tecken långt\n';
        regSuccess = false;
    }

    if (checkIfEmpty(fname.value)) {
        message += 'Fyll i ett förnamn.\n';
        regSuccess = false;
    }
    else if(!fname.value.match(onlyLettersPattern)){
        message += 'Förnamnet får endast innehålla bokstäver.\n';
        regSuccess = false;
    }

    if (checkIfEmpty(lname.value)) {
        message += 'Fyll i ett efternamn.\n';
        regSuccess = false;
    }
    else if(!lname.value.match(onlyLettersPattern)){
        message += 'Efternamnet får endast innehålla bokstäver.\n';
        regSuccess = false;
    }

    if (checkIfEmpty(email.value)) {
        message += 'Fyll i en email-adress.\n';
        regSuccess = false;
    }
    else if(!email.value.match(emailPattern)){
        message += 'Ogiltigt format på emailadressen.\n';
        regSuccess = false;
    }
    else if (checkIfEmailExists(userArray, email.value)) {
        message += 'Emailen är redan registrerad.\n';
        regSuccess = false;
    }

    if (checkIfEmpty(password.value)) {
        message += 'Fyll i ett lösenord.\n';
        regSuccess = false;
    }

    if (checkIfEmpty(checkpword.value)) {
        message += 'Bekräfta lösenordet.\n';
        regSuccess = false;
    }
    else if (password.value !== checkpword.value) {
        message += 'Lösenorden matcher ej.\n'
        regSuccess = false;
    }

    if (!regSuccess) {
        alert(message);
    }

    return regSuccess;
}

// Prints a list of available times based on the user input. If there is a booking on that court/day, that time will not be displayed
function updateList() {

    clearList();
    if (court.value <= 4 && court.value >= 1 && date.value) {

        let times = timeArray.forEach(function (time) {
            if (!isBooked(date.value, time, court.value)) {
                const bookIt = document.createElement('p');
                bookIt.innerText = time;
                bookIt.className = 'bookBtn';

                bookIt.addEventListener('click', (e) => { createBooking(bookIt); });
                timeContainer.appendChild(bookIt);
            }
            return timeContainer
        })
    }
    else {
        if (!date.value) alert('Välj ett datum')
        else alert('Vänligen välj en bana för att se bokningsbara tider. (1-4)');

    }
}
//#endregion

// -------Event-listeners--------
//#region 
regform.addEventListener('submit', (e) => {
    e.preventDefault();
    if (regValidate()) {
        regbox.style.display = 'none';
        loginbox.style.display = 'block';
        alert('Tack ' + fname.value + '! Du är nu registrerad');
        userArray.push(new User(username.value, fname.value, lname.value, email.value, password.value));
        clearInputs();
    }
});

loginform.addEventListener('submit', (e) => {
    e.preventDefault();
    if (loginValidate()) {
        loginstatus.innerHTML = 'Inloggad som: ' + loggedInUser.username;
        loginbtn.innerHTML = 'Logga ut';
        menuMyBookings.style.visibility = 'visible';
        closeLogin();
        alert('Du är nu inloggad som: ' + loggedInUser.username);
    }
})

bannerText.onclick = function () {
    hideAll();
    start.style.display = 'block';
    if (window.innerWidth <= 670) {
        navbar.style.right = '-250px';
        navbar.style.width = '250px';
    }
}

menuBooking.onclick = function () {
    if (!isLoggedIn) {
        alert('Du måste vara inloggad för att kunna boka.');
        loginButton();
    }
    else {
        hideAll();
        handleNavbar();
        booking.style.display = 'block';
        if (window.innerWidth <= 670) {
            navbar.style.right = '-250px';
            navbar.style.width = '250px';
        }
    }
}

menuCourts.onclick = function () {
    hideAll();
    handleNavbar();
    courts.style.display = 'block';
}

menuFacilities.onclick = function () {
    hideAll();
    handleNavbar();
    facilities.style.display = 'block';
}

menuContact.onclick = function () {
    hideAll();
    handleNavbar();
    contact.style.display = 'block';
}

showTimes.onclick = function (e) {
    e.preventDefault();
    updateList();
}


//#endregion

//------------Classes------------
//#region 
class User {
    constructor(username, fname, lname, email, password) {
        this.username = username;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.password = password;

    }
    ownBookings = [];
    checkPassword(passwordToCheck) {
        return this.password === passwordToCheck;
    }
}
// Array to store all Users.
let userArray = []

class Booking {
    constructor(date, time, court, username) {
        this.date = date;
        this.time = time;
        this.court = court;
        this.username = username;
        this.price = ({
            1: 500,
            2: 300,
            3: 200,
            4: 100
        })[court] || 0;
    }

}

// Array to store all the bookings
let bookingArray = [];
//#endregion






