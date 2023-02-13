import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { ToDoForm } from "../components/ToDoForm";
import { ToDoList } from "../components/ToDoList";
import { Todo } from "../models/Todo";
import TodoService from "../services/TodoService";

export function Home() {
  const [list, setList] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const todos = await TodoService.fetchAll();
    setList(todos);
  }

  return (
    <SafeAreaView className="flex-1 bg-zinc-900 pt-12 px-6">
      <ToDoForm onSubmitComplete={fetchTodos} />
      <ToDoList data={list} onSubmitComplete={fetchTodos} />
    </SafeAreaView>
  );
}
