import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/Adoteumpet.png")}
      style={styles.background}
      resizeMode="stretch" 
    >
      <View style={styles.viewButton}>
        <TouchableOpacity
          onPress={() => router.push("/screens/signUp")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/screens/login")}
          style={styles.buttonUm}
        >
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  viewButton: {
    flexDirection: "row",


    position: "absolute",
    bottom: 30,

    gap: 35,
    width: "100%",
    height: "13.5%",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    
    backgroundColor: "#DE7B11",

    borderRadius: 40,

    width: "45%",
    height: "60%",
  },
  buttonUm: {
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#06ED02",

    borderRadius: 40,
    width: "45%",
    height: "60%",
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 400,
    fontFamily: "thin",
    marginLeft: 5,
  },
});

export default HomeScreen;
