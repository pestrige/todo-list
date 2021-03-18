const pageBody = document.querySelector('.body');
const todoList = pageBody.querySelector('.todo-list__list');
const newTaskForm = pageBody.querySelector('.todo-list__add-wrapper');
const newTaskFieldset = newTaskForm.querySelector('.todo-list__fieldset');
const newTaskInput = newTaskForm.querySelector('.todo-list__add-input');
const newTaskAddButton = newTaskForm.querySelector('.todo-list__add-btn');
const newTaskTemplate = pageBody.querySelector('#new-task').content.querySelector('.task');
const themeSelect = pageBody.querySelector('.theme-input');

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
	// скрываем поле ввода и изменяем кнопку
	newTaskAddButton.classList.remove('todo-list__add-btn--add');
	newTaskFieldset.classList.remove('todo-list__fieldset--shown');

};
const onNewTaskAddButtonClick = (evt) => {
	evt.preventDefault();
	// Проверяем, открыто ли поле ввода задачи
	const isTaskInputShown = newTaskFieldset.classList.contains('todo-list__fieldset--shown');
	if (isTaskInputShown) {
		//добавляем новую задачу в список
		addTask();
	} else {
		//показываем инпут для задачи
		newTaskAddButton.classList.add('todo-list__add-btn--add');
		newTaskFieldset.classList.add('todo-list__fieldset--shown');
	}
};
const onNewTaskFormSubmit = (evt) => {
	evt.preventDefault();
	addTask();
	newTaskAddButton.classList.remove('todo-list__add-btn--add');
	newTaskFieldset.classList.remove('todo-list__fieldset--shown');
}

// Удаление задач
const onTaskHandlerClick = (evt) => {
	const isTaskHandler = evt.target.classList.contains('task__input');
	const currentTask = evt.target.closest('.task');
	if (!isTaskHandler) {
		return false;
	}
	currentTask.classList.add('task--hide');
	currentTask.classList.add('task--transition');
	setTimeout(() => currentTask.remove(), 800);
};

// Переключение тем
const setTransition = () => {
	pageBody.classList.add('body--transition');
	setTimeout(() => {
		pageBody.classList.remove('body--transition');
	}, 1000);
};

const onThemeSelectChange = () => {
	setTransition();
	pageBody.classList.toggle('body--dark');
};

// Запускаем слушателей событий
todoList.addEventListener('click', onTaskHandlerClick);
newTaskForm.addEventListener('submit', onNewTaskFormSubmit);
newTaskAddButton.addEventListener('click', onNewTaskAddButtonClick);
themeSelect.addEventListener('change', onThemeSelectChange);