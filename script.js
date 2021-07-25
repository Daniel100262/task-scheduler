var txtTaskName = document.querySelector("#txtTaskName");
var taskList = document.querySelector("#taskList");
var btnSave = document.querySelector("#btnSave");
var taskListElement = document.querySelector("#taskListElement");
var list = document.querySelector('input');

var itemsList = [];

btnSave.addEventListener("click", function(){
    addTaskToList(txtTaskName.value);
});

loadTaskListFromLocalStorage();


function addTaskToList(taskName){

    if(taskName){
        
        var label = document.createElement("label");
        var checkbox = document.createElement("input");
        var taskDescription = document.createTextNode(taskName);
        
        var deleteButton = document.createElement("button");

        var lineBreak = document.createElement("br");

        deleteButton.textContent = "Apagar";
        deleteButton.setAttribute('class', 'btnApagar');
        deleteButton.setAttribute('id', 'btnApagar')
//        deleteButton.setAttribute('onclick', 'apagarTarefa()');

        deleteButton.addEventListener('click', function(){
            var div = this.parentElement;
            div.remove();
        })

        checkbox.innerText = taskName;

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
        checkbox.name = taskName; // give it a name we can check on the server side
        checkbox.value = taskName; // make its value "pair"

        label.appendChild(checkbox); // add the box to the element
        label.appendChild(taskDescription);
        label.appendChild(deleteButton);
        label.appendChild(lineBreak);

        taskListElement.appendChild(label);

        txtTaskName.value = "";
        txtTaskName.focus;

        if(typeof taskName === "object"){
            NewTask = taskName.name;
            
            console.log(NewTask);
        } else {
            var id = geraIdAleatorio();
        }

        


        itemsList.push({ id: id, name:taskName, checked:false });

        //console.log(itemsList);



        saveListToLocalStorage(itemsList);

        //document.querySelector("#divTasksAdded").appendChild(taskNameOnList);
    } else {
        alert("Nome da tarefa não pode estar vazio!")
    }
}

function apagarTarefa(taskName){
    console.log("tentei apagar")
    itemsList.pop
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
        addTaskToList(localStorageTaskList[i]);
    }
}

function geraIdAleatorio(){
    return ((Math.random())*1000).toString(8).substring(10);
}


function task(){
    var id;
    var taskName;
    var checked;

    this.getId = function(){
        return id;
    }

    this.getTaskName = function(){
        return taskName;
    }

    this.getChecked = function(){
        return checked;
    }

    this.setId = function(value){
        id = value;
    }

    this.setTaskName = function(value){
        taskName = value;
    }

    this.setChecked = function(value){
        checked = value;
    }
}