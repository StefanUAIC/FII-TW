document.querySelector('.login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('surname-input').value;
    const firstName = document.getElementById('first-name-input').value;
    const email = document.getElementById('email-input').value;
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;
    const confirmPassword = document.getElementById('confirm-password-input').value;
    const accountType = document.getElementById('option-elev').checked ? 'Elev' : 'Profesor';

    if (!name || !firstName || !email || !username || !password || !confirmPassword) {
        alert('Please fill all fields');
        return;
    }

    const emailRegEx = /\S+@\S+\.\S+/;
    if (!emailRegEx.test(email)) {
        alert('Please provide a valid email');
        return;
    }

    const passwordRegEx = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,30}$/;
    if (!passwordRegEx.test(password)) {
        alert('Password must have at least one special character, one digit, one uppercase letter, and be between 3 to 30 characters long');
        return;
    }

    const usernameRegEx = /^[a-zA-Z0-9]{3,20}$/;
    if (!usernameRegEx.test(username)) {
        alert('Username must be between 3 to 20 characters long and can only contain letters and digits');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    fetch('http://localhost:8081/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            firstName,
            email,
            username,
            password,
            accountType
        }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
});
