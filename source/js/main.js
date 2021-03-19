const DEFAULT_TODO_LIST = '<li class="todo-list__item task"><p class="task__title">Выучить промисы</p><label class="task__label"><input class="task__input visually-hidden" type="checkbox"><span class="task__range"><span class="task__handler"></span></span></label></li><li class="todo-list__item task"><p class="task__title">Выучить async await</p><label class="task__label"><input class="task__input visually-hidden" type="checkbox"><span class="task__range"><span class="task__handler"></span></span></label></li><li class="todo-list__item task"><p class="task__title">Закрепить замыкания</p><label class="task-list__label"><input class="task__input visually-hidden" type="checkbox"><span class="task__range"><span class="task__handler"></span></span></label></li>';

const pageBody = document.querySelector('.body');
const todoList = pageBody.querySelector('.todo-list__list');
const newTaskForm = pageBody.querySelector('.todo-list__add-wrapper');
const newTaskFieldset = newTaskForm.querySelector('.todo-list__fieldset');
const newTaskInput = newTaskForm.querySelector('.todo-list__add-input');
const newTaskAddButton = newTaskForm.querySelector('.todo-list__add-btn');
const newTaskTemplate = pageBody.querySelector('#new-task').content.querySelector('.task');
const themeSelect = pageBody.querySelector('.theme-input');
const resetButton = pageBody.querySelector('.reset');
let todoListContent = null;

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
	// Записываем список задач в LocalStorage
	localStorage.setItem('todoList', todoList.innerHTML);
};
// скрываем поле ввода и модифицируем кнопку
const closeTaskInput = () => {
	newTaskAddButton.classList.remove('todo-list__add-btn--add');
	newTaskFieldset.classList.remove('todo-list__fieldset--shown');
};

// Обработчик кнопки
const onNewTaskAddButtonClick = (evt) => {
	evt.preventDefault();
	// Проверяем, открыто ли поле ввода задачи
	const isTaskInputShown = newTaskFieldset.classList.contains('todo-list__fieldset--shown');
	if (isTaskInputShown) {
		addTask();
		closeTaskInput();
	} else {
		//показываем инпут для задачи
		newTaskAddButton.classList.add('todo-list__add-btn--add');
		newTaskFieldset.classList.add('todo-list__fieldset--shown');
	}
};
const onNewTaskFormSubmit = (evt) => {
	evt.preventDefault();
	addTask();
	closeTaskInput();
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
	setTimeout(() => {
		currentTask.remove();
		localStorage.setItem('todoList', todoList.innerHTML);
	}, 800);
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

// Сбрасываем список задач
const onResetButtonClick = (evt) => {
	evt.preventDefault();

	localStorage.clear();
	todoList.innerHTML = DEFAULT_TODO_LIST;
};

// Перерисовываем список задач из LocalStorage
todoListContent = localStorage.getItem('todoList');

if (todoListContent) {
	console.log(todoListContent);
	todoList.innerHTML = todoListContent;
} else {
	console.log('todo-list is clear')
}

// Запускаем слушатели событий
todoList.addEventListener('click', onTaskHandlerClick);
newTaskForm.addEventListener('submit', onNewTaskFormSubmit);
newTaskAddButton.addEventListener('click', onNewTaskAddButtonClick);
themeSelect.addEventListener('change', onThemeSelectChange);
resetButton.addEventListener('click', onResetButtonClick);
