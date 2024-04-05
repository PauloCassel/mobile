import { StyleSheet, View, TextInput } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import "react-native-get-random-values";
import { Task } from "../types/Task";
import { TaskContext } from "../contexts/TaskContext";


const addTask = () => {

  const [categoryValue, setCategoryValue] = useState(null);
  const [selectedCategory, setSelectCategory] = useState("all");
  const [taskInput, setTaskInput] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [dateInput, setDateInput] = useState(new Date())

  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDateInput(currentDate);
  };

  const showMode = (currentMode: React.SetStateAction<"date" | "time">) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode("date");
  };

  return (
    <View style={styles.container}>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateInput}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Escreva a Tarefa"
        value={taskInput}
        onChangeText={setTaskInput}
      />
      <TextInput
        style={styles.input}
        placeholder="Escreva a Categoria"
        value={selectedCategory}
        onChangeText={setSelectCategory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {

  },
  input: {

  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
})

export default addTask;