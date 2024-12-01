import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import NavigationBars from "../components/NavigationBars";

const LoginScreen = ({ navigation }) => {
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
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Senha"
            placeholderTextColor="#9E9E9E"
            secureTextEntry
          />
        </View>
        <Text style={styles.esqueciMinhaSenha}>Esqueci minha senha</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("Botão pressionado!")}
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
    fontWeight: "regular",
    color: "black",
    fontFamily: "inter",
    fontWeight: "400",
    marginBottom: 30,
    marginTop: 110,
  },
  titleAdote: {
    fontSize: 22,
    color: "red",
    fontFamily: "inter",
    fontWeight: "400",
  },
  titleUmPET: {
    fontSize: 22,
    color: "blue",
    fontFamily: "inter",
    fontWeight: "400",
  },
  viewLogin: {
    justifyContent: "center",

    backgroundColor: "#FAFAFA",

    width: "77.68%",
    height: "48.54%",

    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
  },
  acesseSuaConta: {
    color: "black",

    fontSize: 18,
    fontWeight: "light",
    fontFamily: "inter",
    
    marginBottom: 20,
    marginLeft: 30,
  },
  inputContainer: {
    justifyContent: "center",

    backgroundColor: "#EDEDED",

    borderRadius: 10,
    
    marginTop: 20,
    marginLeft:30,
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
  esqueciMinhaSenha: {
    fontWeight: "light",
    fontFamily: "inter",

    marginLeft: 150,
    marginTop: 10,
    marginBottom:60,
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",

    backgroundColor: "#DE7B11",

    borderRadius: 10,
    
    width: "70%",
    height: "12%"
  },
  buttonText: {
    color: "#fff",

    fontSize: 20,
    fontFamily: "inter",
    fontWeight: "regular",

    marginLeft: 70,
    marginTop: 3,
  },
});

export default LoginScreen;
