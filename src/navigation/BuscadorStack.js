import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Buscador} from "../screens/Buscador";
import {screen} from "../utils";

const Stack = createNativeStackNavigator();

export function BuscadorStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={screen.buscador.buscador}
                component={Buscador}
                options={{title: "Buscador"}}
            />
        </Stack.Navigator>
    );
}

