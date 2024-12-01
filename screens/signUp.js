import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import NavigationBars from "../components/NavigationBars";

const SignUpScreen = ({ navigation }) => {
  return (
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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Confirmar senha"
            placeholderTextColor="#9E9E9E"
            secureTextEntry
          />
        </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert("Botão pressionado!")}
          >
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
  button: {
    backgroundColor: "#DE7B11",

    borderRadius: 10,

    marginLeft: 30,
    marginTop: 60,
    width: "70%",
    height: "12%"
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
