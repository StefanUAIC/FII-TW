const logoutButtons = document.getElementsByClassName('logout-button-js');

function logoutUser(e) {
    e.preventDefault();

    fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
    })
        .then(response => {
            if (response.ok) {
                console.log('Logout successful')
                window.location.href = "/";
            } else {
                console.error('Logout failed');
            }
        })
        .catch(error => console.error('Error:', error));
}

for (let i = 0; i < logoutButtons.length; i++) {
    logoutButtons[i].addEventListener('click', logoutUser);
}
