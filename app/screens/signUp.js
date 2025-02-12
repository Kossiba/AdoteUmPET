import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  collection,
  doc,
  setDoc,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import NavigationBars from "../../components/NavigationBars";
import { useRouter } from "expo-router";

const SignUpScreen = ({ navigation }) => {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function getLastId() {
    const usuarioCollection = collection(db, "usuario");
    try {
      const q = query(usuarioCollection, orderBy("id", "desc"), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data().id;
      }
      return 0;
    } catch (err) {
      console.log("Erro ao buscar último ID:", err);
    }
  }

  async function handleRegister() {
    if (!login || !password || !confirm) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirm) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      const lastId = await getLastId();
      const newId = lastId + 1;
      const usuarioCollection = collection(db, "usuario");
      const q = query(usuarioCollection, where("login", "==", login));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Alert.alert("Erro", "Login já está em uso. Escolha outro.");
        return;
      }

      const docRef = doc(db, "usuario", String(newId));
      await setDoc(docRef, {
        id: newId,
        login: login,
        password: password,
      });

      Alert.alert("Sucesso", `Bem-vindo ao AdoteUmPet, ${login}!`);
      router.push("/screens/login");
    } catch (err) {
      console.log("Erro ao registrar usuário:", err);
      Alert.alert("Erro", "Erro ao registrar o usuário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return loading ? (
    <ActivityIndicator size="large" color="#DE7B11" />
  ) : (
    <View style={styles.container}>
      <NavigationBars navigation={navigation} />
      <Text style={styles.title}>
        Boas-vindas ao <Text style={styles.titleAdote}>Adote</Text>
        <Text style={styles.titleUmPET}>UmPET</Text>
      </Text>
      <View style={styles.viewSignUp}>
        <Text style={styles.criarConta}>Criar conta</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Login"
            value={login}
            onChangeText={setLogin}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Confirmar Senha"
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>CADASTRAR</Text>
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
    fontWeight: "regular",
    color: "#333",
    fontFamily: "inter",
    fontWeight: "regular",
    marginBottom: 30,
    marginTop: 110,
  },
  titleAdote: {
    fontSize: 22,
    fontWeight: "regular",
    color: "red",
    fontFamily: "inter",
    fontWeight: "regular",
  },
  titleUmPET: {
    fontSize: 22,
    fontWeight: "regular",
    color: "blue",
    fontFamily: "inter",
    fontWeight: "regular",
  },
  viewSignUp: {
    justifyContent: "center",

    backgroundColor: "#FAFAFA",

    width: "77.68%",
    height: "48.54%",

    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
  },
  criarConta: {
    fontSize: 18,
    fontWeight: "light",
    color: "black",
    fontFamily: "inter",
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
    fontFamily: "inter",
    fontWeight: "thin",
  },
  button: {
    backgroundColor: "#DE7B11",

    borderRadius: 10,

    marginLeft: 30,
    marginTop: 60,
    width: "70%",
    height: "12%",
  },
  buttonText: {
    color: "#fff",

    fontSize: 20,
    fontFamily: "inter",
    fontWeight: "regular",

    marginLeft: 50,
    marginTop: 10,
  },
});

export default SignUpScreen;
