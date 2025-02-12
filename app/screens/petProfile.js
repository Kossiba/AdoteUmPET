import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import NavigationBars from "../../components/NavigationBars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { useRouter } from "expo-router";
import { db } from "../../firebaseConfig";

const PetProfileScreen = () => {
  const [petData, setPetData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const petIdStorage = await AsyncStorage.getItem("petId");

        if (!petIdStorage) {
          Alert.alert("Erro", "Nenhum ID de pet encontrado.");
          router.push("/screens/petList");
          return;
        }

        const petCollection = collection(db, "pets");
        const q = query(petCollection, where("id", "==", parseInt(petIdStorage)));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          Alert.alert("Erro", "Pet não encontrado.");
          router.push("/screens/petList");
          return;
        }

        const pet = querySnapshot.docs[0].data();
        setPetData(pet);
      } catch (error) {
        console.error("Erro ao recuperar os dados:", error);
      }
    };

    fetchPetData();
  }, []);

  return (
    <View style={styles.container}>
      <NavigationBars />
      {petData ? (
        <>
          <Image source={{ uri: petData.imageUrl }} style={styles.image} />
          <Text style={styles.racaText}>{petData.raca}</Text>
          <Text style={styles.contatoText}>{petData.numeroContato}</Text>
          <View style={styles.infoView}>
            <Text style={styles.infoTexto}>{petData.nome}</Text>
            <Text style={styles.infoTexto}>|</Text>
            <Text style={styles.infoTexto}>{petData.idade}</Text>
            <Text style={styles.infoTexto}>|</Text>
            <Text style={styles.infoTexto}>{petData.genero}</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert("Em Construção BB! Au Au!")}
          >
            <Text style={styles.buttonText}>Chama no Zap BB</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.loadingText}>Carregando informações do pet...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  image: {
    marginTop: 100,
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
