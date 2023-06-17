const modal = document.getElementsByClassName("modal-container")[0];
const assignBtn = document.getElementById("create-class"); //pentru profesor
const closeBtn = document.getElementsByClassName("close")[0];

if (assignBtn != null) {
    assignBtn.onclick = function () {
        modal.style.display = "block";
    }
}

closeBtn.onclick = function () {
    modal.style.display = "none";
}


window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

//pentru slider-ul cu nota
const value = document.querySelector("#grade-value");
const input = document.querySelector("#grade-range");

if (value != null) {
    value.textContent = input.value;
}

if (input != null) {
    input.addEventListener("input", (event) => {
        value.textContent = event.target.value;
    })
}

const classCreateBtn = document.getElementById("create-class-button");
if (classCreateBtn != null) {
    classCreateBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const name = document.getElementById("create-class-textarea").value;
        const description = document.getElementById("description-textarea").value;

        if (name.length > 16 || name.trim().length < 1) {
            alert("Numele clasei poate avea maxim 16 caractere si minim 1 caracter");
            return;
        }

        fetch ("/api/classes/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, description})
        })
        .then(response => {
            if (response.ok) {
                modal.style.display = "none";
                location.reload();
            }
            else {
                alert("Eroare la crearea clasei");
            }
        })
        .catch(error => console.log(error));
    });
}


/* alaturare in clasa ca elev */
const classJoinBtn = document.getElementById("join-class-button");
if (classJoinBtn != null) {
    classJoinBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const code = document.getElementById("join-class-textarea").value.trim();
        console.log(code);
    
        fetch ("/api/classes/join", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({code})
        })
        .then(response => {
            if (response.ok) {
                modal.style.display = "none";
                location.reload();
            }
            else {
                alert("Codul clasei este invalid");
            }
        }
        )
        .catch(error => console.log(error));
    });
}

