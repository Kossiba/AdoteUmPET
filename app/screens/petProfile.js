import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import NavigationBars from "../../components/NavigationBars";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  query,
  getDocs,
  where,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";

const PetProfileScreen = () => {
  const [petData, setPetData] = useState(null);
  const [isUserPet, setIsUserPet] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const petIdStorage = await AsyncStorage.getItem("petId");
      const userIdStorage = await AsyncStorage.getItem("userId");

      if (!petIdStorage) {
        Alert.alert("Erro", "Nenhum ID de pet encontrado.");
        router.push("/screens/petList");
        return;
      }

      const petCollection = collection(db, "pets");
      const q = query(petCollection, where("id", "==", String(petIdStorage)));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert("Erro", "Pet não encontrado.");
        router.push("/screens/petList");
        return;
      }

      const pet = querySnapshot.docs[0].data();
      setPetData(pet);

      if (userIdStorage) {
        const userPetDocRef = doc(db, "usarioPets", `${userIdStorage}_${petIdStorage}`);
        const userPetDocSnap = await getDoc(userPetDocRef);
        setIsUserPet(userPetDocSnap.exists());
      }
    } catch (error) {
      console.error("Erro ao recuperar os dados:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => {};
    }, [])
  );

  const handleDeletePet = async () => {
    try {
      const petIdStorage = await AsyncStorage.getItem("petId");
      const userIdStorage = await AsyncStorage.getItem("userId");

      if (!petIdStorage || !userIdStorage) {
        Alert.alert("Erro", "Não foi possível obter IDs do pet ou usuário.");
        return;
      }

      const userPetDocRef = doc(db, "usarioPets", `${userIdStorage}_${petIdStorage}`);
      await deleteDoc(userPetDocRef);

      const petDocRef = doc(db, "pets", petIdStorage);
      await deleteDoc(petDocRef);

      Alert.alert("Sucesso", "Pet excluído com sucesso!");
      router.push("/screens/petList");
    } catch (error) {
      console.error("Erro ao excluir pet:", error);
      Alert.alert("Erro", "Não foi possível excluir o pet.");
    }
  };

  const formatPhoneNumber = (number) => {
    if (!number || number.length !== 11) return number;
    const ddd = number.slice(0, 2);
    const part1 = number.slice(2, 7);
    const part2 = number.slice(7);
    return `(${ddd}) ${part1}-${part2}`;
  };

  return (
    <View style={styles.container}>
      <NavigationBars />
      {petData ? (
        <>
          <Image source={{ uri: petData.imageUrl }} style={styles.image} />
          <Text style={styles.racaText}>{petData.raca}</Text>
          <Text style={styles.contatoText}>
            Contato: {formatPhoneNumber(petData.numeroContato)}
          </Text>
          <View style={styles.infoView}>
            <Text style={styles.infoTexto}>{petData.nome}</Text>
            <Text style={styles.infoTexto}>|</Text>
            <Text style={styles.infoTexto}>{petData.idade}</Text>
            <Text style={styles.infoTexto}>|</Text>
            <Text style={styles.infoTexto}>{petData.genero}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            {isUserPet ? (
              <TouchableOpacity style={styles.button} onPress={handleDeletePet}>
                <Text style={styles.buttonText}>Excluir pet</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.infoTexto}>
                Este pet não pertence a você.
              </Text>
            )}
          </View>
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
    marginTop: 50,
    paddingHorizontal: 20,
  },
  infoTexto: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "inter",
    color: "black",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "inter",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "inter",
  },
});

export default PetProfileScreen;
