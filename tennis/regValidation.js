const regform = document.getElementById('regform');
const username = document.getElementById('username');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const checkpword = document.getElementById('checkpword');

//Username and password used for login validation
// let registeredName;

regform.addEventListener('submit', (e) => {
    e.preventDefault();

    if (regValidate()){
        regbox.style.display = 'none';
        loginbox.style.display = 'block';
        alert('Tack ' + fname.value + '! Du är nu registrerad');
        userArray.push(new User(username.value, fname.value, lname.value, email.value, password.value));
        clearInputs();
        
        console.log(userArray);
    }
});

function regValidate() {
    let message = 'The following errors occured:\n';
    let regSuccess = true;

    if (checkIfEmpty(username.value)) {
        message += 'Enter a username\n';
        regSuccess = false;
    }
    else if (checkIfNameExists(userArray, username.value)){
        message += 'Username is already registered\n';
        regSuccess = false;
    }
    else {
        // registeredName = username.value;
    }

    if (checkIfEmpty(fname.value)) {
        message += 'Enter a first name\n';
        regSuccess = false;
    }

    if (checkIfEmpty(lname.value)) {
        message += 'Enter a last name\n';
        regSuccess = false;
    }

    if (checkIfEmpty(email.value)) {
        message += 'Enter a email\n';
        regSuccess = false;
    }
    else if (checkIfEmailExists(userArray, email.value)){
        message += 'Email is already registered\n';
        regSuccess = false;
    }

    if (checkIfEmpty(password.value)) {
        message += 'Enter a password\n';
        regSuccess = false;
    }

    if (checkIfEmpty(checkpword.value)) {
        message += 'Enter a password check\n';
        regSuccess = false;
    }
    else if (password.value !== checkpword.value){
        message += 'The passwords do not match'
        regSuccess = false;
    }
    

    if (!regSuccess) {
        alert(message);
    }

    return regSuccess;
}

function checkIfEmpty(input) {
    return input === '';
}

function checkIfNameExists(userArray, value){
    const user = userArray.findIndex(function (u){
        return u.username === value;
    })
    console.log(user);
    return user !== -1;
    
}

function checkIfEmailExists(userArray, value){
    const user = userArray.findIndex(function (u){
        return u.email === value;
    })
    console.log(user);
    return user !== -1;
    
}
