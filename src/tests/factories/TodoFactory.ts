import TodoService, { CreateTodoParams } from "../../services/TodoService";

async function newTodo(params?: CreateTodoParams) {
  let todo: CreateTodoParams = {
    title: "Tarefa de casa",
    tasks: [{ description: "Fazer almoço" }, { description: "Lavar  a louça" }],
  };

  todo = { ...todo, ...params };

  const todoDB = await TodoService.create(todo);
  return { todoDB, params: todo };
}

export default {
  newTodo,
};
