//Получить необходимые элементы страницы через querySelector() и сохранить ссылки на них в отдельных переменных.
const task_title = document.querySelector('#task-title')

const task_list = document.querySelector('#task-list')
const submit = document.querySelector('button[type=submit]')
const task_form = document.querySelector('#task-form')
const select = document.querySelector('#task-filter')
const task_count = document.querySelector('#task-count')
//Создать массив объектов tasks. У каждой задачи должны быть уникальный id, текстовое название и признак completed.
let task = [

]

//Реализовать функцию renderTasks(), которая очищает список и создаёт элементы li для текущих задач.

//При формировании элемента задачи использовать createElement(), textContent и classList. Не вставлять название задачи через innerHTML.
function renderTasks(task) {
    countTask(task)
    task_list.replaceChildren();
    for (elem of task) {
        const item = document.createElement('li');
        item.dataset.taskId = elem.id;
        item.classList.add('task');
        if (elem.completed === true){
            console.log('gig')
            item.style.textDecoration = 'line-through'
            item.textContent += `${elem.title}`;
        }else if (elem.completed === false){
            item.textContent = `${elem.title}`;
        }

        item.innerHTML += `<button type='button' data-action='toggle'>✅</button>`;
        item.innerHTML += `<button type='button' data-action='delete'>❌</button>`;
        task_list.append(item);
    }
}

renderTasks(task)

task_title.addEventListener('input', () => {
    task_title.setCustomValidity('');
});

//Обработать событие submit у формы: отменить стандартную отправку, прочитать и обрезать пробелы в названии, проверить значение и добавить новую задачу в массив.
task_form.addEventListener('submit', event => {
    event.preventDefault()
    let title = task_title.value.trim()
    task_title.setCustomValidity('')
    if (title === '') {
        task_title.setCustomValidity('Введите название');
        task_title.reportValidity();
        return
    } else if (title.length < 3) {
        task_title.setCustomValidity('Задача должна быть больше 3 символов')
        task_title.reportValidity();
        return;
    } else if (title.length > 80) {
        task_title.setCustomValidity('Задача должна быть меньше 80 символов')
        task_title.reportValidity();
        return;
    }
    task.push({
        id: Date.now(),
        title,
        completed: false
    });
    renderTasks(task);
    task_form.reset();
    console.log('hi')
})

//Реализовать возможность отмечать задачу выполненной и возвращать её в активное состояние.
//Реализовать удаление задачи. Обработку действий в списке выполнить через делегирование событий.

task_list.addEventListener('click', event => {
    const target = event.target.closest('button[data-action]')

    if (!target || !task_list.contains(target)) {
        return
    }


    const taskElement = target.closest('[data-task-id]');
    if (!taskElement) return;
    const taskId = Number(taskElement.dataset.taskId);

    switch (target.dataset.action) {
        case 'toggle':
            console.log(taskId)
            toggleTask(taskId);
            break;
        case 'delete':
            console.log(taskId)
            deleteTask(taskId)
            break;
    }
})

function toggleTask(id) {
    for (elem of task) {
        if (elem.id === id) {
            // elem.completed = 'true'
            if (elem.completed === false) {
                elem.completed = true
                toggle(true, id)
                continue
            }
            if (elem.completed === true) {
                elem.completed = false
                toggle(false, id)
                continue
            }
        }
    }
    console.log(task)
}

function toggle(op, id){
    const li = document.querySelector(`[data-task-id="${id}"]`)
    if (op === true){
        li.style.textDecoration = 'line-through';
    }
    if (op === false){
        li.style.textDecoration = 'none';
    }
}


//Реализовать фильтр: все задачи, только активные, только выполненные.
select.addEventListener('change', event=>{
    const value = event.target.value
    console.log(value)
    if (value === 'active'){
        task_filtred = task.filter(op => op.completed === false)
        console.log(task_filtred)
        renderTasks(task_filtred);
    } else if (value === 'completed'){
        task_filtred = task.filter(op => op.completed === true)
        console.log(task_filtred)
        renderTasks(task_filtred);
    } else if (value === 'all'){
        task_filtred = task
        console.log(task_filtred)
        renderTasks(task_filtred);
    }

})

function countTask(task){
    const c = task.length

    if (c === 0){
        task_count.innerHTML = `<p id='task-count'>Задач нет</p>`
    }else {
        task_count.innerHTML = `<p id='task-count'>Всего задач: ${c}</p>`
    }
}
countTask(task)



function deleteTask(id) {
    task = task.filter(task => task.id !== id);
    renderTasks(task);
}

