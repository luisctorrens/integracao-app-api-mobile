import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { ProdutosScreen } from "./src/screens/ProdutosScreen";
import { DetalheScreen } from "./src/screens/DetalheScreen";
import { FormularioScreen } from "./src/screens/FormularioScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#eff6ff" },
          headerTintColor: "#0f172a",
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: "#f8fafc" },
        }}
      >
        <Stack.Screen name="Produtos" component={ProdutosScreen} options={{ title: "Produtos" }} />
        <Stack.Screen name="Detalhes" component={DetalheScreen} options={{ title: "Detalhes do produto" }} />
        <Stack.Screen
          name="Formulario"
          component={FormularioScreen}
          options={({ route }) => ({ title: route.params?.id ? "Editar produto" : "Novo produto" })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
