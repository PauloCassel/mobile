import { SafeAreaView, StyleSheet, Text, View, Image, Button } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import "react-native-get-random-values";
import { Task } from "../types/Task";

const Home = () => {

    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const [selectedCategory, setSelectCategory] = useState("all");
    const [taskInput, setTaskInput] = useState("");
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTask] = useState<Task[]>([]);

    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}
export default Home;