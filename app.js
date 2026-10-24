//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const addTaskInput = document.getElementById('new-task'); //Add a new task.
const addTaskButton = document.querySelector('.add-task'); //first button
const incompleteTaskHolder = document.querySelector('.incomplete'); //ul of #incompleteTasks
const completedTasksHolder = document.querySelector('.complete'); //completed-tasks

//New task list item
const createNewTaskElement = function (taskString) {
  const taskListItem = document.createElement('li');

  //input (checkbox)
  const checkBox = document.createElement('input'); //checkbx
  //label
  const label = document.createElement('label'); //label
  //input (text)
  const editInput = document.createElement('input'); //text
  //button.edit
  const editButton = document.createElement('button'); //edit button

  //button.delete
  const deleteButton = document.createElement('button'); //delete button
  const deleteButtonImg = document.createElement('img'); //delete button image

  label.innerText = taskString;
  label.className = 'section__title-task section__task';

  //Each elements, needs appending
  taskListItem.className = 'section__item';
  checkBox.type = 'checkbox';
  checkBox.className = 'section__checkbox';
  editInput.type = 'text';
  editInput.className = 'section__input section__task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'section__button edit';

  deleteButton.className = 'section__button delete';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = 'delete__icon';
  deleteButtonImg.alt = ' ';
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  taskListItem.appendChild(checkBox);
  taskListItem.appendChild(label);
  taskListItem.appendChild(editInput);
  taskListItem.appendChild(editButton);
  taskListItem.appendChild(deleteButton);
  return taskListItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!addTaskInput.value) return;
  const taskListItem = createNewTaskElement(addTaskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(taskListItem);
  bindTaskEvents(taskListItem, doTaskCompleted);

  addTaskInput.value = '';
};

//Edit an existing task.

const editTask = function () {
  const taskListItem = this.parentNode;

  const editInput = taskListItem.querySelector('input[type=text]');
  const label = taskListItem.querySelector('label');
  const editBtn = taskListItem.querySelector('.edit');
  const isEditMode = taskListItem.classList.contains('edit-mode');
  //If class of the parent is .editmode
  if (isEditMode) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  taskListItem.classList.toggle('edit-mode');
};

//Delete task.
const deleteTask = function () {
  const taskListItem = this.parentNode;
  const tasksList = taskListItem.parentNode;
  //Remove the parent list item from the ul.
  tasksList.removeChild(taskListItem);
};

//Mark task completed
const doTaskCompleted = function () {
  //Append the task list item to the #completed-tasks
  const taskListItem = this.parentNode;
  completedTasksHolder.appendChild(taskListItem);
  bindTaskEvents(taskListItem, doTaskIncomplete);
};

const doTaskIncomplete = function () {
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const taskListItem = this.parentNode;
  incompleteTaskHolder.appendChild(taskListItem);
  bindTaskEvents(taskListItem, doTaskCompleted);
};

const ajaxRequest = function () {};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addTaskButton.onclick = addTask;
addTaskButton.addEventListener('click', addTask);
addTaskButton.addEventListener('click', ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  //select ListItems children
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], doTaskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], doTaskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
