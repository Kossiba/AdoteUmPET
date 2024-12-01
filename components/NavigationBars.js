import React from "react";
import{
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

const NavigationBars = ({ navigation }) =>{
    const router = useRouter();
    
    return (
        <View style={styles.container}>
            <Ionicons name="menu-outline" size={50} color="black" />
            <Text style={styles.textAdote}>Adote<Text style={styles.textUmPET}>UmPET</Text></Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push("/petList")}>
            <Text style={styles.buttonText}>PETs</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        top: 0,

        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        gap: 50,

        backgroundColor: "#F4F4F4",
        
        width: "100%",
        height: "10%",
        
    },
    textAdote: {
        color: "red",
        fontWeight: 400,
        fontFamily: "thin",
        fontSize: 22,
    },
    textUmPET: {
        color: "blue",
        fontWeight: 400,
        fontFamily: "thin",
        fontSize: 22,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "#DE7B11",

        width: "20%",
        height: "50%",

        borderRadius: 50,
        
        fontSize: 22,
        
    },
    buttonText: {
        marginLeft: 2,
        marginBottom: 1,

        fontWeight: 400,
        fontFamily: "thin",
    }
})

export default NavigationBars;