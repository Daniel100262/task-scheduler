var txtTaskName = document.querySelector("#txtTaskName");
var taskList = document.querySelector("#taskList");
var btnSave = document.querySelector("#btnSave");
var taskListElement = document.querySelector("#taskListElement");
var list = document.querySelector('input');

var itemsList = [];

btnSave.addEventListener("click", function () {

    newTask = new taskObj();

    newTask.id = genRandomId();
    newTask.taskName = txtTaskName.value;
    newTask.checked = false;

    console.log("Salvando obj: " + newTask.taskName);

    addTaskToList(newTask, true);
});

loadTaskListFromLocalStorage();


function addTaskToList(newOrExistentTask, isNewTask) {

    //console.log("Nome carregado: " + newOrExistentTask.taskName);

    var label = document.createElement("label");
    var checkbox = document.createElement("input");
    var taskDescription = document.createTextNode(newOrExistentTask.taskName);

    var deleteButton = document.createElement("button");

    var lineBreak = document.createElement("br");

    deleteButton.textContent = "Apagar";
    deleteButton.setAttribute('class', 'btnApagar');
    deleteButton.setAttribute('id', newOrExistentTask.id);

    deleteButton.addEventListener('click', function () {
        var div = this.parentElement;
        div.remove();
        apagarTarefa(newOrExistentTask.id);
    })

    checkbox.setAttribute('id', 'check');

    checkbox.addEventListener('change', function () {
        if (this.checked) {
            var div = this.parentElement;
            div.style.textDecoration = "line-through";
            finalizeTask(newOrExistentTask);
        } else {
            var div = this.parentElement;
            div.style.textDecoration = "";
            unfinalizeTask(newOrExistentTask);
        }
    });

    checkbox.type = "checkbox";
    checkbox.name = newOrExistentTask.taskName; // give it a name we can check on the server side
    checkbox.value = newOrExistentTask.taskName; // make its value "pair"

    label.appendChild(checkbox); // add the box to the element
    label.appendChild(taskDescription);
    label.appendChild(deleteButton);
    label.appendChild(lineBreak);

    taskListElement.appendChild(label);

    txtTaskName.value = "";
    txtTaskName.focus;

    itemsList.push({ id: newOrExistentTask.id, name: newOrExistentTask.taskName, checked: newOrExistentTask.checked });

    if (isNewTask) { //Impede loop
        saveListToLocalStorage(itemsList);
    }


}

function apagarTarefa(taskId) {

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

function unfinalizeTask(taskId) {
    console.log("Tentou desfazer tarefa: "+taskId);

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
