import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { Task } from "../types/Task";
import { categories } from "../utils/data";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

interface Props {
  task: Task;
  handleRemoveTask: (id: number) => void;
  handleDoneTask: (id: number) => void;
}

const ItemCard = ({ task, handleRemoveTask, handleDoneTask }: Props) => {
  const navigation = useNavigation<any>();
  const category = categories.filter((c) => c.value === task.category);

  const handleDetails = () => {
    navigation.navigate("TaskDetails", task);
  };

  const handleDelete = () => {
    Alert.alert("Tarefas", "Tem certeza que deseja excluir esta tarefa?", [
      {
        text: "Não",
        style: "cancel",
      },
      { text: "Sim", onPress: () => handleRemoveTask(task.id) },
    ]);
  };

  const LeftAction = () => {
    return (
      <View style={styles.swipeLeft}>
        <MaterialIcons
          name="done"
          size={20}
          color="#fff"
          onPress={() => handleDoneTask(task.id)}
        />
      </View>
    );
  };

  const RightAction = () => {
    return (
      <View style={styles.swipeRight}>
        <MaterialIcons
          name="delete"
          size={20}
          color="#fff"
          onPress={handleDelete}
        />
      </View>
    );
  };

  return (
    <Swipeable renderLeftActions={LeftAction} renderRightActions={RightAction}>
      <TouchableOpacity onPress={handleDetails}>
        <View style={styles.container}>
          <View
            style={{
              borderStyle: "solid",
              height: "100%",
              borderLeftWidth: 6,
              marginRight: 10,
            }}
          />
          <Text style={styles.title}>{task.title} </Text>
          <Text style={styles.date}>
            {moment(task.date).format("DD/MM/YY")}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
    padding: 15,
    backgroundColor: "#394867",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  swipeLeft: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 10,
    width: 40,
    paddingLeft: 20,
    backgroundColor: "#00b894",
  },
  swipeRight: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 10,
    width: 40,
    paddingRight: 20,
    backgroundColor: "#e74c3c",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  date: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ItemCard;