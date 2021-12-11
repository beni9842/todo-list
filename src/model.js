
const Project = (name) => {
    return { 
        name: name,
        todoList: []
    };
}
const Todo = (name, desc, date, priority) => {
    return {
        name: name,
        desc: desc,
        date, date,
        priority: priority
    };
}


const model = (() => {

    function load() {
        return JSON.parse(localStorage.getItem('projects'));
    }
    
    function save(projects) {
        localStorage.setItem('projects', JSON.stringify(projects));
    }    

    const getProjects = () => {
        const projects = load();
        if (projects) {
            return projects;
        } else {
            return [];
        }
    }

    const addProject = (name) => {
        if (getProjectIdx(name) == -1) {
            let projects = getProjects();
            if (!projects) {
                projects = [];
            }
            projects.push(Project(name));
            save(projects);
        }
    }

    const rmProject = (name) => {
        let projects = getProjects();
        projects.splice(getProjectIdx(name), 1);
        save(projects);
    }

    const getProjectIdx = (name) => {
        let projects = getProjects();
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name == name) {
                return i;
            }
        }
        return -1;
    }

    const getProject = (name) => {
        let projects = getProjects();
        const index = getProjectIdx(name);

        if (index == -1) {
            return null;
        }

        const addTodo = (tdName, tdDesc, tdDate, tdPriority) => {
            if (getTodoIdx(tdName) == -1) {
                projects[index].todoList.push(Todo(tdName, tdDesc, tdDate, tdPriority));
                save(projects);
            }
        }

        const rmTodo = (tdName) => {
            let todos = getTodos();
            todos.splice(getTodoIdx(tdName), 1);
            projects[index].todoList = todos;
            save(projects);
        }

        const getTodos = () => {
            return projects[index].todoList;
        };

        const getTodoIdx = (tdName) => {
            const todos = getTodos();
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].name == tdName) {
                    return i;
                }
            }
            return -1;
        }


        return {
            addTodo: addTodo,
            rmTodo: rmTodo,
            getTodos: getTodos,
            name: projects[index].name
        };

    }

    return { getProjects, addProject, rmProject, getProject, save, load }
})();

export default model;