// script.js

const saveProfileBtn = document.getElementById("saveProfile");
const userName = document.getElementById("userName");
const userRole = document.getElementById("userRole");
const profileSection = document.getElementById("profileSection");
const displayName = document.getElementById("displayName");
const displayRole = document.getElementById("displayRole");

saveProfileBtn.addEventListener("click", () => {
  displayName.textContent = userName.value || "Tanpa Nama";
  displayRole.textContent = userRole.value || "";
  profileSection.classList.remove("hidden");
});

const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const overdueHours = document.getElementById("overdueHours");
const addTaskBtn = document.getElementById("addTask");
const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");
const deleteAllBtn = document.getElementById("deleteAll");

let tasks = [];

function renderTasks() {
  todoList.innerHTML = "";
  doneList.innerHTML = "";
  const now = new Date();

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `flex items-center justify-between p-2 rounded-lg ${
      task.done ? "opacity-70 line-through" : "priority-" + task.priority
    }`;
    if (!task.done && now - new Date(task.createdAt) > task.overdue * 3600000)
      li.classList.add("overdue");

    li.innerHTML = `
      <div class='flex items-center gap-2'>
        <input type='checkbox' ${
          task.done ? "checked" : ""
        } data-index='${index}' class='checkbox-task' />
        <span>${task.text}</span>
      </div>
      <button data-index='${index}' class='delete-task text-red-600 hover:text-red-800 font-bold'>✕</button>
    `;

    if (task.done) doneList.appendChild(li);
    else todoList.appendChild(li);
  });
}
//batas
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Isi tugas dulu ya!",
      confirmButtonColor: "#077314ff",
    });
    return;
  }

  tasks.push({
    text,
    priority: prioritySelect.value,
    done: false,
    createdAt: new Date(),
    overdue: parseInt(overdueHours.value),
  });
  taskInput.value = "";
  renderTasks();
});

//batas
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("checkbox-task")) {
    const index = e.target.dataset.index;
    tasks[index].done = e.target.checked;
    renderTasks();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-task")) {
    tasks.splice(e.target.dataset.index, 1);
    renderTasks();
  }
});

deleteAllBtn.addEventListener("click", () => {
  if (confirm("Yakin hapus semua tugas?")) tasks = [];
  renderTasks();
});

setInterval(renderTasks, 60000);
renderTasks();
