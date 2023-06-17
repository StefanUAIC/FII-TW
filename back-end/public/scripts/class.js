const classCodeBtn = document.getElementById("copy-code-btn");

classCodeBtn.addEventListener("click", () => {
    const classCode = document.getElementById("class-code").innerText;
    navigator.clipboard.writeText(classCode).catch(err => {
        console.log(err);
    });
    alert("Codul clasei a fost copiat in clipboard");
});

const closeButton = document.getElementsByClassName("close")[0];

const modal = document.getElementsByClassName("modal-container")[0];

const addHomeworkBtn = document.getElementById("add-homework-btn");

addHomeworkBtn.onclick = function () {
    modal.style.display = "block";
}

closeButton.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

if (addHomeworkBtn) {
    addHomeworkBtn.addEventListener("click", () => {
        console.log("add homework btn clicked");
        const classId = document.getElementById("class-id").innerText;

        fetch("/api/homeworks/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.ok) {
                    console.log("Tema creată cu succes");
                    location.reload();
                } else {
                    alert("Eroare la crearea temei");
                }
            })
            .catch(error => console.log(error));
    });
}