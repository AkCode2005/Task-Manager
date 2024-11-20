const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const prioritySelector = document.getElementById("priority-selector");
const dueDate = document.getElementById("due-date");
const addButton = document.getElementById("add-button");

const filterAll = document.getElementById("filter-all");
const filterCompleted = document.getElementById("filter-completed");
const filterPending = document.getElementById("filter-pending");


addButton.addEventListener("click", function () {
  const taskText = inputBox.value.trim();
  const priority = prioritySelector.value; 
  const dueDateValue = dueDate.value; 


  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create new list item
  const li = document.createElement("li");
  li.classList.add(priority);

  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <span class="task-meta">[${priority.toUpperCase()}] ${
    dueDateValue ? `Due: ${dueDateValue}` : ""
  }</span>
    <button class="delete-btn">Delete</button>
  `;

  
  li.addEventListener("click", function (e) {
    if (!e.target.classList.contains("delete-btn")) {
      li.classList.toggle("checked");
    }
  });

 
  li.querySelector(".delete-btn").addEventListener("click", function () {
    li.remove();
  });

  listContainer.appendChild(li);

 
  inputBox.value = "";
  prioritySelector.value = "low";
  dueDate.value = "";
});

// Filter Tasks
function filterTasks(filterType) {
  const tasks = listContainer.querySelectorAll("li");

  tasks.forEach((task) => {
    switch (filterType) {
      case "all":
        task.style.display = "flex"; // Show all tasks
        break;
      case "completed":
        task.style.display = task.classList.contains("checked")
          ? "flex"
          : "none";
        break;
      case "pending":
        task.style.display = !task.classList.contains("checked")
          ? "flex"
          : "none"; 
        break;
    }
  });
}


filterAll.addEventListener("click", function () {

  filterAll.classList.add("active");
  filterCompleted.classList.remove("active");
  filterPending.classList.remove("active");

  filterTasks("all");
});

filterCompleted.addEventListener("click", function () {
  
  filterCompleted.classList.add("active");
  filterAll.classList.remove("active");
  filterPending.classList.remove("active");

  filterTasks("completed");
});

filterPending.addEventListener("click", function () {

  filterPending.classList.add("active");
  filterAll.classList.remove("active");
  filterCompleted.classList.remove("active");

  filterTasks("pending");
});