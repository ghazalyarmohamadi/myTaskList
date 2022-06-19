// selectors
const taskInput = document.querySelector(".task-input input");
const taskButton = document.querySelector(".task-button");
const taskBox = document.querySelector(".task-box");
const filters = document.querySelectorAll(".filters span");
const deleteAll = document.querySelector(".clear-btn");

let editId ;
let isEditedTask = false ;
let todos = JSON.parse(localStorage.getItem("todo-list"));

document.addEventListener("DOMContentLoaded",showTodo("all"));

taskInput.addEventListener("keyup", (e) => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask) {
        if (!isEditedTask) {
            if (!todos) {
                todos = [];
            }
            let taskInfo = {name:userTask , status:"pending"};
            todos.push(taskInfo);
        }
        else {
            isEditedTask = false ;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list",JSON.stringify(todos));
        showTodo("all");
    }
});

filters.forEach((button) => {
    button.addEventListener("click" , () => {
        document.querySelector("span.active").classList.remove("active");
        button.classList.add("active");
        showTodo(button.id);
    });
});

deleteAll.addEventListener("click", () => {
    todos.splice(0 , todos.length);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo("all"); 
});

function showTodo(filter){
    let li = "";
    if (todos) {
        todos.forEach((todo , id) => {
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all"){
                li += `
                <li class="task">
                  <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}/>
                    <p class="${isCompleted}">${todo.name}</p>
                  </label>
                  <div class="settings">
                    <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                    <ul class="task-menu">
                      <li onclick="editTask(${id},'${todo.name}')"><i class="fa fa-pen"></i>Edit</li>
                      <li onclick="deleteTask(${id})"><i class="fa fa-trash"></i>Delete</li>
                    </ul>
                  </div>
                </li>
                `;
            }
        });
    }
    taskBox.innerHTML = li || `<span>You don't have any task here!</span>`;
}

function showMenu(selectedTask){
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click" , (e) => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            taskMenu.classList.remove("show");
        }
    });
}

function editTask(taskId,taskName){
    editId = taskId ;
    isEditedTask = true ;
    taskInput.value = taskName;
}

function deleteTask(deleteId){
    todos.splice(deleteId,1);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo("all");    
}

function updateStatus(selectedTask){
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    }
    else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list",JSON.stringify(todos));
}






