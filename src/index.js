import model from "./model";
import page from "./page";

if (model.getProjects().length == 0) {
    model.addProject('default');
    page.loadTodos('default');
}
page.loadProjects();
page.loadTodos(model.getProjects()[0].name);
