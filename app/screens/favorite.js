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
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";

const FavoriteScreen = ({ navigation }) => {
  const router = useRouter();
  const [petData, setPetData] = useState([]);
  const [favoritosIds, setFavoritosIds] = useState([]);

  const fetchFavoritedata = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        router.push("/screens/login");
        return;
      }

      const petFavoritoCollection = collection(db, "petFavorito");
      const q = query(petFavoritoCollection, where("idusuario", "==", userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setFavoritosIds([]);
        setPetData([]);
        return;
      }

      const ids = querySnapshot.docs.map((doc) => doc.data().idpet);
      setFavoritosIds(ids);

      await fetchPetsdata(ids);
    } catch (error) {
      console.error("Erro ao buscar IDs dos pets favoritos:", error);
      Alert.alert("Erro", "Não foi possível carregar seus pets favoritos.");
    }
  };

  const fetchPetsdata = async (petIds) => {
    try {
      const petCollection = collection(db, "pets");
      const querySnapshot = await getDocs(petCollection);

      const petDetails = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((pet) => petIds.includes(String(pet.id)));
      setPetData(petDetails);
    } catch (error) {
      console.error("Erro ao buscar detalhes dos pets:", error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchFavoritedata();
    }, [])
  );

  const handlePetClick = async (petId) => {
    try {
      await AsyncStorage.setItem("petId", petId.toString());
      console.log(`ID do pet ${petId} salvo no AsyncStorage.`);
      router.push("/screens/petProfile");
    } catch (error) {
      console.error("Erro ao salvar o petId no AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.container}>
      <NavigationBars navigation={navigation} />
      <Text style={styles.petText}>Pets Favoritos</Text>
      {petData.length > 0 ? (
        <View style={styles.containerDog}>
          {petData.map((pet) => (
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
                {`${pet.cidade || "Cidade desconhecida"}, ${
                  pet.estado || "Estado desconhecido"
                }`}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noPetsText}>Nenhum pet favorito encontrado.</Text>
      )}
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
  noPetsText: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
    marginTop: 20,
  },
});

export default FavoriteScreen;
