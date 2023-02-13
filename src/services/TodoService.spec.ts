import { QueryFailedError } from "typeorm";
import { conn } from "../configs/db";
import { Todo } from "../models/Todo";
import TodoFactory from "../tests/factories/TodoFactory";
import TodoService, { CreateTodoParams } from "./TodoService";

describe("ToDo Service", () => {
  it("Deveria criar uma todo", async () => {
    const title = "Beber agua";

    const todo = await TodoService.create({ title });

    expect(title).toBe(todo.title);
  });

  it("Deveria criar uma todo com tasks", async () => {
    const title = "Beber agua";

    const todo = await TodoService.create({
      title,
      tasks: [
        { description: "Fazer almoço" },
        { description: "Lavar  a louça" },
      ],
    });

    expect(todo.tasks.length).toBe(2);
  });

  it("Deveria dar erro quando criar todo com titulo nulo", async () => {
    await expect(async () => {
      return await TodoService.create({ title: null });
    }).rejects.toThrow(QueryFailedError);
  });

  it("Deveria dar rollback ao inserir todo e task", async () => {
    const title = "TituloRollback";
    try {
      await TodoService.create({
        title,
        tasks: [{ description: "Fazer almoço" }, { description: null }],
      });
    } catch (error) {}

    const todo = await conn.manager.findOneBy(Todo, { title });

    expect(todo).toBeNull();
  });

  it.skip("Deveria retornar lista de todos e tasks", async () => {
    const { todoDB, params } = await TodoFactory.newTodo();

    const todos = await TodoService.fetchAll();

    const todo = todos.find((t) => (t.id = todoDB.id));
    expect(todo.title).toBe(params.title);
    expect(todo.tasks.length).toBe(2);
  });

  it("Deveria marcar/desmarcar todo como completa", async () => {
    const { todoDB } = await TodoFactory.newTodo();

    const todo = await TodoService.toggleCompleted(todoDB);

    expect(todoDB.isCompleted).not.toBe(todo.isCompleted);
  });
});
