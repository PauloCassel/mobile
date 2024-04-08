import { StyleSheet, Text, SafeAreaView } from "react-native";
import "react-native-get-random-values";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { TaskContext } from "../contexts/TaskContext";
import WeekCalendar from "../components/WeekCalendar";
import { Task } from "../types/Task";
import { categories } from "../utils/data";
import * as SQLite from "expo-sqlite";
import ItemCard from "../components/ItemCard";
import Animated, {BounceInDown, FlipInYRight,FlipOutYRight } from "react-native-reanimated"
import CategoryItem from "../components/CategoryItem";


const Home = () => {

    const { user } = useContext(UserContext);
    const {
      taskList,
      selectedCategory,
      formatedToday,
      handleSelectCategory,
      handleRemoveTask,
      handleDoneTask,
      db,
      getTasks,
    } = useContext(TaskContext);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists tasks (id integer primary key not null, completed int, title next, category next);"
            )
        })
        getTasks()
    }, []);

    //db

    return (
        <SafeAreaView style={styles.container}>
      <Text>
        Olá, {user?.firstName.toUpperCase()}, hoje é dia {formatedToday}
      </Text>

      <WeekCalendar />

      <Animated.FlatList
        entering={BounceInDown}
        style={{ maxHeight: 70 }}
        data={categories}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            handleSelectCategory={handleSelectCategory}
            selectedCategory={selectedCategory}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />

      {taskList && taskList.length > 0 ? (
        <Animated.FlatList
          entering={FlipInYRight}
          exiting={FlipOutYRight}
          style={{ width: "100%" }}
          data={taskList}
          renderItem={({ item }) => (
            <ItemCard
              task={item}
              handleRemoveTask={handleRemoveTask}
              handleDoneTask={handleDoneTask}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Animated.View
          entering={BounceInDown}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>
            {selectedCategory === "done"
              ? "Eita, nenhuma tarefa concluída! 😢"
              : "Ufa, não há tarefas! 😋"}
          </Text>
        </Animated.View>
      )}
    </SafeAreaView>
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