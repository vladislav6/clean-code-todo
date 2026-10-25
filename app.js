const addTaskInput = document.getElementById('new-task');
const addTaskButton = document.querySelector('.add-task');
const incompleteTaskHolder = document.querySelector('.incomplete');
const completedTasksHolder = document.querySelector('.complete');

const createNewTaskElement = function (taskString) {
  const taskListItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskString;
  label.className = 'section__title-task section__task';

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

  taskListItem.appendChild(checkBox);
  taskListItem.appendChild(label);
  taskListItem.appendChild(editInput);
  taskListItem.appendChild(editButton);
  taskListItem.appendChild(deleteButton);
  return taskListItem;
};

const addTask = function () {
  if (!addTaskInput.value) return;
  const taskListItem = createNewTaskElement(addTaskInput.value);

  incompleteTaskHolder.appendChild(taskListItem);
  bindTaskEvents(taskListItem, doTaskCompleted);

  addTaskInput.value = '';
};

const editTask = function () {
  const taskListItem = this.parentNode;

  const editInput = taskListItem.querySelector('input[type=text]');
  const label = taskListItem.querySelector('label');
  const editBtn = taskListItem.querySelector('.edit');
  const isEditMode = taskListItem.classList.contains('edit-mode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  taskListItem.classList.toggle('edit-mode');
};

const deleteTask = function () {
  const taskListItem = this.parentNode;
  const tasksList = taskListItem.parentNode;
  //Remove the parent list item from the ul.
  tasksList.removeChild(taskListItem);
};

const doTaskCompleted = function () {
  const taskListItem = this.parentNode;
  completedTasksHolder.appendChild(taskListItem);
  bindTaskEvents(taskListItem, doTaskIncomplete);
};

const doTaskIncomplete = function () {
  const taskListItem = this.parentNode;
  incompleteTaskHolder.appendChild(taskListItem);
  bindTaskEvents(taskListItem, doTaskCompleted);
};

const ajaxRequest = function () {};

addTaskButton.onclick = addTask;
addTaskButton.addEventListener('click', addTask);
addTaskButton.addEventListener('click', ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], doTaskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], doTaskIncomplete);
}
