//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listner
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
//Functions
function addTodo(event) {
    //prevent from submitting 
    event.preventDefault();

    //Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //Create list item
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //add todo to local storage
    saveLocalTodos(todoInput.value);

    //create  mark mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa fa-check"></>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //create trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    //delete
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }
    //complete
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
        }
    })
}



function saveLocalTodos(todo) {
    //check if we have a todo
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    //push new todo
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(e) {

    //check if we have a todo
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        //Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        //Create list item
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //create  mark mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa fa-check"></>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //create trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fa fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //append to the list 
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    //check if we have a todo
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}