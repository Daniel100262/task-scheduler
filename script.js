var txtTaskName = document.querySelector("#txtTaskName");
var taskList = document.querySelector("#taskList");
var btnSave = document.querySelector("#btnSave");
var taskListElement = document.querySelector("#taskListElement");
var list = document.querySelector('input');
var form = document.querySelector("#form");

form.addEventListener("submit", function(event){
    event.preventDefault();
})

var itemsList = [];

btnSave.addEventListener("click", function () {

    newTask = new taskObj();

    newTask.id = genRandomId();
    newTask.taskName = txtTaskName.value;
    newTask.checked = false;

    addTaskToList(newTask, true);
});

loadTaskListFromLocalStorage();


function addTaskToList(newOrExistentTask, isNewTask) {

    //Criando elementos
    var label = document.createElement("label");
    var checkbox = document.createElement("input");
    var taskDescription = document.createTextNode(newOrExistentTask.taskName);
    var divisionLine = document.createElement("hr");
    var deleteButton = document.createElement("button");
    
    //Customizacoes
    deleteButton.setAttribute('class', 'fa fa-trash btnApagar');
    deleteButton.setAttribute('data-toggle', 'modal');
    deleteButton.setAttribute('data-target', '#exampleModal');
    deleteButton.innerText = " Deletar";
    checkbox.setAttribute('class', 'form-check-input me-2');

    if(newOrExistentTask.checked){
        label.style.textDecoration = "line-through";
        checkbox.setAttribute('checked', true);
    }
    deleteButton.setAttribute('id', newOrExistentTask.id);

    deleteButton.addEventListener('click', function () {

        if (confirm('Realmente deseja deletar esta tarefa?')) {
            var taskElementItem = this.parentElement;
            taskElementItem.remove();
            deleteTask(newOrExistentTask.id);
        }
    })

    checkbox.setAttribute('id', 'check');

    checkbox.addEventListener('change', function () {
        if (this.checked) {
            var taskElementItem = this.parentElement;
            taskElementItem.style.textDecoration = "line-through";
            finalizeTask(newOrExistentTask);
        } else {
            var taskElementItem = this.parentElement;
            taskElementItem.style.textDecoration = "";
            unfinalizeTask(newOrExistentTask);
        }
    });

    checkbox.type = "checkbox";
    checkbox.name = newOrExistentTask.taskName; // give it a name we can check on the server side
    checkbox.value = newOrExistentTask.taskName; // make its value "pair"

    label.appendChild(checkbox); // add the box to the element
    label.appendChild(taskDescription);
    label.appendChild(deleteButton);
    label.appendChild(divisionLine);
    
    taskListElement.appendChild(label);

    txtTaskName.value = "";
    txtTaskName.focus;

    itemsList.push({ id: newOrExistentTask.id, name: newOrExistentTask.taskName, checked: newOrExistentTask.checked });

    if (isNewTask) { //Impede loop
        saveListToLocalStorage(itemsList);
    }
}

function deleteTask(taskId) {

    var localStorageTaskList = JSON.parse(localStorage.getItem("taskList"));
    var itemParaRemover;

    for (var i = 0; i < localStorageTaskList.length; i++) {
        if (localStorageTaskList[i].id == taskId) {
            itemParaRemover = i;
        }
    }

    localStorageTaskList.splice(itemParaRemover, 1);
    localStorage.setItem('taskList', JSON.stringify(localStorageTaskList));
}

function finalizeTask(task) {
    console.log("Tentou concluir tarefa: "+task.id);

    var localStorageTaskList = JSON.parse(localStorage.getItem("taskList"));
    var itemParaAltarar;

    for (var i = 0; i < localStorageTaskList.length; i++) {
        if (localStorageTaskList[i].id == task.id) {
            itemParaAltarar = i;
        }
    }

    itemsList[itemParaAltarar] = { id: task.id, name: task.taskName, checked: true };

    saveListToLocalStorage(itemsList);
}

function unfinalizeTask(task) {
    console.log("Tentou desfazer tarefa: "+task.id);
    var localStorageTaskList = JSON.parse(localStorage.getItem("taskList"));
    var itemParaAltarar;

    for (var i = 0; i < localStorageTaskList.length; i++) {
        if (localStorageTaskList[i].id == task.id) {
            itemParaAltarar = i;
        }
    }

    itemsList[itemParaAltarar] = { id: task.id, name: task.taskName, checked: false };

    saveListToLocalStorage(itemsList);
}

function saveListToLocalStorage(taskListToSave) {
    localStorage.setItem("taskList", JSON.stringify(taskListToSave));
}

function loadTaskListFromLocalStorage() {

    var localStorageTaskList = JSON.parse(localStorage.getItem("taskList"));

    for (var i = 0; i < localStorageTaskList.length; i++) {
        existentTask = new taskObj(localStorageTaskList[i].id, localStorageTaskList[i].name, localStorageTaskList[i].checked);
        addTaskToList(existentTask, false);
    }
}

function genRandomId() {
    return ((Math.random()) * 1000).toString(8).substring(10);
}
