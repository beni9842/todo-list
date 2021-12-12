const projectItemHtml = (project) => `
    <tr class="project-item">
        <td class="project-name">${project.name}</td>
        <td class="project-open">
        <button class="project-open-btn">open</button>
        </td>
        <td class="project-delete">
        <button class="project-delete-btn">delete</button>
        </td>
    </tr>
`;

const todoItemHtml = (todo) => `
    <tr class="todo-item">
        <td class="todo-name">${todo.name}</td>
        <td class="todo-desc">${todo.desc}</td>
        <td class="todo-date">${todo.date}</td>
        <td class="todo-priority">${todo.priority}</td>
        <td class="todo-delete"><button class="todo-delete-btn">delete</button></td>
    </tr>
`;


import model from "./model";


const page = (() => {
    const projectList = document.querySelector('#project-list');
    const tdList = document.querySelector('#todo-list');
    const title = document.querySelector('#project-display-title');

    let project;
    const loadProjects = () => {
        projectList.innerHTML = '';
        model.getProjects().forEach(project => {
            projectList.innerHTML += projectItemHtml(project);
        });
        const projectCells = projectList.querySelectorAll('.project-item');
        projectCells.forEach(cell => {
            const openBtn = cell.querySelector('.project-open-btn');
            const delBtn = cell.querySelector('.project-delete-btn');
            const projectName = cell.querySelector('.project-name').textContent;
            openBtn.addEventListener('click', () => {
                loadTodos(projectName);
            });
            delBtn.addEventListener('click', () => {
                model.rmProject(projectName);
                project = null;
                loadProjects();
                loadTodos(model.getProjects()[0].name)
            });
        });
    }
    const loadTodos = (projectName) => {
        project = model.getProject(projectName);
        if (project) {
            title.textContent = projectName;
            tdList.innerHTML = '';
            project.getTodos().forEach(todo => {
                tdList.innerHTML += todoItemHtml(todo);
            });
            const tdCells = tdList.querySelectorAll('.todo-item');
            tdCells.forEach(cell => {
                const tdName = cell.querySelector('.todo-name').textContent;
                const deleteBtn = cell.querySelector('.todo-delete-btn');
                deleteBtn.addEventListener('click', () => {
                    console.log(tdName);
                    project.rmTodo(tdName);
                    loadTodos(project.name);
                })
            });
        }
    }

    const projectForm = document.getElementById('new-project-form');
    projectForm.addEventListener('submit', (form) => {
        form.preventDefault();
        model.addProject(projectForm['new-project-name'].value);
        loadProjects();
    });

    const todoForm = document.getElementById('new-todo-form');
    todoForm.addEventListener('submit', (form) => {
        form.preventDefault();
        project.addTodo(todoForm['new-todo-name'].value, todoForm['new-todo-desc'].value, todoForm['new-todo-date'].value, todoForm['new-todo-priority'].value);
        loadTodos(project.name);
    });    

    return { loadProjects, loadTodos };
})();

export default page;