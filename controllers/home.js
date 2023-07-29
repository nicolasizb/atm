let sessionStade = setInterval(valideSession, 8000);
let userActive = {};
let buttonInfoState = false;

document.querySelector('.na').addEventListener('click', (event) => {
    event.preventDefault();

    buttonInfoState = !buttonInfoState;
    
    const sectionInfoUser = document.querySelector('.ctr--acc');

    if(buttonInfoState) {
        sectionInfoUser.classList.remove('acc--ctr--des');
        sectionInfoUser.classList.add('act--ctr--acc');
    } else {
        sectionInfoUser.classList.add('acc--ctr--des');
        sectionInfoUser.classList.remove('act--ctr--acc');
    }
});

function user() {
    const users = getUserObj();
    const userLogged = users.find(user => user.stateSession === true);
    userActive = userLogged;

    let spacePrice = document.querySelector('.pr');
    let spaceEmail = document.querySelector('.em');
    let spaceFirstName = document.querySelector('.fn');
    let spaceLastName = document.querySelector('.ln');
    let welcomeFirstName = document.querySelector('.wfn');
    
    spacePrice.innerHTML = userActive.balance; 
    spaceEmail.innerHTML = userActive.email;
    spaceFirstName.innerHTML = userActive.firstName;
    welcomeFirstName.innerHTML = userActive.firstName;
    spaceLastName.innerHTML = userActive.lastName;
}

function toDepositBalance() {
    const containerBalance = document.querySelector('.pr');
    const inputNewBalance = document.getElementById('deposit').value;
    
    const existingData = getUserObj();

    const userStorage = existingData.find(user => user.email === userActive.email);
    let balanceAfter = userStorage.balance + parseInt(inputNewBalance);

    const typeInputValue = Math.sign(inputNewBalance);

    if (balanceAfter <= 990 && typeInputValue === 1) {
        userStorage.balance = balanceAfter;
        userActive.balance = balanceAfter;
        containerBalance.innerHTML = userActive.balance;
        document.getElementById('deposit').value = "";
        
        const sectionMessages = document.getElementById('me');
        const message = document.createElement('p');
        message.textContent = 'Deposit made successfully';
    
        sectionMessages.appendChild(message);
        message.classList.add('me--de')

        setTimeout(()=> {
            sectionMessages.innerHTML = "";
        }, 4000)
    } else if (balanceAfter > 990) {
        document.getElementById('deposit').value = "";
        
        const sectionMessages = document.getElementById('me');
        const message = document.createElement('p');
        message.textContent = 'You can only have a maximum of $990';
    
        sectionMessages.appendChild(message);
        message.classList.add('me--da')

        setTimeout(()=> {
            sectionMessages.innerHTML = "";
        }, 4000)
    } else {
        const sectionMessages = document.getElementById('me');
        const message = document.createElement('p');
        message.textContent = 'Is not an allowed value';
        document.getElementById('deposit').value = "";
    
        sectionMessages.appendChild(message);
        message.classList.add('me--da');
        
        setTimeout(()=> {
            sectionMessages.innerHTML = "";
        }, 5000)
    }
    localStorage.removeItem('User Created');
    localStorage.setItem('User Created', JSON.stringify(existingData));
}

function withdrawBalance() {
    const containerBalance = document.querySelector('.pr');
    const inputNewBalance = document.getElementById('withdraw').value;

    const existingData = getUserObj();

    const userStorage = existingData.find(user => user.email === userActive.email);
    let balanceAfter = userStorage.balance - parseInt(inputNewBalance);

    const typeInputValue = Math.sign(inputNewBalance);

    if(balanceAfter >= 10 && typeInputValue === 1) {
        userStorage.balance = balanceAfter;
        userActive.balance = balanceAfter;
        containerBalance.innerHTML = userActive.balance;
        document.getElementById('withdraw').value = "";

        const sectionMessages = document.getElementById('me');
        const message = document.createElement('p');
        message.textContent = 'Withdrawal successfully';
    
        sectionMessages.appendChild(message);
        message.classList.add('me--wi')

        setTimeout(()=> {
            sectionMessages.innerHTML = "";
        }, 4000)
    } else if (typeInputValue !== 1) {
        const sectionMessages = document.getElementById('me');
        const message = document.createElement('p');
        message.textContent = 'Is not an allowed value';
        document.getElementById('withdraw').value = "";
    
        sectionMessages.appendChild(message);
        message.classList.add('me--da');
        
        setTimeout(()=> {
            sectionMessages.innerHTML = "";
        }, 5000)
    } else if (balanceAfter <= 10) {
        const sectionMessages = document.getElementById('me');
        const message = document.createElement('p');
        message.textContent = 'Insufficient balance, you must be at least $10';
    
        sectionMessages.appendChild(message);
        message.classList.add('me--da');
        
        setTimeout(()=> {
            sectionMessages.innerHTML = "";
        }, 6000)
    }

    localStorage.removeItem('User Created');
    localStorage.setItem('User Created', JSON.stringify(existingData));
}

function valideSession() {
    const users = getUserObj();
    const dataStorage = users.find(user => user.stateSession === true);

    if(!dataStorage || userActive.stateSession !== true) {
        clearInterval(sessionStade);
        window.location.href = '../index.html';
    } else {
        console.log('Active session');
    }
}

function getUserObj() {
    const users = localStorage.getItem('User Created');
    return users ? JSON.parse(users) : [];
}

function signOut() {
    let stateUpdate = false;
    const existingData = getUserObj();
  
    if (existingData) {
        let userStorage = existingData.find(user => user.email === userActive.email)
        
        if (userStorage && userStorage.stateSession !== stateUpdate && userActive.stateSession !== stateUpdate) {
            userStorage.stateSession = stateUpdate;
            userActive.stateSession = stateUpdate;
            window.location.href = '../index.html';
        } else {
            console.log('Not change the state', stateUpdate);
        }
        
    } else {
        console.log('There is not users')
    }

    localStorage.removeItem('User Created');
    localStorage.setItem('User Created', JSON.stringify(existingData));
}