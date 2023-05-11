let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let deleteAllBtn = document.querySelector(".del-all");
let tasksArray = [];

if (window.localStorage.getItem("Tasks")) {
  tasksArray = JSON.parse(localStorage.getItem("Tasks"));
}

getDataFromLocalStorage();

submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTask(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    toggleStatusOfTask(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

deleteAllBtn.onclick = function () {
  window.localStorage.removeItem("Tasks");
  tasksDiv.innerHTML = "";
};

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  tasksArray.push(task);
  addTasksToPage(tasksArray);
  addTasksToLocalStorage(tasksArray);
}

function addTasksToPage(array) {
  tasksDiv.innerHTML = "";
  array.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed === true) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
}

function addTasksToLocalStorage(array) {
  window.localStorage.setItem("Tasks", JSON.stringify(array));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("Tasks");
  if (data) {
    let myTasks = JSON.parse(data);
    addTasksToPage(myTasks);
  }
}

function deleteTask(taskId) {
  tasksArray = tasksArray.filter((task) => task.id != taskId);
  addTasksToLocalStorage(tasksArray);
}

function toggleStatusOfTask(taskId) {
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].id == taskId) {
      tasksArray[i].completed == false
        ? (tasksArray[i].completed = true)
        : (tasksArray[i].completed = false);
    }
  }
  addTasksToLocalStorage(tasksArray);
}
