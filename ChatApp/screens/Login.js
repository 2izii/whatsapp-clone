// Importa os componentes e funções necessários do React Native para construir a tela de login.
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
// Importa uma imagem de fundo.
const backImage = require("../assets/backImage.png");

// Define um componente de funcionalidade para a tela de login.
export default function Login({ navigation }) {
  // Declara dois estados para armazenar o email e a senha inseridos pelo usuário.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Define uma função de manipulação de evento para o botão de login.
  const onHandleLogin = () => {
    // Verifica se o email e a senha foram inseridos pelo usuário.
    if (email !== "" && password !== "") {
      // Realiza o login do usuário com o email e a senha fornecidos usando a função `signInWithEmailAndPassword` do Firebase.
      // Exibe uma mensagem de erro se o login falhar.
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };

  // Retorna a interface do usuário da tela de login, incluindo campos de entrada para email e senha,
  // um botão de login, um link para a tela de registro e um fundo de imagem.
  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Log In</Text>
        {/* Campo de entrada para o email do usuário. */}
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {/* Campo de entrada para a senha do usuário. */}
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {/* Botão de login que aciona a função `onHandleLogin` quando pressionado. */}
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Log In</Text>
        </TouchableOpacity>
        {/* Link para a tela de registro. */}
        <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
          <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{color: '#f57c00', fontWeight: '600', fontSize: 14}}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/* Barra de status na parte superior da tela. */}
      <StatusBar barStyle="light-content" />
    </View>
  );
}

// Estilos para os componentes da tela de login.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});
