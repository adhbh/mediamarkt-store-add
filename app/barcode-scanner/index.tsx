import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import COLORS from '../../utils/colors';
import BottomSheet from '../../shared/BottomSheet';
import { FontAwesome5 } from '@expo/vector-icons';

export default function BarcodeScanner() {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const [showParcelAdditionModal, setShowParcelAdditionModal] =
    useState<boolean>(true);

  // Get permission
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    setShowParcelAdditionModal(true);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <BottomSheet
        open={showParcelAdditionModal}
        onRequestClose={() => setShowParcelAdditionModal(false)}
        onButtonPress={() => setShowParcelAdditionModal(false)}
      >
        <View style={styles.parcelAddedContainer}>
          <View style={listStyles.itemContainer}>
            <FontAwesome5 name='truck' style={listStyles.icon} />
            <View style={listStyles.contentContainer}>
              <Text style={listStyles.title}>641DB7B2FC13</Text>
              <Text style={listStyles.content}>
                The carrier will pick up the parcel today at 10:22 AM
              </Text>
            </View>
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  parcelAddedContainer: {
    width: '100%',
    height: 85,
    marginBottom: 23,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: 'row',
  },
});

const listStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 15,
    width: '100%',
  },
  contentContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  icon: {
    padding: 15,
    backgroundColor: 'rgba(223, 0, 0, 0.1)',
    borderRadius: 10,
    fontSize: 24,
    color: '#df0000',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.darkGrey,
  },
  content: {
    fontSize: 10,
    fontWeight: '400',
    color: COLORS.darkGrey,
    flexShrink: 1,
  },
  rightSection: { color: '#DF0000', fontWeight: '500', fontSize: 10 },
});
