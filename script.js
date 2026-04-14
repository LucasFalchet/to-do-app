let tasks = [];
let currentPage = 1;
const tasksPerPage = 4;

function addTask() {
    const text = document.getElementById("taskInput").value.trim();
    const priority = document.getElementById("priority").value;
    const deadline = document.getElementById("deadline").value;

    if (!text || !priority) return;

    tasks.push({
        text,
        priority,
        deadline,
        completed: false
    });

    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    const start = (currentPage - 1) * tasksPerPage;
    const end = start + tasksPerPage;

    const pageTasks = tasks.slice(start, end);

    pageTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add(task.priority);

        // atraso
        if (task.deadline && !task.completed) {
            const now = new Date();
            const deadlineDate = new Date(task.deadline);
            if (now > deadlineDate) {
                li.classList.add("overdue");
            }
        }

        const span = document.createElement("span");
        span.textContent = task.text;
        span.classList.add("task-text");

        if (task.completed) span.classList.add("completed");

        const actions = document.createElement("div");
        actions.classList.add("actions");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✔";
        completeBtn.onclick = () => {
            task.completed = !task.completed;
            renderTasks();
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✖";
        deleteBtn.onclick = () => {
            tasks.splice(start + index, 1);
            renderTasks();
        };

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        // DATA EMBAIXO
        const deadlineEl = document.createElement("div");
        deadlineEl.classList.add("deadline");

        if (task.deadline) {
            const date = new Date(task.deadline);
            deadlineEl.textContent = date.toLocaleString();
        }

        li.appendChild(span);
        li.appendChild(actions);
        li.appendChild(deadlineEl);

        list.appendChild(li);
    });

    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const pages = Math.ceil(tasks.length / tasksPerPage) || 1;

    for (let i = 1; i <= pages; i++) {
        const btn = document.createElement("div");
        btn.textContent = i;
        btn.classList.add("page-btn");

        if (i === currentPage) {
            btn.classList.add("active");
        }

        btn.onclick = () => {
            currentPage = i;
            renderTasks();
        };

        pagination.appendChild(btn);
    }
}

// inicializa com página 1
renderPagination();