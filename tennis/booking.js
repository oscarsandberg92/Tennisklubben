const showTimes = document.getElementById('showTimes');
const timeContainer = document.getElementById('timeContainer');
const date = document.getElementById('date');
const court = document.getElementById('court');
const timelist = document.getElementsByClassName('bookBtn');

// Make sure bookings can't be made for dates that have already passed and also that the user cannot make bookings
// longer than 1 year ahead
let today = new Date();
date.min = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
date.max = (today.getFullYear() + 1) + '-' + (today.getMonth() + 1) + '-' + today.getDate();

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

// Clears the container displaying the available times.
function clearList() {
    timeContainer.replaceChildren('');
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
    console.log(bookingArray);
}

// Check if there already is an Booking with the same date/time/court. And returns 
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


class Booking {
    constructor(date, time, court, username) {
        this.date = date;
        this.time = time;
        this.court = court;
        this.username = username;
        this.price =  ({
            1: 500,
            2: 300,
            3: 200,
            4: 100
        }) [court] || 0;
    }

}