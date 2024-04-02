import { StyleSheet, View, TextInput } from "react-native";
import React, { useState } from "react";
import "react-native-get-random-values";
import { Task } from "../types/Task";


const addTask = () => {

    const [categoryValue, setCategoryValue] = useState(null);
    const [selectedCategory, setSelectCategory] = useState("all");
    const [taskInput, setTaskInput] = useState("");
    const [taskList, setTaskList] = useState<Task[]>([]);

    return (
        <View style={styles.container}>
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

const styles = StyleSheet.create ({
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