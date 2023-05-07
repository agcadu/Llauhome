import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { VendedorStack } from "./VendedorStack";
import { RankingStack } from "./RankingStack";
import { CuentaStack } from "./CuentaStack";
import { BuscadorStack } from "./BuscadorStack";
import { screen } from "../utils";

const Tab = createBottomTabNavigator();

export function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "#646464",
        tabBarIcon: ({ color, size }) => iconOptions(route, color, size),
      })}
    >
      <Tab.Screen
        name={screen.vendedor.tab}
        component={VendedorStack}
        options={{ title: "Productos" }}
      />

      <Tab.Screen
        name={screen.ranking.tab}
        component={RankingStack}
        options={{ title: "Ranking" }}
      />
      <Tab.Screen
        name={screen.buscador.tab}
        component={BuscadorStack}
        options={{ title: "Buscador" }}
      />
      <Tab.Screen
        name={screen.cuenta.tab}
        component={CuentaStack}
        options={{ title: "Cuenta" }}
      />
    </Tab.Navigator>
  );
}

function iconOptions(route, color, size) {
  let iconName;

  if (route.name === screen.vendedor.tab) {
    iconName = "fruit-citrus";
  }  
  if (route.name === screen.ranking.tab) {
    iconName = "star-outline";
  }
  if (route.name === screen.buscador.tab) {
    iconName = "magnify";
  }
  if (route.name === screen.cuenta.tab) {
    iconName = "home-outline";
  }

  return (
    <Icon type="material-community" name={iconName} size={size} color={color} />
  );
}
