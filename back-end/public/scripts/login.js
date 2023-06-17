const loginForm = document.querySelector('.login-form')
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.querySelector('#email-input').value;
    const password = document.querySelector('#password-input').value;

    const data = {email: email, password: password};

    fetch('/api/auth/login', {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                window.location.href = '/home';
            } else {
                return response.json();
            }
        })
        .then(data => {
            if (data) {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(error.message);
        });
});
