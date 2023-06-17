const classCodeBtn = document.getElementById("copy-code-btn");

if (classCodeBtn) {
    classCodeBtn.addEventListener("click", () => {
        const classCode = document.getElementById("class-code").innerText;
        navigator.clipboard.writeText(classCode);
    });
}


const addHomeworkBtn = document.getElementById("add-homework-btn");
if (addHomeworkBtn) {
    addHomeworkBtn.addEventListener("click", () => {
        /* TODO: deschide modal */

        const classId = document.getElementById("class-id").innerText;

        body = {
            title: "tema 3 cex",
            deadline: "2023-06-20",
            problem: 1,
            class: classId
        }

        fetch("/api/homeworks/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if (response.ok) {
                console.log("tema creata");
                location.reload();
            }
            else {
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