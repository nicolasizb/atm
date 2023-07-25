import { usersData } from './users/usersData'

() => {
    users.forEach(user => {
        console.log(user)
    });
}

function data() {
    const email = document.getElementById('email-address').value;
    const password = document.getElementById('password').value;
    
    console.log(email, password);
}