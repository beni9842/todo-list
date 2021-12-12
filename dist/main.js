/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ \"./src/model.js\");\n/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page */ \"./src/page.js\");\n\n\n\nif (_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getProjects().length == 0) {\n    _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addProject('default');\n    _page__WEBPACK_IMPORTED_MODULE_1__[\"default\"].loadTodos('default');\n}\n_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"].loadProjects();\n_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"].loadTodos(_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getProjects()[0].name);\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\nconst Project = (name) => {\n    return { \n        name: name,\n        todoList: []\n    };\n}\nconst Todo = (name, desc, date, priority) => {\n    return {\n        name: name,\n        desc: desc,\n        date, date,\n        priority: priority\n    };\n}\n\n\nconst model = (() => {\n\n    function load() {\n        return JSON.parse(localStorage.getItem('projects'));\n    }\n    \n    function save(projects) {\n        localStorage.setItem('projects', JSON.stringify(projects));\n    }    \n\n    const getProjects = () => {\n        const projects = load();\n        if (projects) {\n            return projects;\n        } else {\n            return [];\n        }\n    }\n\n    const addProject = (name) => {\n        if (getProjectIdx(name) == -1) {\n            let projects = getProjects();\n            if (!projects) {\n                projects = [];\n            }\n            projects.push(Project(name));\n            save(projects);\n        }\n    }\n\n    const rmProject = (name) => {\n        let projects = getProjects();\n        projects.splice(getProjectIdx(name), 1);\n        save(projects);\n    }\n\n    const getProjectIdx = (name) => {\n        let projects = getProjects();\n        for (let i = 0; i < projects.length; i++) {\n            if (projects[i].name == name) {\n                return i;\n            }\n        }\n        return -1;\n    }\n\n    const getProject = (name) => {\n        let projects = getProjects();\n        const index = getProjectIdx(name);\n\n        if (index == -1) {\n            return null;\n        }\n\n        const addTodo = (tdName, tdDesc, tdDate, tdPriority) => {\n            if (getTodoIdx(tdName) == -1) {\n                projects[index].todoList.push(Todo(tdName, tdDesc, tdDate, tdPriority));\n                save(projects);\n            }\n        }\n\n        const rmTodo = (tdName) => {\n            let todos = getTodos();\n            todos.splice(getTodoIdx(tdName), 1);\n            projects[index].todoList = todos;\n            save(projects);\n        }\n\n        const getTodos = () => {\n            return projects[index].todoList;\n        };\n\n        const getTodoIdx = (tdName) => {\n            const todos = getTodos();\n            for (let i = 0; i < todos.length; i++) {\n                if (todos[i].name == tdName) {\n                    return i;\n                }\n            }\n            return -1;\n        }\n\n\n        return {\n            addTodo: addTodo,\n            rmTodo: rmTodo,\n            getTodos: getTodos,\n            name: projects[index].name\n        };\n\n    }\n\n    return { getProjects, addProject, rmProject, getProject, save, load }\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (model);\n\n//# sourceURL=webpack://todo-list/./src/model.js?");

/***/ }),

/***/ "./src/page.js":
/*!*********************!*\
  !*** ./src/page.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ \"./src/model.js\");\nconst projectItemHtml = (project) => `\n    <tr class=\"project-item\">\n        <td class=\"project-name\">${project.name}</td>\n        <td class=\"project-open\">\n        <button class=\"project-open-btn\">open</button>\n        </td>\n        <td class=\"project-delete\">\n        <button class=\"project-delete-btn\">delete</button>\n        </td>\n    </tr>\n`;\n\nconst todoItemHtml = (todo) => `\n    <tr class=\"todo-item\">\n        <td class=\"todo-name\">${todo.name}</td>\n        <td class=\"todo-desc\">${todo.desc}</td>\n        <td class=\"todo-date\">${todo.date}</td>\n        <td class=\"todo-priority\">${todo.priority}</td>\n        <td class=\"todo-delete\"><button class=\"todo-delete-btn\">delete</button></td>\n    </tr>\n`;\n\n\n\n\n\nconst page = (() => {\n    const projectList = document.querySelector('#project-list');\n    const tdList = document.querySelector('#todo-list');\n    const title = document.querySelector('#project-display-title');\n\n    let project;\n    const loadProjects = () => {\n        projectList.innerHTML = '';\n        _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getProjects().forEach(project => {\n            projectList.innerHTML += projectItemHtml(project);\n        });\n        const projectCells = projectList.querySelectorAll('.project-item');\n        projectCells.forEach(cell => {\n            const openBtn = cell.querySelector('.project-open-btn');\n            const delBtn = cell.querySelector('.project-delete-btn');\n            const projectName = cell.querySelector('.project-name').textContent;\n            openBtn.addEventListener('click', () => {\n                loadTodos(projectName);\n            });\n            delBtn.addEventListener('click', () => {\n                _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].rmProject(projectName);\n                project = null;\n                loadProjects();\n                loadTodos(_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getProjects()[0].name)\n            });\n        });\n    }\n    const loadTodos = (projectName) => {\n        project = _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getProject(projectName);\n        if (project) {\n            title.textContent = projectName;\n            tdList.innerHTML = '';\n            project.getTodos().forEach(todo => {\n                tdList.innerHTML += todoItemHtml(todo);\n            });\n            const tdCells = tdList.querySelectorAll('.todo-item');\n            tdCells.forEach(cell => {\n                const tdName = cell.querySelector('.todo-name').textContent;\n                const deleteBtn = cell.querySelector('.todo-delete-btn');\n                deleteBtn.addEventListener('click', () => {\n                    console.log(tdName);\n                    project.rmTodo(tdName);\n                    loadTodos(project.name);\n                })\n            });\n        }\n    }\n\n    const projectForm = document.getElementById('new-project-form');\n    projectForm.addEventListener('submit', (form) => {\n        form.preventDefault();\n        _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addProject(projectForm['new-project-name'].value);\n        loadProjects();\n    });\n\n    const todoForm = document.getElementById('new-todo-form');\n    todoForm.addEventListener('submit', (form) => {\n        form.preventDefault();\n        project.addTodo(todoForm['new-todo-name'].value, todoForm['new-todo-desc'].value, todoForm['new-todo-date'].value, todoForm['new-todo-priority'].value);\n        loadTodos(project.name);\n    });    \n\n    return { loadProjects, loadTodos };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (page);\n\n//# sourceURL=webpack://todo-list/./src/page.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;