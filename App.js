import { AppNavigation } from "./src/navigation/AppNavigation";
import Toast from "react-native-toast-message"
import { NavigationContainer } from "@react-navigation/native";
import { initFirebase } from "./src/utils";
import "react-native-get-random-values";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}
