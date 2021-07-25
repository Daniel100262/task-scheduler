var txtTaskName = document.querySelector("#txtTaskName");
var taskList = document.querySelector("#taskList");
var btnSave = document.querySelector("#btnSave");
var taskListElement = document.querySelector("#taskListElement");
var list = document.querySelector('input');

var itemsList = [];

class taskObj {
    constructor(id, taskName, checked) {
        this.id = id;
        this.taskName = taskName;
        this.checked = checked;
    }

    get id(){
        return this._id;
    }
    
    set id(value){
        this._id = value;
    }

    get taskName(){
        return this._taskName;
    }

    set taskName(value){
        this._taskName = value;
    }

    get checked(){
        return this._checked
    }

    set checked(value){
        this._checked = value;
    }

}

btnSave.addEventListener("click", function(){

    newTask = new taskObj();

    newTask.id = geraIdAleatorio();
    newTask.taskName = txtTaskName.value;
    newTask.checked = false;

    console.log("Salvando obj: "+newTask.taskName);

    addTaskToList(newTask, true);

    //addTaskToList(txtTaskName.value);
});

loadTaskListFromLocalStorage();


function addTaskToList(newOrExistentTask, isNewTask){

        console.log("Nome carregado: "+newOrExistentTask.taskName);
        
        var label = document.createElement("label");
        var checkbox = document.createElement("input");
        var taskDescription = document.createTextNode(newOrExistentTask.taskName);
        
        var deleteButton = document.createElement("button");

        var lineBreak = document.createElement("br");

        deleteButton.textContent = "Apagar";
        deleteButton.setAttribute('class', 'btnApagar');
        deleteButton.setAttribute('id', newOrExistentTask.id);
//        deleteButton.setAttribute('onclick', 'apagarTarefa()');

        deleteButton.addEventListener('click', function(){
            var div = this.parentElement;
            div.remove();
            apagarTarefa(newOrExistentTask.id);
        })

        //checkbox.innerText = taskName;

        checkbox.setAttribute('id', 'check');

        checkbox.addEventListener('change', function(){
            if(this.checked){
                var div = this.parentElement;
                div.style.textDecoration = "line-through";
                concluiTarefa();
            } else{
                var div = this.parentElement;
                div.style.textDecoration = "";
                desfazConclusaoTarefa();
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

        itemsList.push({ id: newOrExistentTask.id, name:newOrExistentTask.taskName, checked:newOrExistentTask.checked });

        if(isNewTask){ //Impede loop
            saveListToLocalStorage(itemsList);
        } 


        //document.querySelector("#divTasksAdded").appendChild(taskNameOnList);
}

function apagarTarefa(taskId){


    var localStorageTaskList = JSON.parse(localStorage.getItem("taskList"));

    var itemParaRemover;

    for(var i=0; i < localStorageTaskList.length; i++){

        if(localStorageTaskList[i].id == taskId){
            itemParaRemover = i;
        }



        //localStorage.removeItem(localStorageTaskList[i].id);

        //existentTask = new taskObj(localStorageTaskList[i].id, localStorageTaskList[i].name, localStorageTaskList[i].checked);

        
    }

    //remove item selected, second parameter is the number of items to delete 
    localStorageTaskList.splice(itemParaRemover, 1);

    console.log(localStorageTaskList);

   // Put the object into storage
    localStorage.setItem('taskList', JSON.stringify(localStorageTaskList));

    console.log("tentei apagar: "+itemParaRemover);


}

function concluiTarefa(taskName){
    console.log("Tentou concluir");
}

function desfazConclusaoTarefa(taskName){
    console.log("Tentou desfazer");
}

function saveListToLocalStorage (taskListToSave){
    localStorage.setItem("taskList", JSON.stringify(taskListToSave));
}

function loadTaskListFromLocalStorage(){

    var localStorageTaskList = (localStorage.getItem("taskList"));

    localStorageTaskList = JSON.parse(localStorageTaskList);

    for(var i=0; i < localStorageTaskList.length; i++){

        existentTask = new taskObj(localStorageTaskList[i].id, localStorageTaskList[i].name, localStorageTaskList[i].checked);

        addTaskToList(existentTask,false);
    }
}

function geraIdAleatorio(){
    return ((Math.random())*1000).toString(8).substring(10);
}


