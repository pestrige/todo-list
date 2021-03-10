const todoList = document.querySelector('.todo-list__list');
const newTaskContainer = document.querySelector('.todo-list__add-wrapper');
const newTaskFieldset = newTaskContainer.querySelector('.todo-list__fieldset');
const newTaskInput = newTaskContainer.querySelector('.todo-list__add-input');
const newTaskAddButton = newTaskContainer.querySelector('.todo-list__add-btn');
const newTaskTemplate = document.querySelector('#new-task').content.querySelector('.task');

// Добавление задачи
const addTask = () => {
	const newTaskText = newTaskInput.value;
	const newTask = newTaskTemplate.cloneNode(true);
	const newTaskTextContainer = newTask.querySelector('.task__title');

	if (newTaskText === '') {
		return false;
	}
	// рендерим задачу в списке
	newTaskTextContainer.textContent = newTaskText;
	todoList.appendChild(newTask);
	newTaskInput.value = '';
};
const onNewTaskAddButtonClick = (evt) => {
	evt.preventDefault();
	const isTaskInputShown = newTaskFieldset.classList.contains('todo-list__fieldset--shown');
	if (isTaskInputShown) {
		//добавляем новую задачу в список
		addTask();
		newTaskAddButton.classList.remove('todo-list__add-btn--add');
		newTaskFieldset.classList.remove('todo-list__fieldset--shown');
	} else {
		//показываем инпут для задачи
		newTaskAddButton.classList.add('todo-list__add-btn--add');
		newTaskFieldset.classList.add('todo-list__fieldset--shown');
	}
};

// Удаление задач
const onTaskHandlerClick = (evt) => {
	const isTaskHandler = evt.target.classList.contains('task__input');
	const currentTask = evt.target.closest('.task');
	if (!isTaskHandler) {
		return false;
	}
	currentTask.classList.add('task--hide');
	setTimeout(() => currentTask.remove(), 800);
};

todoList.addEventListener('click', onTaskHandlerClick);
newTaskAddButton.addEventListener('click', onNewTaskAddButtonClick);