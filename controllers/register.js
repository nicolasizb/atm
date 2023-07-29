document.getElementById('first-name').addEventListener('input', validateForm);
document.getElementById('last-name').addEventListener('input', validateForm);
document.getElementById('email-address').addEventListener('input', validateForm);
document.getElementById('password').addEventListener('input', validateForm);

document.getElementById('btnSignIn').addEventListener('click', (event)=> {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email-address').value;
    const password = document.getElementById('password').value;
    const balance = 0;
    const stateSession = false; 

    const userCreated = {firstName, lastName, email, password, stateSession, balance};

    saveUser(userCreated);

    window.location.href = '../index.html';
});

function saveUser(userObj) {
    let users = [];
    const existingData = localStorage.getItem('User Created');
  
    if (existingData) {
      try {
        users = JSON.parse(existingData);
      } catch (error) {
        console.error('Error al analizar datos en localStorage:', error);
      }
    }
  
    users.push(userObj);
  
    localStorage.setItem('User Created', JSON.stringify(users));
}
  

function isValidFirstName(firstName) {
    return firstName.length >= 3;
}

function isValidLastName(lastName) {
    return lastName.length >= 3;
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPassword(password) {
    return password.length >= 4;
}

function validateForm() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email-address').value;
    const password = document.getElementById('password').value;
    const btnSignIn = document.getElementById('btnSignIn'); 

    if(isValidFirstName(firstName) && isValidLastName(lastName) && isValidEmail(email) && isValidPassword(password)) {
        btnSignIn.disabled = false;
        btnSignIn.classList.add('if--btn--tr');
        btnSignIn.classList.remove('if--btn--err');
    } else {
        btnSignIn.disabled = true;
        btnSignIn.classList.remove('if--btn--tr');
        btnSignIn.classList.add('if--btn--err');
    }
}