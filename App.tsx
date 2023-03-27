import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import ParcelLists from './app/parcel-lists';
import BarcodeScanner from './app/barcode-scanner';
import COLORS from './utils/colors';
import ParcelList from './app/parcel-list';
import { RootStackParamList } from './types/RootStackParamList';
import { useEffect } from 'react';
import { storeDefaultData } from './storage/ParcelListStorage';
import CarrierParcelList from './app/carrier-parcel-list';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    storeDefaultData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      >
        <Stack.Screen name='ParcelLists' component={ParcelLists} />
        <Stack.Screen name='ParcelList' component={ParcelList} initialParams={ { title: '' }}/>
        <Stack.Screen name='Scanner' component={BarcodeScanner} />
          <Stack.Screen name='CarrierParcelList' component={CarrierParcelList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
