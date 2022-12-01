import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';

const Drawer = createDrawerNavigator();
const HomeScreen = require("./screens/HomeScreen");
const AgentsScreen = require("./screens/AgentsScreen");
const WeaponsScreen = require("./screens/WeaponsScreen");
const AgentScreen = require("./screens/AgentScreen");

export default function App() {
  const [fontsLoaded] = useFonts({
    'ValorantFont': require('./assets/fonts/Valorant-Font.ttf'),
    'TungstenBold': require('./assets/fonts/Tungsten-Bold.ttf'),
  });

  if (!fontsLoaded) return <ActivityIndicator />;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#FD4556',
            marginTop: Constants.statusBarHeight,
          },
          drawerLabelStyle: {
            fontFamily: 'TungstenBold',
            fontSize: 24,
          },
          drawerActiveTintColor: '#FD4556',
          drawerInactiveTintColor: 'white',
          drawerActiveBackgroundColor: 'white',
          headerShown: false,
        }}
      >
        <Drawer.Screen name='Inicio' component={HomeScreen}/>
        <Drawer.Screen name='Agentes' component={AgentsScreen}/>
        <Drawer.Screen name='Arsenal' component={WeaponsScreen}/>
        <Drawer.Screen name='Agente' component={AgentScreen} options={{drawerItemStyle: { height: 0 }}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
