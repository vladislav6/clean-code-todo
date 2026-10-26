const addTaskInput = document.getElementById('new-task');
const addTaskButton = document.querySelector('.add-task');
const incompleteTaskHolder = document.querySelector('.incomplete');
const completedTasksHolder = document.querySelector('.complete');

const createNewTaskElement = function (taskString) {
  const taskListItem = document.createElement('li');
  taskListItem.className = 'section__item';

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.className = 'section__checkbox';

  const label = document.createElement('label');
  label.innerText = taskString;
  label.className = 'section__title-task section__task';

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'section__input section__task';

  const editButton = document.createElement('button');
  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'section__button edit';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'section__button delete';

  const deleteButtonImg = document.createElement('img');
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = 'delete__icon';
  deleteButtonImg.alt = ' ';

  deleteButton.appendChild(deleteButtonImg);
  taskListItem.append(checkBox, label, editInput, editButton, deleteButton);
  return taskListItem;
};

const addTask = function () {
  if (!addTaskInput.value) return;
  const taskListItem = createNewTaskElement(addTaskInput.value);

  incompleteTaskHolder.appendChild(taskListItem);
  bindTaskEvents(taskListItem);

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

const toggleTaskComplete = function () {
  const taskListItem = this.parentNode;
  const holder = this.checked ? completedTasksHolder : incompleteTaskHolder;
  holder.appendChild(taskListItem);
};

addTaskButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  checkBox.addEventListener('input', toggleTaskComplete);
};

const renderTasks = (holder) => holder.forEach((task) => bindTaskEvents(task));

renderTasks([...incompleteTaskHolder.children]);
renderTasks([...completedTasksHolder.children]);
