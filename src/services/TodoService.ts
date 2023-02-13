import { conn } from "../configs/db";
import { Task } from "../models/Task";
import { Todo } from "../models/Todo";
import TaskService from "./TaskService";

export interface CreateTodoParams extends Pick<Todo, "title"> {
  tasks?: Pick<Task, "description">[];
}

async function create(param: CreateTodoParams) {
  return await conn.transaction(async (trans) => {
    const todo = new Todo();
    todo.title = param.title;

    const todoDB = await trans.save(todo);

    if (param.tasks) {
      const tasksPromises = param.tasks.map(({ description }) => {
        const task = new Task();
        task.description = description;
        task.todo = todoDB;

        return trans.save(task);
      });

      const tasksDB = await Promise.all(tasksPromises);
      todoDB.tasks = tasksDB;
    }

    return todoDB;
  });
}

async function fetchAll() {
  const todos = await conn.manager.find(Todo);

  const tasksPromises = todos.map((todo) => TaskService.findByTodo(todo));
  const tasks = (await Promise.all(tasksPromises)).flat();

  todos.map((todo) => {
    todo.tasks = tasks.filter((task) => (task.todo.id = todo.id));
  });

  return todos;
}

async function toggleCompleted(params: Pick<Todo, "id">) {
  const todo = await conn.manager.findOneBy(Todo, { id: params.id });
  todo.isCompleted = !todo.isCompleted;

  const todoDB = await conn.manager.save(todo);
  return todoDB;
}
export default {
  create,
  fetchAll,
  toggleCompleted,
};
