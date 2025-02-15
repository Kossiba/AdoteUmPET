import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="screens/petList"
        options={{
          drawerLabel: "Visualizar Pets",
        }}
      />
      <Drawer.Screen
        name="screens/myPets"
        options={{
          drawerLabel: "Meus Pets",
        }}
      />
      <Drawer.Screen
        name="screens/favorite"
        options={{
          drawerLabel: "Meus Favoritos",
        }}
      />
      <Drawer.Screen
        name="screens/signUpPet"
        options={{
          drawerLabel: "Adoar pet",
        }}
      />
      <Drawer.Screen
        name="screens/home"
        options={{
          drawerLabel: "Sair",
        }}
      />
      <Drawer.Screen
        name="screens/signUp"
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="screens/login"
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="screens/petProfile"
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="index"
        options={{ drawerItemStyle: { display: "none" } }}
      />
    </Drawer>
  );
}
