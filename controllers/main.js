document.getElementById('btnLogin').addEventListener('click', (event) => {
    event.preventDefault();

    const emailInput = document.getElementById('email-address').value;
    const passwordInput = document.getElementById('password').value;

    const users = getUserObj();
    const loggedUser = users.find(user => user.email === emailInput && user.password === passwordInput);

    if(loggedUser) {
        editUserState(loggedUser.email, true);
        window.location.href = "../app/home.html";
    } else {
        let labels = document.querySelectorAll('.if--lb');
        let inputs = document.querySelectorAll('.if--ip');

        for(let i = 0; i < labels.length; i++) {
            labels[i].classList.remove('tr--lb');
        }

        for(let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove('tr--ip');
        }

        const form = document.getElementById('password'); 
        const errText = document.createElement('p');
        errText.textContent = 'Invalid email address and password combination';
        errText.classList.add('me--err');

        form.insertAdjacentElement('afterend', errText);

        setTimeout(()=> {
            errText.innerText = '';
        }, 5000)
    }
})

document.getElementById('email-address').addEventListener('input', validateForm);
document.getElementById('password').addEventListener('input', validateForm);

function getUserObj() {
    const users = localStorage.getItem('User Created');
    return users ? JSON.parse(users) : [];
}

function editUserState(email, state) {
    const existingData = getUserObj();
  
    if (existingData) {
        users = existingData;
        let userSelect = users.find(user => user.email === email);
        
        if (userSelect && userSelect.stateSession != state) {
            userSelect.stateSession = state;
        } else {
            console.log('Not change the state', state)
        }
        
    } else {
        console.log('There is not users')
    }

    localStorage.removeItem('User Created');
    localStorage.setItem('User Created', JSON.stringify(existingData));
}

function deleteUser(email) {
    const users = getUserObj();

    let userSelect = users.find(user => user.email === email);

    if(userSelect) {
        const positionObj = users.indexOf(userSelect);
        users.splice(positionObj, 1);
        localStorage.removeItem('User Created');
        localStorage.setItem('User Created', JSON.stringify(users));
    } else {
        console.log('There are not users created');
    }
}

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

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPassword(password) {
    return password.length >= 4;
}

function validateForm() {
    const emailInput = document.getElementById('email-address').value;
    const passwordInput = document.getElementById('password').value;

    if (isValidEmail(emailInput) && isValidPassword(passwordInput)) {
        btnLogin.disabled = false;
        btnLogin.classList.remove('if--btn--err');
        btnLogin.classList.add('if--btn--tr');
    } else {
        btnLogin.disabled = true;
        btnLogin.classList.add('if--btn--err');
        btnLogin.classList.remove('if--btn--tr');
    }
}

function signIn() {
    window.location.href = '../app/register.html'
}
