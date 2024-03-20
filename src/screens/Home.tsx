import { SafeAreaView, StyleSheet, Text, View, Image, Button, TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import "react-native-get-random-values";
import { Task } from "../types/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import { categories } from "../utils/data";
import { MaterialIcons } from "@expo/vector-icons";

const Home = () => {

    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const [selectedCategory, setSelectCategory] = useState("all");
    const [taskInput, setTaskInput] = useState("");
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTask] = useState<Task[]>([]);

    useEffect(() => {
        getData();
    }, []);

    const storeTasks = async (tasks: Task[]) => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Erro ao salvar tarefas:', error);
        }
    };

    const getTasks = async () => {
        try {
            const taskSalvas = await AsyncStorage.getItem('tasks');
            if (taskSalvas !== null) {
                setTaskList(JSON.parse(taskSalvas));
            }
        } catch (error) {
            console.error('Erro ao recuperar tarefas:', error);
        }
    };

    const getData = async () => {
        try {
            await getTasks();
        } catch (error) {
            console.error('Erro ao obter tarefas:', error);
        }
    };

    const handleAddTask = async () => {
        if (taskInput.trim() !== "") {
            const newTaskList = [];
            const newTask: Task = {
                id: 1,
                title: taskInput,
                category: selectedCategory,
                completed: 1,
            };
            newTaskList.push(newTask);
            storeTasks(newTaskList);
            await getData()
            setTaskInput("")
        }
    }

    const handleRemoveTask = async (taskId: string) => {
        //const updatedTaskList = taskList.filter(task => task.id !== taskId)

        //await storeTasks(updatedTaskList)

        //await getData()
    }

    const handleDoneTask = async (taskId: string) => {
        const newTaskList = [...taskList]
    }

    return (
        <View>
            <Text>Home</Text>
            <TextInput 
            placeholder="Insira o texto da Nova Tarefa"
            value={taskInput}
            onChangeText={setTaskInput}
            />
            <DropDownPicker
                style={styles.dropdown}
                open={open}
                value={categoryValue}
                items={categories.filter(
                    (c) => c.value !== "all" && c.value !== "done"
                )}
                setOpen={setOpen}
                setValue={setCategoryValue}
                placeholder="escolha uma categoria"
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
                    backgroundColor: "#11212D"
                }}
                selectedItemContainerStyle={{
                    backgroundColor: "#1c2541"
                }}
                selectedItemLabelStyle={{
                    fontWeight: "bold",
                    fontSize: 16,
                    color: "#fff"
                }}
                />
                <MaterialIcons name="send" size={50} color="#0000FF" />

        </View>
    );
};

const styles = StyleSheet.create ({
    dropdown: {

    }
})

export default Home;