import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Vendedores } from "../screens/Vendedores/Vendedores";
import { AddVendedor } from "../screens/Vendedores/AddVendedor";
import { VendedoresScreen} from "../screens/Vendedores/VendedoresScreen";
import { AddReview } from "../screens/Vendedores/AddReview/AddReview"
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function VendedorStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.vendedor.vendedores}
        component={Vendedores}
        options={{ title: "Productos" }}
      />
      <Stack.Screen
        name={screen.vendedor.addVendedor}
        component={AddVendedor}
        options={{ title: "nuevo producto" }}
      />
      <Stack.Screen
        name={screen.vendedor.producto}
        component={VendedoresScreen}
        options={{ title: "Producto" }}
      />
      <Stack.Screen
        name={screen.vendedor.addReview}
        component={AddReview}
        options={{ title: "Nueva review" }}
      />  
    </Stack.Navigator>
  );
}
