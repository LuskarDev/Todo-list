const taskInput = document.querySelector(".input-text input"),
taskBox = document.querySelector(".lista ul"),
cleaAll = document.querySelector(".filters button")

let filters = document.querySelectorAll(".filters span");

let editId;
let EditedTask = true;


let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click",() => {
        let span = document.querySelector("span.active");
        if(span){
            
            span.classList.remove("active")
        }
        btn.classList.add("active");
        showTodo(btn.id)
    });
})

function showTodo(filter){
    let li = " ";
    if(todos){
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            
            if(filter == todo.status || filter == "all"){
                
               li += `<li>
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">
                                    ${todo.name}
                                </p>
                            </label>
                            <div onclick="showMenu(this)" class="settings">
                                <i  id="settings" class="fa-solid fa-ellipsis-vertical"></i>
                                <div  class="options">
                                    <span onclick="editTask(${id}, '${todo.name}')" ><i class="fa-solid fa-pen-to-square"></i> Editar</span>
                                    <span onclick="deleteTask(${id})"><i class="fa-solid fa-trash-can"></i> Delete</span>
                                </div>
                            </div>
                        </li>
                        `
            }
        });
    }
    taskBox.innerHTML  = li 
    if(taskBox.innerHTML == " "){
        li += `<span> You don't have any task here </span> `
        taskBox.innerHTML = li
    }
   
}

showTodo("all");

function showMenu(selectedTask){
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.toggle("show");
}

function editTask(taskId, taskName){
    editId = taskId;
    EditedTask = true;
    taskInput.value = taskName;
}

function deleteTask(deletedId){
    todos.splice(deletedId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
}

cleaAll.addEventListener("click", () => {
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
})

function updateStatus(selectedTask){
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");
        //adiciona a tarefa a lista compl ete 
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        //adiciona a tarefa da lista pending
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
 
        if(e.key == "Enter" && userTask){
            if(!EditedTask){
            if(!todos){
                todos = [];
            }
            let taskInfo = {name : userTask, status: "pending"};
                todos.push(taskInfo); // adiciona novas tarefas na lista
    }else {
        EditedTask = false;
        todos[editId].name = userTask;
    } 
            taskInput.value = "";
                
                localStorage.setItem("todo-list", JSON.stringify(todos));
            showTodo()
        }
})

