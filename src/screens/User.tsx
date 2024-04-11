import { SafeAreaView, StyleSheet, Text, Image, Button, View } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const User = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerImagem}>
        <Image source={{ uri: user?.image }} style={styles.imagem} />
      </View>
      <View style={styles.tentando}>
        <Text style={styles.label}>Nome:</Text><Text style={styles.texto}>{user?.firstName}</Text>
      </View>
      <View style={styles.tentando}>
        <Text style={styles.label}>Sobrenome:</Text><Text style={styles.texto}>{user?.lastName}</Text>
      </View>
      <View style={styles.tentando}>
        <Text style={styles.label}>Username:</Text><Text style={styles.texto}>{user?.username}</Text>
      </View>
      <View style={styles.tentando}>
        <Text style={styles.label}>Sexo:</Text><Text style={styles.texto}>{user?.gender}</Text>
      </View>
      <View style={styles.tentando}>
        <Text style={styles.label}>Email:</Text><Text style={styles.texto}>{user?.email}</Text>
      </View>
      <Button
        title="Sair"
        onPress={logout}
        color="#eb0000"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: "#11212D"
  },
  containerImagem: {
    borderWidth: 2,
    borderRadius: 100,
    padding: 2,
    marginBottom: 20,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  tentando: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#fff',
  },
  texto: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fff',
  },
});

export default User;
