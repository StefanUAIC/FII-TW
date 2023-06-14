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
            return response.json();
        })
        .then(data => {
            if (data.status === 200) {
                console.log(data);
                // window.location.href = '/home';
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
