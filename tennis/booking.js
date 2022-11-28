const showTimes = document.getElementById('showTimes');
const timeContainer = document.getElementById('timeContainer');
const date = document.getElementById('date');
const court = document.getElementById('court');
const timelist = document.getElementsByClassName('bookBtn');

// Make sure bookings can't be made for dates that have already passed
let today = new Date();
//let formatedDate = today.getFullYear() + '-' + (today.getMonth() + 1 ) + '-' + today.getDate();
date.min= today.getFullYear() + '-' + (today.getMonth() + 1 ) + '-' + today.getDate();
date.max = (today.getFullYear() + 1) + '-' + (today.getMonth() + 1 ) + '-' + today.getDate();



// Array to store all the bookings
let bookingArray = [];

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
]




function checkIfBooked(date, time, court,) {
    // Check if there already is an object with the same date/time/court
    let exists;
    let filteredArray = bookingArray.forEach(function (booking) {

        if (booking.date === date){
            if(booking.time === time){
                if(booking.court === court){
                    exists = true;
                }
            }
        }
        
        else {
            exists = false;
            console.log('Den fanns inte')
        }        
    });
    
    return !exists;
}



function book(book){
    if(!date.value){
        alert('Välj ett datum');
    }
    else if(!isLoggedIn){
        alert('Du måste vara inloggad för att kunna boka');
    }
    else{
    console.log('****************')
    
    const newBooking = new Booking(date.value, book.innerText, court.value, loggedInUser.username);
    bookingArray.push(newBooking);
    loggedInUser.ownBookings.push(newBooking);
    console.log(bookingArray);
    console.log('*********')
    console.log(loggedInUser);
    alert('Tack för din bokning ' + loggedInUser.fname + '!' +
          '\n-------------------------------------------' + 
          '\nDu har bokat bana 1 i 60 min.' +
          '\nDatum: ' + date.value + 
          '\nKlockan: ' + book.innerText);
    clearList();
}

}

function clearList(){
    timeContainer.replaceChildren('');
}

function updateList() {
    clearList();
    if (court.value <= 4 && court.value >= 1 && date.value) {
        clearList();
        let times = timeArray.forEach(function (time) {
            if (checkIfBooked(date.value, time, court.value)) {
                const bookIt = document.createElement('p');
                bookIt.innerText = time;
                bookIt.className = 'bookBtn';

                bookIt.addEventListener('click', (e) => { book(bookIt); });
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


class Booking{
    constructor(date, time, court, username){
        this.date = date;
        this.time = time;
        this.court = court;
        this.username = username;
        this.price = 200;
    }
    
}