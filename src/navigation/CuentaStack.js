import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Cuenta } from "../screens/Cuenta/Cuenta";
import { LoginScreen } from "../screens/Cuenta/LoginScreen";
import { RegisterUser } from "../screens/Cuenta/RegisterUser";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function CuentaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.cuenta.cuenta}
        component={Cuenta}
        options={{ title: "Cuenta" }}
      />
      <Stack.Screen
        name={screen.cuenta.login}
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name={screen.cuenta.register}
        component={RegisterUser}
        options={{ title: "Crear cuenta" }}
      />
    </Stack.Navigator>
  );
}
