const start = document.getElementById('start')
const booking = document.getElementById('booking');
const courts = document.getElementById('courts');
const facilities = document.getElementById('facilities');
const contact = document.getElementById('contact');

const bannerText = document.getElementById('banner-text');
const menuBooking = document.getElementById('menuBooking');
const menuCourts = document.getElementById('menuCourts');
const menuFacilities = document.getElementById('menuFacilities');
const menuContact = document.getElementById('menuContact');

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

menuBooking.onclick = function() {
    hideAll();
    booking.style.display = 'block';
    if(window.innerWidth <= 670) {
        navbar.style.right = '-250px';
        navbar.style.width = '250px';
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