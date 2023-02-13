import { conn } from "../configs/db";
import { Task } from "../models/Task";
import { Todo } from "../models/Todo";

type CreateTaskParams = {
  description: string;
  todo_id: number;
};

async function create(param: CreateTaskParams) {
  return await conn.transaction(async (trans) => {
    const task = new Task();
    task.description = param.description;
    task.todo = { id: param.todo_id } as Todo;

    const taskDB = await trans.save(task);
    return taskDB;
  });
}

async function findByTodo(todo: Partial<Todo>) {
  return conn.manager.find(Task, {
    where: {
      todo,
    },
  });
}
export default {
  create,
  findByTodo,
};
