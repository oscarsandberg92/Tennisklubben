const uname = document.getElementById('uname');
const pword = document.getElementById('pword');
const loginform = document.getElementById('loginform');
const loginstatus = document.getElementById('loginstatus')


loginform.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validate()) {
        loginstatus.innerHTML = 'Inloggad som: ' + loggedInUser.username;
        loginbtn.innerHTML = 'Logga ut';
        closeLogin();
        alert('Du är nu inloggad som: ' + loggedInUser.username);
    }
})

function validate() {
    let errorMsg = '';
    let loginSuccess = true

    // If the userinput is not empty, we check if the username exists in userArray.
    if(uname.value !== '' && pword.value !== ''){
        // userIndex will be -1 if the username does not exist, otherwise it will hold the index of the user.
        const userIndex = userArray.findIndex( function(user){
            return user.username === uname.value;
        })
        
        // If the username does not exist, alert the user and return false
        if(userIndex === -1) {
            alert('Användarnamnet finns ej.');
            return false;
        }

        // Check if the password inputed by the user matches the saved password for that username.
        if (userArray[userIndex].checkPassword(pword.value)){
            loggedInUser = userArray[userIndex];
            isLoggedIn = true;
            return true;
        }
        else{
            alert('Fel lösenord. \nVänligen försök igen.')
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

// Clears all the input fields in the login and registration form
function clearInputs(){
    let inputs = document.querySelectorAll('input');
    inputs = inputs.forEach(function (input) {
        input.value = '';
    })
}

// Closes the login form and the overlay
function closeLogin() {
    overlay.style.display = "none";
    loginbox.style.display = "none";
    clearInputs();    
}

// Closes the registration form and returns to login form
function closeRegBox(){
    regbox.style.display = 'none';
    loginbox.style.display = 'block';
    clearInputs();
}

