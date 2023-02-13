import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Todo } from "../models/Todo";
import { zinc, indigo } from "tailwindcss/colors";
import Feather from "@expo/vector-icons/Feather";
import TodoService from "../services/TodoService";
interface Props {
  data: Todo[];
  onSubmitComplete: () => Promise<void>;
}
export function ToDoList({ data, onSubmitComplete }: Props) {
  return (
    <View className="mt-6">
      <Text className="text-zinc-50 text-2xl font-bold mb-2">My ToDo's</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ToDoItem data={item} onSubmitComplete={onSubmitComplete} />
        )}
        ItemSeparatorComponent={() => <View className="h-2" />}
      />
    </View>
  );
}

interface ToDoItemProps {
  data: Todo;
  onSubmitComplete: () => Promise<void>;
}
function ToDoItem({ data, onSubmitComplete }: ToDoItemProps) {
  async function handleComplet() {
    await TodoService.toggleCompleted({ id: data.id });
    await onSubmitComplete();
  }

  return (
    <TouchableOpacity
      className="flex-row items-center py-3 px-4 rounded bg-zinc-800"
      onPress={handleComplet}
    >
      {data.isCompleted ? (
        <Feather name="check-square" color={indigo[700]} size={24} />
      ) : (
        <Feather name="square" color={zinc[50]} size={24} />
      )}
      <Text className="text-zinc-50 text-lg font-semibold ml-2">
        {data.title}
      </Text>
    </TouchableOpacity>
  );
}
