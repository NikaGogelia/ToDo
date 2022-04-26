"use strict";

const backgroundChange = document
  .querySelector(".btn-back-change")
  .querySelector("button");
const addTaskBtn = document.querySelector(".add-task").querySelector(".plus");
const delTaskInput = document.querySelector(".delete");
const taskInput = document.querySelector("input");
const toDoDiv = document.querySelector(".to-do-div");
const buttonsToggle = document.querySelectorAll(".change-task-display");
const loader = document.querySelector(".loader");
const div = document.querySelector("#Div");
const activeClassQuantity = document.querySelector(".active-task-quantity");

// To Do Functionality
const taskArray = [];

// Task Class
class Task {
  constructor(value, isActive) {
    this.value = value;
    this.checked = isActive;
  }
}

// Add Task Function
function addTask(array) {
  createTaskClass(Task, array);
  console.log(array);
  displayTask(array);
  showActiveQuantity(array);
}

// Create Task Function
function createTaskClass(taskClass, array) {
  let isActive = false;
  const task = new taskClass(taskInput.value, isActive);
  taskInput.value = "";
  array.push(task);
}

// Display Task Function
function displayTask(task) {
  let displayMenu = task.map((taskItem) => {
    return `<div class="task-div">
              <input type="checkbox" name="task-checkbox" class="checkbox">
              <span class="checkmark"></span>
              <p class="task">${taskItem.value}</p>
              <button class="removeCurrentTask"><i class="fa-solid fa-xmark fa-lg"></i></button>
          </div>`;
  });
  displayMenu = displayMenu.join("");
  toDoDiv.innerHTML = displayMenu;

  const checkbox = document.querySelectorAll('[type="checkbox"]');
  const removeTask = document.querySelectorAll(".removeCurrentTask");
  const taskText = document.querySelectorAll(".task");

  taskIsActive(checkbox, task, taskText);
  removeCurrentTask(removeTask, task);
}

// IsActive Function
function taskIsActive(checkbox, array, taskName) {
  array.forEach((elem, index) => {
    if (checkbox[index].checked === true) {
      elem.checked = true;
    } else if (checkbox[index] === false) {
      elem.checked = false;
    }
    if (elem.checked === true) {
      checkbox[index].checked = true;
      taskName[index].classList.add("checked-text");
    } else if (elem.checked === false) {
      checkbox[index].checked = false;
      taskName[index].classList.remove("checked-text");
    }
    checkbox[index].addEventListener("click", () => {
      if (checkbox[index].checked === true) {
        elem.checked = true;
        taskName[index].classList.add("checked-text");
        showActiveQuantity(array);
      } else {
        elem.checked = false;
        taskName[index].classList.remove("checked-text");
        showActiveQuantity(array);
      }
      console.log(array);
    });
  });
}

// Remove Current Task Function
function removeCurrentTask(button, array) {
  button.forEach((elem, i) => {
    elem.addEventListener("click", () => {
      elem.parentElement.remove();
      if (i === 0) {
        if (taskArray) {
          taskArray.shift();
          showActiveQuantity(taskArray);
        } else {
          array.shift();
          showActiveQuantity(array);
        }
      } else if (i === button.length - 1) {
        if (taskArray) {
          taskArray.pop();
          showActiveQuantity(taskArray);
        } else {
          array.pop();
          showActiveQuantity(array);
        }
      } else if (i > 0 && i < button.length - 1) {
        if (taskArray) {
          taskArray.splice(i, 1);
          showActiveQuantity(taskArray);
        } else {
          array.splice(i, 1);
          showActiveQuantity(array);
        }
      } else if (toDoDiv.innerHTML === "") {
        if (taskArray) {
          taskArray = [];
          showActiveQuantity(taskArray);
        } else {
          array = [];
          showActiveQuantity(array);
        }
      }
      console.log(array);
    });
  });
}

// Filter Tasks
buttonsToggle.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    let button = e.target.innerHTML;
    const taskCategory = taskArray.filter((taskItem) => {
      switch (button) {
        case "All":
          if (taskItem) {
            return taskItem;
          }
          break;
        case "Active":
          if (taskItem.checked === false) {
            return taskItem;
          }
          break;
        case "Completed":
          if (taskItem.checked === true) {
            return taskItem;
          }
          break;
      }
    });
    displayTask(taskCategory);
  });
});

// Add Task Button Click
addTaskBtn.addEventListener("click", () => {
  let value = addTaskBtn.id;
  switch (value) {
    case "dark-list-plus":
      if (taskInput.value === "") {
        alert("There Is No Task To Add!");
      } else {
        addTask(taskArray);
      }
      break;

    case "light-list-plus":
      if (taskInput.value === "") {
        alert("There Is No Task To Add!");
      } else {
        addTask(taskArray);
      }
      break;
  }
});

// Clear Add Task Input
delTaskInput.addEventListener("click", () => {
  taskInput.value = "";
});

// Change Background Color_Dark And Light
backgroundChange.addEventListener("click", () => {
  let value = backgroundChange.classList.value;
  switch (value) {
    case "light":
      window.location.href = "light.html";
      break;
    case "dark":
      window.location.href = "dark.html";
      break;
  }
});

// Loader
window.onload = () => {
  setTimeout(() => {
    loader.style.display = "none";
    div.style.display = "block";
  }, 1500);
};

// Add Active Class To Toggle Buttons
function removeToggle(items) {
  items.forEach((e) => e.classList.remove("active-item"));
}

buttonsToggle.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    let button = e.target;
    removeToggle(buttonsToggle);
    button.classList.add("active-item");
  });
});

// Show Active Task Quantity
function showActiveQuantity(array) {
  const activeQuantity = [];
  const actives = array.filter((active) => {
    return active.checked === false;
  });
  activeQuantity.push(...actives);
  activeClassQuantity.innerHTML = activeQuantity.length;
}
