import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import COLORS from '../../utils/colors';
import BottomSheet from '../../shared/BottomSheet';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { getParcelByIdApi } from '../../service/parcels/index';
import { ParcelType } from '../../types/ParcelList';
import Alert from '../../shared/Alert/index';
import { FONT_SIZE } from '../../utils/fonts';
import { SPACINGS } from '../../utils/spacings';
import CustomSelector from '../../shared/Selector/index';
import { useCarriersState } from '../../contexts/CarriersContext';
import {
  addToParcelsData,
  getParcelById,
} from '../../storage/ParcelsStorage/index';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';

type ScannerPropTypes = StackScreenProps<RootStackParamList, 'Scanner'>;

export default function BarcodeScanner({ navigation }: ScannerPropTypes) {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const [showParcelAdditionBottomSheet, setShowParcelAdditionBottomSheet] =
    useState<boolean>(false);
  const [carrierId, setCarrierId] = useState<string>('');

  const [showCourierAdditionBottomSheet, setCourierAdditionBottomSheet] =
    useState<boolean>(false);

  const [parcelScanError, setParcelScanError] = useState<string | null>(null);

  const [parcel, setParcel] = useState<ParcelType | null>(null);

  const carriers = useCarriersState();

  // Get permission
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: any) => {
    setScanned(true);
    const parcelData = await getParcelByIdApi(data);
    if (!parcelData) {
      setShowParcelAdditionBottomSheet(false);
      setScanned(false);
      setParcelScanError(
        `Parcel does not exist for the scanned parcel id: ${data}`
      );
      return;
    }
    setParcel(parcelData);
    setShowParcelAdditionBottomSheet(true);
  };

  const onNextTapped = () => {
    setShowParcelAdditionBottomSheet(false);
    setCourierAdditionBottomSheet(true);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const carrierOptions = carriers.map((item) => ({
    id: item.id,
    value: `${item.companyName} (${item.id})`,
  }));

  const onAddNewParcel = async () => {
    if(!carrierId) {
      setCarrierId('');
      setParcel(null);
      setScanned(false);
      setCourierAdditionBottomSheet(false)
      setParcelScanError('Carrier Id not provided');
      return;
    }
    if (parcel && parcel.id) {
      const parcelFromStorage = await getParcelById(parcel.id);
      if (parcelFromStorage !== null) {
        setCarrierId('');
        setParcel(null);
        setCourierAdditionBottomSheet(false);
        setParcelScanError('Parcel has been already added to the list');
        return;
      }
      const updatedParcelsData = await addToParcelsData(parcel, carrierId);
      if (updatedParcelsData) {
        navigation.navigate('ParcelLists');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <BottomSheet
        open={showParcelAdditionBottomSheet}
        onRequestClose={() => {
          setScanned(false);
          setShowParcelAdditionBottomSheet(false);
        }}
        onButtonPress={onNextTapped}
        buttonTitle='NEXT'
        title='Adding following parcel'
      >
        <View style={styles.parcelAddedContainer}>
          <View style={listStyles.itemContainer}>
            <FontAwesome5 name='truck' style={listStyles.icon} />
            <View style={listStyles.contentContainer}>
              <Text style={listStyles.title}>{parcel?.id}</Text>
              <Text style={listStyles.content}>
                The carrier will pick up the parcel on {parcel?.pickupDate}
              </Text>
            </View>
          </View>
        </View>
      </BottomSheet>

      <BottomSheet
        open={showCourierAdditionBottomSheet}
        onRequestClose={() => {
          setScanned(false);
          setCourierAdditionBottomSheet(false);
        }}
        onButtonPress={async () => {
          await onAddNewParcel();
        }}
        buttonTitle='ADD'
        title='Select Carrier Info'
      >
        <CustomSelector
          placeholder={'Carrier ID'}
          options={carrierOptions}
          onSelectItem={(item) => {
            setCarrierId(item.id);
          }}
          selectedId={carrierId}
        />
      </BottomSheet>

      <Alert
        icon={<AntDesign name='warning' style={headerStyles.icon} />}
        open={!!parcelScanError}
        onRequestClose={() => {
          setScanned(false);
          setParcelScanError(null);
        }}
        buttonText={'BACK'}
        onButtonPress={() => {
          setScanned(false);
          setParcelScanError(null);
        }}
        description={parcelScanError ? parcelScanError : 'Something went wrong'}
      />
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

const headerStyles = StyleSheet.create({
  icon: {
    fontSize: FONT_SIZE.heading,
    color: COLORS.red,
    marginBottom: SPACINGS.small,
  },
});
