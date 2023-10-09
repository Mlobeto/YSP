import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import VerEpisodios from './screens/VerEpisodios';
import ComoAplicarlaEnMiCaso from './screens/ComoAplicarlaEnMiCaso';
import AgendaLlamada from './screens/AgendaLlamada';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="VerEpisodios" component={VerEpisodios} />
      <Tab.Screen
        name="ComoAplicar"
        component={ComoAplicarlaEnMiCaso}
      />
      <Tab.Screen name="AgendaUnaLlamada" component={AgendaLlamada} />
    </Tab.Navigator>
  );
};

export default MainNavigator;