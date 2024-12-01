import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Expo Router!</Text>
      <Link href="/login" style={styles.link}>Entrar</Link>
      <Link href="/signUp" style={styles.link}>Cadastrar</Link>
      <Link href="/petList" style={styles.link}>Pets</Link>
      <Link href="/favorite" style={styles.link}>Favoritos</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  link: {
    marginTop: 20,
    fontSize: 16,
    color: '#6200ea',
    textDecorationLine: 'underline',
  },
});
