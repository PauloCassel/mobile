import { StyleSheet, TextInput, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useContext, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TaskContext } from "../contexts/TaskContext";
import DropDownPicker from "react-native-dropdown-picker";
import { categories } from "../utils/data";

const AddTask = () => {
  const {
    open,
    setOpen,
    taskInput,
    setTaskInput,
    setCategoryValue,
    categoryValue,
    handleAddTask,
    dateInput,
    setDateInput,
  } = useContext(TaskContext);

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
        value={taskInput}
        onChangeText={setTaskInput}
        placeholder="Criar uma nova tarefa"
        placeholderTextColor="#ccc"
      />
      <View style={styles.row}>
        <DropDownPicker
          style={styles.dropdown}
          open={open}
          value={categoryValue}
          items={categories.filter(
            (c) => c.value !== "all" && c.value !== "done"
          )}
          setOpen={setOpen}
          setValue={setCategoryValue}
          placeholder="Escolha uma categoria"
          theme="DARK"
          placeholderStyle={{
            color: "#ccc",
            fontSize: 16,
          }}
          listItemLabelStyle={{
            color: "#fff",
            fontSize: 16,
            paddingLeft: 15,
          }}
          dropDownContainerStyle={{
            backgroundColor: "#11212D",
          }}
          selectedItemContainerStyle={{
            backgroundColor: "#1c2541",
          }}
          selectedItemLabelStyle={{
            fontWeight: "bold",
            fontSize: 16,
            color: "#fff",
          }}
        />
        <MaterialIcons
          style={styles.icon}
          name="schedule"
          size={30}
          color="#fff"
          onPress={showDatePicker}
        />
        <MaterialIcons
          style={styles.icon}
          name="send"
          size={30}
          color="#fff"
          onPress={handleAddTask}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "#000000",
  },
  input: {
    color: "#fff",
  },
  icon: {

  },
  title: {
    color: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    paddingHorizontal: 16,
    paddingVertical: 4,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
})

export default AddTask;