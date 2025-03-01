import { nanoid } from './node_modules/nanoid/nanoid.js';

const description = document.getElementById("description");
const priorityTodo = document.getElementById("priority");
const statusTodo = document.getElementById("status");
const addTaskBtn = document.getElementById("addTaskBtn");
const todoListUl = document.getElementById("todoList");


document.addEventListener("DOMContentLoaded", () => {
    const todoList = JSON.parse(localStorage.getItem('todoList'));

    todoList.forEach(todoItem => {
        const li = createTask(todoItem);
        todoListUl.appendChild(li);
    });

});

addTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    const newTodo = {
        id: nanoid(),
        description: description.value,
        priority: priorityTodo.value,
        status: statusTodo.value
    }

    const li = createTask(newTodo);
    todoListUl.appendChild(li);

    localStorage.setItem("todoList", JSON.stringify([newTodo, ...todoList]));

    description.value = ''
})

function createTask({ description, priority, status, id }) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="description">${description}</span>
        <select id="priorityTodo">
            <option>${priority}</option>
            <option>ASAP</option>
            <option>Highest</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
        </select>
        <select id="statusTodo">
            <option>${status}</option>
            <option>ToDo</option>
            <option>In Progress</option>
            <option>Done</option>
        </select>
        <button class="delete-btn" id=${id}>❌</button>
    `;

    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
        deleteTask(id);
    });

    li.querySelector("#priorityTodo").addEventListener('change', (e) => {
        updatePriority(e.target.value, id)
    })

    li.querySelector("#statusTodo").addEventListener('change', (e) => {
        updateStatus(e.target.value, id)
    })

    return li
}

function updatePriority(newPriority, todoId) {
    let todoList = JSON.parse(localStorage.getItem('todoList'));
    todoList = todoList.map(todo => todo.id === todoId ? { ...todo, priority: newPriority } : todo )
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function updateStatus(newStatus, todoId) {
    let todoList = JSON.parse(localStorage.getItem('todoList'));
    todoList = todoList.map(todo => todo.id === todoId ? { ...todo, status: newStatus } : todo )
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function deleteTask(todoItemId) {
    let todoList = JSON.parse(localStorage.getItem('todoList'));

    todoList = todoList.filter(todo => todo.id !== todoItemId)
    console.log("todoList!!!!", todoList)

    localStorage.setItem("todoList", JSON.stringify(todoList));
}




