import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import RootRoutes from "./app/RootRoutes";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";


export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <StatusBar backgroundColor={'purple'}/>
      <RootRoutes/>
    </NavigationContainer>
    </Provider>
    
  );
}


