import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.mjs'

const description = document.getElementById("description");
const priority = document.getElementById("priority");
const statusTodo = document.getElementById("status");
const addTaskBtn = document.getElementById("addTaskBtn");


addTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    const newTodo = {
        id: nanoid(),
        description: description.value,
        priority: priority.value,
        status: statusTodo.value
    }

    localStorage.setItem("todoList", JSON.stringify([newTodo, ...todoList]));
})