const button = document.getElementsByClassName("btn")[0];

const username = document.getElementById("input-username");
const email = document.getElementById("input-email");
const firstName = document.getElementById("input-first-name");
const lastName = document.getElementById("input-last-name");
const street = document.getElementById("input-address");
const city = document.getElementById("input-city");
const county = document.getElementById("input-county");
const country = document.getElementById("input-country");
const description = document.getElementById("input-description");

button.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(username.value);

    fetch("http://localhost:8081/api/settings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username.value,
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value,
            address: {
                street: street.value,
                city: city.value,
                state: county.value,
                country: country.value,
            },
            description: description.value,
        }),
    })
        .then((response) => {
            if (response.ok) {
                window.location.href = "/account";
            } else {
                alert("Error occured");
            }
        })
        .catch((error) => {
            alert(error.message);
        });
});
