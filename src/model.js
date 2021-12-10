
const Todo = (name, desc, date, priority) => {
    return { name, desc, date, priority };
}
const Project = (name, todoList) => {
    return { name, todoList };
}

const projectManager = (() => {
    let projects = [];
    const getProjectIdx = (name) => {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name == name) {
                return i;
            }
        }
        console.log(`error: no project with name matching "${name}"`);
        return -1;
    }
    const getProject = (name) => {
        const projectIdx = getProjectIdx(name);
        if (projectIdx >= 0) {
            return projects[projectIdx];
        } else {
            return null;
        }
    }
    const addProject = (name) => {
        projects.push(Project(name, []));
    }
    const rmProject = (name) => {
        const projectIdx = getProjectIdx(name);
        if (projectIdx >= 0) {
            projects.splice(projectIdx, 1);
        }
    }
    const getTodoIdx = (projectName, tdName) => {
        const projectIdx = getProjectIdx(projectName);
        if (projectIdx >= 0) {
            const project = projects[projectIdx];
            for (let i = 0; i < project.todoList.length; i++) {
                if (project.todoList[i].name == tdName) {
                    return i;
                }
            }
            console.log(`error: no todo with name matching "${tdName}"`);
        }
        return -1;
    }
    const getTodo = (projectName, tdName) => {
        const todoIdx = getTodoIdx(projectName, tdName);
        if (todoIdx >= 0) {
            const projectIdx = getProjectIdx(projectName);
            return (projects[projectIdx].todoList[todoIdx]);
        } else {
            return -1;
        }
    }
    const addTodo = (projectName, tdName, tdDesc, tdDate, tdPriority) => {
        const projectIdx = getProjectIdx(projectName);
        if (projectIdx >= 0) {
            projects[projectIdx].todoList.push(Todo(tdName, tdDesc, tdDate, tdPriority));
        }
    }
    const rmTodo = (projectName, tdName) => {
        const projectIdx = getProjectIdx(projectName);
        if (projectIdx >= 0) {
            for (let i = 0; i < projects[projectIdx].todoList.length; i++) {
                if (projects[projectIdx].todoList[i].name == tdName) {
                    projects[projectIdx].todoList.splice(i, 1);
                    return;
                }
            }
        }
    }
    const save = () => {
        localStorage.setItem('projects', JSON.stringify(projects));
    }
    const load = () => {
        projects = JSON.parse(localStorage.projects);
    }
    const clear = () => {
        localStorage.removeItem('projects');
    }

    return {
        projects,
        addProject,
        rmProject,
        getProject,
        addTodo,
        rmTodo,
        getTodo,
        save,
        load,
        clear
    }
})();

export default projectManager;