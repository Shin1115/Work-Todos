var inputBox = document.querySelector(".inputField input");
var addBtn = document.querySelector(".inputField button");
var editButton = document.querySelector("#editButton");
var todolist = document.querySelector(".todoList");
var deleteAllBtn = document.querySelector(".footer-card button");
var fitter_Todo = document.querySelector(".select-todo");
var listTasks = [];
var FLAG = "add";
var currentIndex = 0;
fitter_Todo.addEventListener("click",fitterTodo);
class Task {
  constructor(name, complete) {
    this.name = name;
    this.complete = complete;
    this.dateCreated = Date.now();
  }
  completed() {
    this.complete = true;
  }
  uncompleted() {
    this.complete = false;
  }

  editTask(content) {
    this.name = content;
  }
}

function fitterTodo(index){
const tasks = todolist.childNodes;
tasks.forEach(function(todo) {
    switch(index.target.value){
      case "all":
        todo.style.display="block";
        break;
      case "complete-side":
        if(todo.classList.contains("complete")){
               todo.style.display= "block";
          }else{
               todo.style.display= "none";
            }
        break;
      case "incomplete":
        if(!todo.classList.contains("complete")){
               todo.style.display= "block";
          }else{
               todo.style.display= "none";
            }
        break;
}
});
}

inputBox.onkeyup = () => {
  // lấy giá trị khi user nhập vào
  let userEnteredValue = inputBox.value;
  if (userEnteredValue.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};
showTasks();
editButton.addEventListener("click", function () {
  if (FLAG === "edit") {
    listTasks[currentIndex].editTask(inputBox.value);
console.log(currentIndex);
    FLAG = "add";
console.log(FLAG)
    showTasks();
    updateTextbox();
    updateButton();
  }
});

addBtn.addEventListener("click", function () {
  //lấy giá trị nhập vào
    let userEnteredValue = inputBox.value;
    let newTask = new Task(userEnteredValue, false);
    listTasks.push(newTask);
    showTasks();
});



function showTasks() {
  var newList = "";
  listTasks.forEach((element, index) => {
    if (element.complete == true) {
      newList += `<li class="todo-item complete" id="${index}">   ${element.name}    
                <span class="icon" onclick="deleteTask(${index})"> 
                    <i class="fas fa-trash"></i>
                </span>
                <span class="icon2" onclick="editTask(${index})">
                    <i class="fas fa-edit"></i>
                </span>
                <span class="icon-finish" onclick="checkComplete(${index})">
                        <i class="fas fa-check-circle"></i>
                </span>
            </li>`;
    } else {
      newList += `<li class="todo-item" id="${index}"> 
                ${element.name}
                <span class="icon" onclick="deleteTask(${index})"> 
                    <i class="fas fa-trash"></i>
                </span>
                <span class="icon2" onclick="editTask(${index})">
                    <i class="fas fa-edit"></i>
                </span>
                <span class="icon-finish" onclick="checkComplete(${index})">
                        <i class="fas fa-check-circle"></i>
                </span>
            </li>`;
    }
  });
  todolist.innerHTML = newList;
  updateTextbox();
  updateButton();
}

function updateButton() {
  if (listTasks.length > 0) {
    deleteAllBtn.classList.add("active");
  } else {
    deleteAllBtn.classList.remove("active");
  }
}

function updateTextbox() {
  inputBox.value = "";
}

function deleteTask(index) {
  if (confirm("Bạn thật sự muốn xóa")) {
    listTasks.splice(index, 1);
    showTasks();
  }
}
deleteAllBtn.onclick = () => {
  if (confirm("Bạn thật sự muốn xóa")) {
    listTasks = [];
    showTasks();
  }
};

function editTask(index) {
    var task = listTasks[index];
    inputBox.value = task.name;
    FLAG = "edit"
    currentIndex = index;
}

function checkComplete(index) {
    listTasks[index].completed();
    showTasks();
}
