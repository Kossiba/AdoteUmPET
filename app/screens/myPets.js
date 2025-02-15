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
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

const MyPetsScreen = () => {
  const router = useRouter();
  const [pets, setPets] = useState([]);

  const fetchUserPets = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        Alert.alert("Erro", "Nenhum ID de usuário encontrado.");
        router.push("/screens/login");
        return;
      }

      const usuarioPetsCollection = collection(db, "usarioPets");
      const q = query(usuarioPetsCollection, where("idusuario", "==", userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("Nenhum pet cadastrado pelo usuário.");
        setPets([]);
        return;
      }
      const userPetsData = querySnapshot.docs.map((doc) => doc.data());
      const petIds = userPetsData.map((item) => item.idpet);

      if (petIds.length === 0) {
        setPets([]);
        return;
      }

      const petsCollectionRef = collection(db, "pets");
      const q2 = query(petsCollectionRef, where("id", "in", petIds));
      const petsSnapshot = await getDocs(q2);

      if (petsSnapshot.empty) {
        console.log("Nenhum pet encontrado na coleção 'pets' para esses IDs.");
        setPets([]);
      } else {
        const finalPetsData = petsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPets(finalPetsData);
      }
    } catch (error) {
      console.error("Erro ao buscar pets do usuário:", error);
      Alert.alert("Erro", "Não foi possível carregar seus pets.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserPets();
    }, [])
  );

  const handlePetClick = async (petId) => {
    try {
      await AsyncStorage.setItem("petId", petId.toString());
      router.push("/screens/petProfile");
    } catch (error) {
      console.error("Erro ao salvar o petId no AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.container}>
      <NavigationBars />
      <Text style={styles.petText}>Meus PETs</Text>
      <View style={styles.containerDog}>
        {pets.map((pet) => (
          <View key={pet.id} style={styles.viewDog}>
            <TouchableOpacity onPress={() => handlePetClick(pet.id)}>
              <Image source={{ uri: pet.imageUrl }} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.viewNameIcon}>
              <Text style={styles.textName}>{pet.nome}</Text>
              <Ionicons
                name={pet.genero === "macho" ? "male-outline" : "female-outline"}
                size={20}
                color="black"
              />
            </View>
            <Text style={styles.textAdress}>
              {`${pet.cidade || "Cidade desconhecida"}, ${pet.estado || "Estado desconhecido"}`}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  petText: {
    color: "black",
    fontWeight: "400",
    fontSize: 22,
    marginBottom: 20,
    marginTop: 100,
    marginLeft: 20,
  },
  containerDog: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  viewDog: {
    backgroundColor: "#998181",
    width: "45%",
    height: 230,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  viewNameIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 5,
  },
  textName: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "jura",
    color: "black",
  },
  textAdress: {
    color: "white",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "jura",
    marginLeft: 10,
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: "80%",
  },
});

export default MyPetsScreen;
