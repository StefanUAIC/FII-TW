document.querySelector('.login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('surname-input').value;
    const firstName = document.getElementById('first-name-input').value;
    const email = document.getElementById('email-input').value;
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;
    const confirmPassword = document.getElementById('confirm-password-input').value;
    const role = document.getElementById('option-elev').checked ? 'Elev' : 'Profesor';

    if (!name || !firstName || !email || !username || !password || !confirmPassword) {
        alert('Completați toate câmpurile!');
        return;
    }

    const emailRegEx = /\S+@\S+\.\S+/;
    if (!emailRegEx.test(email)) {
        alert('Scrieți un e-mail valid!');
        return;
    }

    const passwordRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$&*])(?=.*[0-9]).{8,30}$/;
    if (!passwordRegEx.test(password)) {
        alert('Parola trebuie să conțină cel puțin un caracter special, o cifră, o literă majusculă, cel puțin o literă mică și să aibă între 8 și 30 de caractere.');
        return;
    }

    const usernameRegEx = /^[a-zA-Z0-9]{3,20}$/;
    if (!usernameRegEx.test(username)) {
        alert('Numele de utilizator trebuie să aibă între 3 și 20 de caractere și poate conține doar litere și cifre.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Parolele nu se potrivesc.');
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
            role
        }),
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.message || 'A apărut o eroare necunoscută.');
                });
            }
            return response.json();
        })
        .then(data => {
            window.location.href = '/';
        })
        .catch((error) => {
            alert(error.message);
            console.error('Eroare:', error);
        });
});

