import TodoFactory from "../tests/factories/TodoFactory";
import TaskService from "./TaskService";
import TodoService from "./TodoService";

describe("Task Service", () => {
  it("Deveria criar uma task", async () => {
    const { todoDB } = await TodoFactory.newTodo();

    const description = "Tarefa 1";

    const task = await TaskService.create({ description, todo_id: todoDB.id });

    expect(description).toBe(task.description);
  });

  it("Deveria busca por todo", async () => {
    const { todoDB, params } = await TodoFactory.newTodo();

    const tasks = await TaskService.findByTodo({ id: todoDB.id });

    expect(params.tasks[0].description).toBe(tasks[0].description);
    expect(params.tasks[1].description).toBe(tasks[1].description);
  });
});
