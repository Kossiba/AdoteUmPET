import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter, useSegments } from "expo-router";
import { useNavigation } from "@react-navigation/native";

const NavigationBars = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const segments = useSegments(); 

    const isAuthScreen = segments.includes("login") || segments.includes("signUp");

    return (
        <View style={styles.container}>
            {!isAuthScreen && ( 
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons name="menu-outline" size={50} color="black" />
                </TouchableOpacity>
            )}
            <Text style={styles.textAdote}>Adote<Text style={styles.textUmPET}>UmPET</Text></Text>
            
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => router.push(isAuthScreen ? "/screens/home" : "/screens/petList")}
            >
                <Text style={styles.buttonText}>
                    {isAuthScreen ? "Home" : "PETs"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
        fontWeight: "400",
        fontSize: 22,
    },
    textUmPET: {
        color: "blue",
        fontWeight: "400",
        fontSize: 22,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DE7B11",
        width: "20%",
        height: "50%",
        borderRadius: 50,
    },
    buttonText: {
        fontWeight: "400",
        color: "#fff",
    }
});

export default NavigationBars;
