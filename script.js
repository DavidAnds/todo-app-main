const body = document.querySelector("body");
const themeBtn = document.querySelector(".theme-btn");
const todoList = document.querySelector(".todo-list");
const todoForm = document.querySelector(".todo-form");
const todoCount = document.querySelector(".todo-count");
const clearBtn = document.querySelector(".text-btn");
const filterBtn = document.querySelectorAll(".todo-filter button");
let count = 0;
const input = document.querySelector(".todo-input");

themeBtn.addEventListener("click", themeChange);

function themeChange() {
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("light");
    themeBtn.children[0].setAttribute("src", "./images/icon-moon.svg");
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
    themeBtn.children[0].setAttribute("src", "./images/icon-sun.svg");
  }
}

todoForm.addEventListener("submit", createTodos);

function createTodos(e) {
  e.preventDefault();
  if (input.value !== "") {
    const todo = document.createElement("li");
    todo.classList.add("todo-item");
    todo.innerHTML = `<button class="check-btn"><img src="./images/icon-check.svg"></button><span>${input.value}</span><button class="delete-btn"><img src="./images/icon-cross.svg"></button>`;
    todoList.appendChild(todo);
    input.value = "";
    count += 1;
    todoCount.innerText = `${count} items left`;

    todo.querySelector(".check-btn").addEventListener("click", () => {
      if (todo.classList.contains("completed")) {
        count += 1;
        todo.classList.remove("completed");
        todoCount.innerText = `${count} items left`;
      } else {
        count -= 1;
        todo.classList.add("completed");
        todoCount.innerText = `${count} items left`;
      }
    });

    todo.querySelector(".delete-btn").addEventListener("click", () => {
      todo.remove();
      count -= 1;
      todoCount.innerText = `${count} items left`;
    });

    clearBtn.addEventListener("click", clearCompleted);

    filterBtn.forEach((btn) => {
      btn.addEventListener("click", filterTodo);
    });
  } else {
    return;
  }
}

function clearCompleted() {
  const allCompleted = document.querySelectorAll(".completed");

  allCompleted.forEach((item) => item.remove());
}

function filterTodo(e) {
  const todoItem = document.querySelectorAll(".todo-item");

  filterBtn.forEach((btn) => {
    btn.classList.remove("selected");
  });

  todoItem.forEach(item => {
      if(item.classList.contains('hidden')){
          item.classList.remove('hidden')
      }
  })
  

  if (e.currentTarget.classList.contains("btn-completed")) {
    e.currentTarget.classList.add("selected");
    todoItem.forEach((item) => {
      if (!item.classList.contains("completed")) {
        item.classList.add('hidden')
      } 
    });
  } else if (e.currentTarget.classList.contains("btn-active")) {
    e.currentTarget.classList.add("selected");
    todoItem.forEach((item) => {
        if (item.classList.contains("completed")) {
          item.classList.add('hidden')
        } 
      });
  } else {
    e.currentTarget.classList.add("selected");
  }
}
