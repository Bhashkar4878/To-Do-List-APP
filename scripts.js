
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

// to get saved tast list from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// to display tasks
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task;

        // for editing tast button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit";

        editButton.addEventListener("click", function() {

            const updatedTask = prompt("Edit task:", task);

            if (updatedTask !== null && updatedTask.trim() !== "") {

                tasks[index] = updatedTask.trim();

                localStorage.setItem("tasks", JSON.stringify(tasks));

                displayTasks();
            }

        });

        // to delete task
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";

        deleteButton.addEventListener("click", function() {

            tasks.splice(index, 1);

            localStorage.setItem("tasks", JSON.stringify(tasks));

            displayTasks();
        });

        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });

}

// to add new task
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const task = input.value.trim();

    if (task === "") return;

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";

    displayTasks();

});


displayTasks();
