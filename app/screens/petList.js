import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import NavigationBars from "../../components/NavigationBars";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
const PetListScreen = ({ navigation }) => {
  const router = useRouter();
  const [petData, setPetData] = useState([]);
  useEffect(() => {
    const fetchPetsData = async () => {
      try {
        const petsCollection = collection(db, "pets");
        const q = query(petsCollection);
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          Alert.alert("Erro");
          router.push("/screens/home");
          return;
        }

        const pets = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPetData(pets);
      } catch (error) {
        console.error("Erro ao recuperar os dados:", error);
      }
    };

    fetchPetsData();
  }, []);

  const handlePetClick = async (petId) => {
    try {
      await AsyncStorage.setItem("petId", petId.toString());
      router.push("/screens/petProfile");
    } catch (error) {
      console.error("Erro ao salvar os dados no AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.container}>
      <NavigationBars navigation={navigation} />
      <Text style={styles.petText}>Pets Disponíveis</Text>
      <View style={styles.containerDog}>
        {petData.map((pet) => (
          <View key={pet.id} style={styles.viewDog}>
            <TouchableOpacity onPress={() => handlePetClick(pet.id)}>
              <Image source={{ uri: pet.imageUrl }} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.viewNameIcon}>
              <Text style={styles.textName}>{pet.nome}</Text>
              <Ionicons
                name={pet.genero === "Fem" ? "female-outline" : "male-outline"}
                size={20}
                color="black"
              />
            </View>
            <Text style={styles.textAdress}>Dois Vizinhos, PR</Text>
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

export default PetListScreen;
