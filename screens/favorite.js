import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import NavigationBars from "../components/NavigationBars";
import Ionicons from "react-native-vector-icons/Ionicons";

const FavoriteScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <NavigationBars navigation={navigation}></NavigationBars>
      <Text style={styles.petText}>Meus Favoritos</Text>
      <View style={styles.containerDog}>
        <View style={styles.viewDog}>
          <Image
            source={require("../assets/images/Mel.png")}
            style={styles.image}
          />
          <View style={styles.viewNameIcon}>
            <Text style={styles.textName}>Mel</Text>
            <Ionicons
              name="female-outline"
              size={20}
              color="black"
            />
          </View>
          <Text style={styles.textAdress}>Dois Vizinho, PR</Text>
        </View>
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

    marginBottom: 30,
    marginTop: 130,
    marginLeft: 30,
  },
  containerDog: {
    flexDirection: "row",
  },
  viewDog: {
    backgroundColor: "#998181",
    width: "40%",
    height: "60%",

    marginLeft: 30,
  },
  viewNameIcon: {
    flexDirection: "row",

    justifyContent: 'space-between',
    marginleft: 30,
  },
  textName: {
    fontSize: 18,
    fontWeight: 400,
    fontFamily: "jura",
    marginleft: 10,
  },
  textAdress: {
    color: "white",

    fontSize: 12,
    fontWeight: 400,
    fontFamily: "jura",

    marginTop: 5,
    marginleft: 10,
  },
  image: {
    height: "80%",
    width: "100%",
  },
});

export default FavoriteScreen;
