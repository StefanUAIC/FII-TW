const classCodeBtn = document.getElementById("copy-code-btn");

if (classCodeBtn) {
    classCodeBtn.addEventListener("click", () => {
        const classCode = document.getElementById("class-code").innerText;
        navigator.clipboard.writeText(classCode).catch(err => {
            console.log(err);
        });
        alert("Codul clasei a fost copiat in clipboard");
    });
}


const closeButton = document.getElementsByClassName("close")[0];
const modal = document.getElementsByClassName("modal-container")[0];
const addHomeworkBtn = document.getElementById("add-homework-btn");

if (addHomeworkBtn) {
    addHomeworkBtn.onclick = function () {
        modal.style.display = "flex";
    }
}

if (closeButton) {
    closeButton.onclick = function () {
        modal.style.display = "none";
    }
}

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

const form = document.getElementById("addHomeworkForm");

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("Form submitted");
    
        const classId = document.getElementById("class-id").innerText;
        const formData = new FormData(form);
    
        formData.append("class", classId);
    
        let body = {};
        formData.forEach((value, key) => {
            if(key === 'deadline') {
                let deadlineDate = value;
                let deadlineTime = formData.get('deadlineTime');
                body[key] = `${deadlineDate}T${deadlineTime}:00`; 
            } else if(key !== 'deadlineTime') { 
                body[key] = value;
            }
        });
    
        body = JSON.stringify(body);
    
        fetch("/api/homeworks/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
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


const seeHomeworkBtn = document.getElementById("see-homework-btn");
seeHomeworkBtn.addEventListener("click", () => {
    const problemId = seeHomeworkBtn.dataset.problemId;
    if (problemId == 0) {
        alert("Nu există temă pentru această clasă");
        return;
    }
    const homeworkId = seeHomeworkBtn.dataset.homeworkId;

    window.location.href = `/problem/${problemId}?homework=${homeworkId}`;
});
