import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ranking } from "../screens/Ranking";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function RankingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.ranking.ranking}
        component={Ranking}
        options={{ title: "Ranking" }}
      />
    </Stack.Navigator>
  );
}
