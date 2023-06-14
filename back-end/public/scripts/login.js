const loginForm = document.querySelector('.login-form')
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.querySelector('#email-input').value;
    const password = document.querySelector('#password-input').value;

    const data = {username: email, password: password};

    fetch('http://localhost:8081/api/auth/login', {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                window.location.href = '/home';
            } else {
                alert('Invalid credentials');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(error.message);
        });
});