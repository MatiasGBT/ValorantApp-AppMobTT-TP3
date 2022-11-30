import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Constants from 'expo-constants';
import { ActivityIndicator } from 'react-native';

const Drawer = createDrawerNavigator();
const HomeScreen = require("./screens/HomeScreen");
const AgentsScreen = require("./screens/AgentsScreen");
const WeaponsScreen = require("./screens/WeaponsScreen");

export default function App() {
  const [fontsLoaded] = useFonts({
    'ValorantFont': require('./assets/fonts/Valorant-Font.ttf'),
    'TungstenBold': require('./assets/fonts/Tungsten-Bold.ttf'),
  });

  if (!fontsLoaded) return <ActivityIndicator/>;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#FD4556',
            marginTop: Constants.statusBarHeight,
          },
          drawerLabelStyle: {
            color: 'white',
            fontFamily: 'TungstenBold',
            fontSize: 24,
          }
        }}
      >
        <Drawer.Screen name='Inicio' component={HomeScreen} options={{headerShown: false}}/>
        <Drawer.Screen name='Agentes' component={AgentsScreen} options={{headerShown: false}}/>
        <Drawer.Screen name='Arsenal' component={WeaponsScreen} options={{headerShown: false}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
