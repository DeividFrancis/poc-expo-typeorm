import { useRef, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { zinc } from "tailwindcss/colors";

import TodoService from "../services/TodoService";

interface Props {
  onSubmitComplete: () => Promise<void>;
}
export function ToDoForm({ onSubmitComplete }: Props) {
  const [value, setValue] = useState("");

  async function handleSubmit() {
    if (value.trim() == "") return;
    await TodoService.create({ title: value });
    setValue("");
    onSubmitComplete();
  }

  return (
    <View className="flex-row justify-between">
      <TextInput
        value={value}
        placeholder="Type todo title"
        placeholderTextColor={zinc[500]}
        onChangeText={(text) => setValue(text)}
        className="flex-1 border border-zinc-300 py-2 px-2 rounded text-lg text-zinc-50 "
      />
      <ButtonSubmit onPress={handleSubmit} />
    </View>
  );
}

function ButtonSubmit(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      {...props}
      className="bg-indigo-700 w-12 rounded items-center justify-center ml-4"
    >
      <Text className="text-zinc-50 text-xl bold">+</Text>
    </TouchableOpacity>
  );
}
