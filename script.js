var txtTaskName = document.querySelector("#txtTaskName");
var taskList = document.querySelector("#taskList");
var btnSave = document.querySelector("#btnSave");
var taskListElement = document.querySelector("#taskListElement");
var list = document.querySelector('input');

var itemsList = [];

var checkbox = document.querySelector("input[name=checkbox]");



//loadTaskListFromLocalStorage();

list.addEventListener('click', function(ev) {
      ev.target.classList.toggle('checked');
  }, false);
  


btnSave.addEventListener("click", function(){
    addTaskToList(txtTaskName.value);
});

function addTaskToList(taskName){
    if(taskName){
        
        var label = document.createElement("label");
        var checkbox = document.createElement("input");
        //var taskDescription = document.createTextNode(taskName);
        
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

        //document.querySelector("#divTasksAdded").appendChild(taskNameOnList);
    } else {
        alert("Nome da tarefa não pode estar vazio!")
    }
}

function apagarTarefa(){
    console.log("tentei apagar")
    var botoesFechar = document.querySelectorAll("#btnApagar");
    for (i = 0; i < botoesFechar.length; i++) {
        botoesFechar[i].onclick = function() { //Se houver um clique em qualquer botao dentro de botoesFechar...
          
        }
      }
}

function concluiTarefa(){
    console.log("Tentou concluir");
}

function desfazConclusaoTarefa(){
    console.log("Tentou desfazer");
}

function saveListToLocalStorage (){
    localStorage.setItem("taskList", JSON.stringify(itemsList));
}

function loadTaskListFromLocalStorage(){
    var localStorageTaskList = JSON.parse(localStorage.getItem("taskList"));
    for(var i=0; i < localStorageTaskList.lenght; i++){
        addTaskToList(localStorageTaskList[i]);
    }
}


