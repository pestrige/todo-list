const todoList2 = document.querySelector('.todo-list');

const onTaskHandlerClick = (evt) => {
	const isTaskHandler = evt.target.classList.contains('task__input');
	const currentTask = evt.target.closest('.task');
	if (!isTaskHandler) {
		return false;
	}
	currentTask.classList.add('task--hide');
	setTimeout(() => currentTask.remove(), 800);
}

todoList2.addEventListener('click', onTaskHandlerClick);