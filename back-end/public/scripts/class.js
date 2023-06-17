const classCodeBtn = document.getElementById("copy-code-btn");

classCodeBtn.addEventListener("click", () => {
    const classCode = document.getElementById("class-code").innerText;
    navigator.clipboard.writeText(classCode).catch(err => {
        console.log(err);
    });
    alert("Codul clasei a fost copiat in clipboard");
})
;

const addHomeworkBtn = document.getElementById("add-homework-btn");
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