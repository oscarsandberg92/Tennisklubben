const start = document.getElementById('start')
const booking = document.getElementById('booking');
const courts = document.getElementById('courts');
const facilities = document.getElementById('facilities');
const contact = document.getElementById('contact');
const myBookings = document.getElementById('myBookings')

const bannerText = document.getElementById('banner-text');
const menuBooking = document.getElementById('menuBooking');
const menuCourts = document.getElementById('menuCourts');
const menuFacilities = document.getElementById('menuFacilities');
const menuContact = document.getElementById('menuContact');
const menuMyBookings = document.getElementById('menuMyBookings');
const myBookingsList = document.getElementById('myBookingsList');

const content = document.getElementsByClassName('content');



//Hides all "content" divs 
function hideAll(){
    start.style.display = 'none';
    booking.style.display = 'none';
    courts.style.display = 'none';
    facilities.style.display = 'none';
    contact.style.display = 'none';
}

bannerText.onclick = function() {
    hideAll();
    start.style.display = 'block';
    if(window.innerWidth <= 670) {
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
        booking.style.display = 'block';
        if (window.innerWidth <= 670) {
            navbar.style.right = '-250px';
            navbar.style.width = '250px';
        }
    }
}

menuCourts.onclick = function() {
    hideAll();
    courts.style.display = 'block';
}

menuFacilities.onclick = function() {
    hideAll();
    facilities.style.display = 'block';
}

menuContact.onclick = function() {
    hideAll();
    contact.style.display = 'block';
}

// Opens myBookings and displays the users current bookings
function openMyBookings(){
    overlay.style.display = 'block';
    myBookings.style.display = 'block';
    listBookings();

}
// Close the myBookings box
function closeMybookings(){
    overlay.style.display = "none";
    myBookings.style.display = "none";
    clearMyBookings();
}

// Clears myBookings.
function clearMyBookings() {
    myBookingsList.replaceChildren('');
}

// Creates a HTML card for each of the logged in user's bookings
function listBookings(){
    let totalPrice = 0;
    // If no bookings are made yet, we let the user know that
    if(loggedInUser.ownBookings.length === 0){
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
            console.log(parseInt(booking.price));
        });
    }

    const showTotalPrice = document.createElement('small');
    showTotalPrice.innerText = 'Du har bokat tennis för total: ' + totalPrice + 'kr.';
    if (loggedInUser.ownBookings.length > 0)myBookingsList.appendChild(showTotalPrice);
}
