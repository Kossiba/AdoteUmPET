import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import NavigationBars from "../../components/NavigationBars";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (!login || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    try {
      const usuarioCollection = collection(db, "usuario");
      const q = query(usuarioCollection, where("login", "==", login));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        if (userData.password === password) {
          await AsyncStorage.setItem("userId", userData.id.toString());
          console.log("Usuário salvo no AsyncStorage:", userData.id);
          Alert.alert("Sucesso", "Login realizado com sucesso!");
          router.push("/screens/petList");
        } else {
          Alert.alert("Erro", "Senha incorreta.");
        }
      } else {
        Alert.alert("Erro", "Usuário não encontrado.");
      }
    } catch (err) {
      console.log("Erro ao realizar login: ", err);
      Alert.alert("Erro", "Não foi possível realizar o login. Tente novamente.");
    }
  }

  return (
    <View style={styles.container}>
      <NavigationBars navigation={navigation} />

      <Text style={styles.title}>
        Boas-vindas ao <Text style={styles.titleAdote}>Adote</Text>
        <Text style={styles.titleUmPET}>UmPET</Text>
      </Text>

      <View style={styles.viewLogin}>
        <Text style={styles.acesseSuaConta}>Acesse sua Conta</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Login"
            placeholderTextColor="#9E9E9E"
            value={login}
            onChangeText={setLogin}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Senha"
            placeholderTextColor="#9E9E9E"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Text style={styles.esqueciMinhaSenha}>Esqueci minha senha</Text>
        <TouchableOpacity
          style={[styles.button, (!login || !password) && styles.disabledButton]}
          onPress={handleLogin}
          disabled={!login || !password}
        >
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#D9D9D9",
  },
  title: {
    fontSize: 22,
    fontWeight: "400",
    color: "black",
    marginBottom: 30,
    marginTop: 110,
  },
  titleAdote: {
    fontSize: 22,
    color: "red",
    fontWeight: "400",
  },
  titleUmPET: {
    fontSize: 22,
    color: "blue",
    fontWeight: "400",
  },
  viewLogin: {
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    width: "77.68%",
    height: "48.54%",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
  },
  acesseSuaConta: {
    color: "black",
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 20,
    marginLeft: 30,
  },
  inputContainer: {
    justifyContent: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 30,
    height: "8.8%",
    width: "70%",
  },
  textInput: {
    color: "black",
    marginLeft: 20,
    fontSize: 15,
  },
  esqueciMinhaSenha: {
    fontWeight: "300",
    marginLeft: 150,
    marginTop: 10,
    marginBottom: 60,
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#DE7B11",
    borderRadius: 10,
    width: "70%",
    height: "12%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#B0B0B0",
  },
});

export default LoginScreen;
