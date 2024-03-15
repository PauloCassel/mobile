import { SafeAreaView, StyleSheet, Text, Image, Button } from "react-native";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

const User = () => {
  const {getUser, user, logout} = useContext(UserContext)

  useEffect(() => {
    getUser();
  }, [])

  return (
    <SafeAreaView>
      <Image source = {{ uri: user?.image }} style = {styles.image}/>
      <Text style = {styles.username}>{user?.username}</Text>
      <Text style = {styles.username}>{user?.email}</Text>
      <Text style = {styles.username}>{user?.gender}</Text>
      <Button title="Sair" onPress={logout} />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  }
});


export default User;