import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  collection,
  doc,
  setDoc,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import NavigationBars from "../../components/NavigationBars";
import { db } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IMGUR_CLIENT_ID = "ec50a5168850e14";

const SignUpPetScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [idade, setIdade] = useState("");
  const [numeroContato, setNumeroContato] = useState("");
  const [raca, setRaca] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [registering, setRegistering] = useState(false);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        const filename = uri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const fileType = match ? `image/${match[1]}` : "image/jpeg";

        setImageUri(uri);
        setSelectedImage({ uri, filename, fileType });
      }
    } catch (error) {
      console.log("Erro ao selecionar imagem:", error);
      Alert.alert("Erro", "Não foi possível selecionar a imagem.");
    }
  };

  const uploadToImgur = async (fileUri, filename, fileType) => {
    try {
      setUploadingImage(true);
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Client-ID ${IMGUR_CLIENT_ID}`);

      const formData = new FormData();
      formData.append("image", {
        uri: fileUri,
        type: fileType,
        name: filename,
      });

      const response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: myHeaders,
        body: formData,
      });

      const result = await response.json();
      setUploadingImage(false);

      if (result.success) {
        console.log("Imagem enviada com sucesso:", result.data.link);
        return result.data.link;
      } else {
        console.log("Erro ao enviar imagem:", result);
        Alert.alert("Erro", "Não foi possível enviar a imagem.");
        return;
      }
    } catch (error) {
      setUploadingImage(false);
      console.log("Erro ao fazer upload:", error);
      Alert.alert("Erro", "Não foi possível fazer o upload.");
      return null;
    }
  };

  async function getLastId() {
    const petCollection = collection(db, "pets");
    try {
      const q = query(petCollection, orderBy("id", "desc"), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return parseInt(querySnapshot.docs[0].id);
      }
      return 0;
    } catch (err) {
      console.log("Erro ao buscar último ID:", err);
    }
  }

  async function getUserId() {
    try {
      const userId = await AsyncStorage.getItem("userId");

      if (!userId) {
        console.log("Erro: Ao buscar id do usuario logado.");
        return; 
      }

      return parseInt(userId);
    } catch (err) {
      console.log("Erro ao buscar ID do usuário logado:", err);
    }
  }

  async function putUsuarioPets() {
    try {
      const idUsuario = await getUserId();
      const idPet = await getLastId();
      const docRef = doc(db, "usarioPets", `${idUsuario}_${idPet}`);
      await setDoc(docRef, {
        idpet: idPet,
        idusuario: idUsuario,
      });
    } catch (err) {
      console.log("Erro criar usuario pet: ", err);
    }
  }

  async function handleRegister() {
    if (
      !nome ||
      !genero ||
      !idade ||
      !numeroContato ||
      !raca ||
      !selectedImage
    ) {
      Alert.alert("Erro", "Preencha todos os campos e insira a imagem.");
      return;
    }

    try {
      setRegistering(true);

      const lastId = await getLastId();
      const newId = lastId + 1;
      await AsyncStorage.setItem("petId", newId.toString());

      const imageUrl = await uploadToImgur(
        selectedImage.uri,
        selectedImage.filename,
        selectedImage.fileType
      );

      if (!imageUrl) {
        setRegistering(false);
        Alert.alert("Erro", "Falha no upload da imagem.");
        return;
      }

      const docRef = doc(db, "pets", String(newId));
      await setDoc(docRef, {
        id: newId,
        nome,
        genero,
        idade: parseInt(idade),
        numeroContato,
        raca,
        imageUrl,
      });
      await putUsuarioPets(newId);
      setRegistering(false);
      Alert.alert("Sucesso", "Pet cadastrado com sucesso!");

      setNome("");
      setGenero("");
      setIdade("");
      setNumeroContato("");
      setRaca("");
      setImageUri(imageUrl);
      setSelectedImage(null);
    } catch (err) {
      setRegistering(false);
      console.log("Erro ao cadastrar o pet:", err);
      Alert.alert("Erro", "Não foi possível cadastrar o pet.");
    }
  }

  return (
    <View style={styles.container}>
      <NavigationBars navigation={navigation} />
      <Text style={styles.tituloText}>Doar pet</Text>
      <View style={styles.viewSignUpPet}>
        <TouchableOpacity onPress={pickImage} style={styles.viewImage}>
          {uploadingImage ? (
            <ActivityIndicator size="large" color="#DE7B11" />
          ) : imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Image
              source={require("../../assets/images/ProfileCachorroIcon.png")}
              style={styles.image}
            />
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Nome do Pet"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Raça"
          value={raca}
          onChangeText={setRaca}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Idade"
          keyboardType="numeric"
          value={idade}
          onChangeText={setIdade}
        />
        <TextInput
          style={styles.textInput}
          placeholder="N° para contato"
          keyboardType="phone-pad"
          value={numeroContato}
          onChangeText={setNumeroContato}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Gênero"
          value={genero}
          onChangeText={setGenero}
        />
        <TouchableOpacity
          style={[
            styles.button,
            !nome ||
            !genero ||
            !idade ||
            !numeroContato ||
            !raca ||
            !selectedImage
              ? styles.disabledButton
              : null,
          ]}
          onPress={handleRegister}
          disabled={
            !nome ||
            !genero ||
            !idade ||
            !numeroContato ||
            !raca ||
            !selectedImage ||
            registering
          }
        >
          {registering ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>CADASTRAR</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#D9D9D9", alignItems: "center" },
  tituloText: { fontSize: 22, fontWeight: "400", marginTop: 130 },
  viewSignUpPet: {
    backgroundColor: "#FAFAFA",
    borderRadius: 15,
    borderWidth: 1,
    width: "80%",
    padding: 20,
  },
  viewImage: { alignItems: "center", marginBottom: 20 },
  image: { width: 100, height: 100, borderRadius: 50 },
  textInput: {
    backgroundColor: "#EDEDED",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#DE7B11",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18 },
  disabledButton: { backgroundColor: "#B0B0B0" },
});

export default SignUpPetScreen;
