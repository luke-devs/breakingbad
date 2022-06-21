import { NativeBaseProvider, extendTheme } from "native-base";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Store } from "./redux/store/index"
import { Provider } from "react-redux";
import CharacterList from "./screens/CharacterList";
import CharacterInfo from "./screens/CharacterInfo";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const AppWrapper = () => {
  return (
    <Provider store={Store}>
      <App /> 
    </Provider>
  )
}

const App = () => {
  const theme = extendTheme({
    colors: {
      // Redefinig only one shade, rest of the color will remain same.
      gray: {
        100: "#9da8b5",
        400: '#46576d',
      },
      blue: {
        500: "#3b82f6"
      }
    }
  });
  return (
    <NativeBaseProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar style="auto"/>
          <Stack.Navigator initialRouteName="Character List" screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Character List" component={CharacterList} />
            <Stack.Screen name="Character Info" component={CharacterInfo} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </NativeBaseProvider>
  );
}

export default AppWrapper
