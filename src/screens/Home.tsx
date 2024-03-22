import { StyleSheet, View, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import "react-native-get-random-values";
import { Task } from "../types/Task";
import DropDownPicker from "react-native-dropdown-picker";
import { categories } from "../utils/data";
import { MaterialIcons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import ItemCard from "../components/ItemCard";
import Animated, {BounceInDown, FlipInYRight,FlipOutYRight } from "react-native-reanimated"
import CategoryItem from "../components/CategoryItem";


const Home = () => {

    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const [selectedCategory, setSelectCategory] = useState("all");
    const [taskInput, setTaskInput] = useState("");
    const [taskList, setTaskList] = useState<Task[]>([]);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists tasks (id integer primary key not null, completed int, title next, category next);"
            )
        })
        getTasks()
    }, []);

    //db

    const openDatabase =  () => {

        const db = SQLite.openDatabase("db.db")

        return db
    }

    const db = openDatabase();

    const getTasks = async () => {
        db.transaction((tx) => {
            tx.executeSql(
                `select * from tasks where completed = 0;`,
                [],
                (_, { rows: { _array } }) => {
                    setTaskList(_array);
                }
            )
        })
    };

    const getTasksByCategory = (category: string) => {
        db.transaction((tx) => {
            tx.executeSql(
                `select * from tasks where completed = 0 and category = ?;`,
                [category],
                (_, { rows: { _array } }) => {
                    setTaskList(_array);
                }
            )
        })
    }

    const getCompletedTasks = () => {
        db.transaction((tx) => {
            tx.executeSql(
                `select * from tasks where completed = 1;`,
                [],
                (_, { rows: { _array } }) => {
                    setTaskList(_array);
                }
            )
        })
    }

    const handleAddTask = async () => {
        if (taskInput !== "" && categoryValue) {
            db.transaction((tx) => {
                tx.executeSql(
                    `insert into tasks (completed, title, category) values (0, ?, ?)`,
                    [taskInput, categoryValue]
                );
                tx.executeSql(
                    `select * from tasks where completed = 0;`,
                    [],
                    (_, { rows: { _array } }) => {
                        setTaskList(_array)
                    }
                )
            })
        }

        setTaskInput("");
        setCategoryValue(null);
    }

    const handleRemoveTask = async (id: number) => {
        db.transaction((tx) => {
            tx.executeSql("delete from tasks where id = ?", [id]);
            tx.executeSql(
                `select * from tasks where completed = 0;`,
                [],
                (_, { rows: { _array } }) => {
                    setTaskList(_array)
                }
            )
        })
    }

    const handleDoneTask = (id: number) => {
        db.transaction((tx) => {
            tx.executeSql("update tasks set completed = ? where id = ? ", [1, id]);
            tx.executeSql(
                `select * from tasks where completed = 0;`,
                [],
                (_, { rows: { _array }}) => {
                    setTaskList(_array);
                }
            )
        })
    }

    const handleSelectedCategory = (type: string) => {
        setSelectCategory(type);
    
        switch (type) {
            case 'all':
                getTasks();
                break;
            case 'done':
                getCompletedTasks();
                break;
            default:
                getTasksByCategory(type);
                break;
        }
    }

    //db

    return (
        <View style={styles.container}>
            <Animated.View style={styles.row} entering={BounceInDown}>
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
            </Animated.View>
            
            <Animated.FlatList
                entering={BounceInDown}
                data={categories} 
                renderItem={({ item }) => <CategoryItem item={item} handleSelectCategory={handleSelectedCategory} selectedCategory={selectedCategory}/>}
                keyExtractor={(item) => item.id.toString()}
            />

            <Animated.FlatList
                entering={FlipInYRight}
                exiting={FlipOutYRight}
                data={taskList}
                renderItem={({ item }) => <ItemCard task={item} handleDoneTask={handleDoneTask} handleRemoveTask={handleRemoveTask}/>}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create ({
    dropdown: {

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

export default Home;