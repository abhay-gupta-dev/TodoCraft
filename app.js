// Select elements
const addBtn = document.querySelector(".btn1");
const input = document.querySelector(".input");
const taskList = document.querySelector(".task-list");
const progress = document.getElementById("progress");
const numbers = document.getElementById("numbers");

let tasks = [];

// Add task
addBtn.addEventListener("click", () => {
  const text = input.value.trim();

  if (text === "") return;

  tasks.push({ text, completed: false });
  input.value = "";

  updateUI();
});

// Update UI
function updateUI() {
  taskList.innerHTML = "";

  let completedCount = 0;

  tasks.forEach((task, index) => {
    if (task.completed) completedCount++;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <div>
        <input 
          type="checkbox" 
          ${task.completed ? "checked" : ""} 
          class="me-2 task-check"
          data-index="${index}"
        >
        <span class="${task.completed ? "text-decoration-line-through" : ""}">
          ${task.text}
        </span>
      </div>
      <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">
        Delete
      </button>
    `;

    taskList.appendChild(li);
  });

  updateProgress(completedCount);
  attachEvents();
}

// Attach checkbox & delete events
function attachEvents() {
  document.querySelectorAll(".task-check").forEach(check => {
    check.addEventListener("change", (e) => {
      const index = e.target.dataset.index;
      tasks[index].completed = e.target.checked;
      updateUI();
    });
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      tasks.splice(index, 1);
      updateUI();
    });
  });
}

// Update progress bar & numbers
function updateProgress(completed) {
  const total = tasks.length;

  numbers.textContent = `${completed} / ${total}`;

  const percent = total === 0 ? 0 : (completed / total) * 100;
  progress.style.width = percent + "%";
}
