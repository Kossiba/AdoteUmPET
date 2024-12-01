import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import NavigationBars from "../components/NavigationBars";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PetProfileScreen = () => {
  const [petData, setPetData] = useState(null);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const data = await AsyncStorage.getItem("selectedPet");
        if (data) {
          setPetData(JSON.parse(data));
        }
      } catch (error) {
        console.error("Erro ao recuperar os dados do AsyncStorage:", error);
      }
    };

    fetchPetData();
  }, []);

  if (!petData) {
    return <Text>Carregando...</Text>;
  }


  return (
    <View style={styles.container}>
      <NavigationBars />
      <Image
        source={require("../assets/images/Mel.png")}
        style={styles.image}
      />
      <Text style={styles.racaText}>{petData.race}</Text>
      <Text style={styles.contatoText}>{petData.contact}</Text>
      <View style={styles.infoView}>
        <Text style={styles.infoTexto}>{petData.name}</Text>
        <Text style={styles.infoTexto}>|</Text>
        <Text style={styles.infoTexto}>{petData.age}</Text>
        <Text style={styles.infoTexto}>|</Text>
        <Text style={styles.infoTexto}>{petData.gender}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Em Construção BB")}
      >
        <Text style={styles.buttonText}>Chama no Zap BB</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  image: {
    marginTop: 70,
    height: "50%",
    width: "100%",
  },
  racaText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "inter",
  },
  contatoText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "inter",
  },
  infoView: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 0,
  },
  infoTexto: {
    marginTop: 50,
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "inter",
  },
  button: {
    margin: "auto",
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    height: "5%",
    width: "50%",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "inter",
  },
});

export default PetProfileScreen;
