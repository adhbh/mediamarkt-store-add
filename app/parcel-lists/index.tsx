import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PickupListItem from './components/PickupListItem';
import COLORS from '../../utils/colors';
import React, { useEffect, useState } from 'react';
import CustomTextInput from '../../shared/TextInput';
import BottomSheet from '../../shared/BottomSheet';
import { RootStackParamList } from '../../types/RootStackParamList';
import { StackScreenProps } from '@react-navigation/stack';
import CustomSelector from '../../shared/Selector/index';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { ParcelListType } from '../../types/ParcelList';
import {
  addToParcelsData,
  getParcelById,
  getParcelsData,
} from '../../storage/ParcelsStorage/index';
import { getParcelByIdApi } from '../../service/parcels/index';
import { useIsFocused } from '@react-navigation/native';
import ListDivider from '../../shared/ListDivider/index';
import { parcelsDataToParcelLists } from '../../utils/dataTranform';
import { getCarriers } from '../../service/carriers/index';
import {
  CarriersActions,
  useCarriersDispatch,
  useCarriersState,
} from '../../contexts/CarriersContext';
import { FONT_SIZE, FONT_WEIGHT } from '../../utils/fonts';
import { SPACINGS } from '../../utils/spacings';
import Alert from '../../shared/Alert/index';

type ParcelListsPropTypes = StackScreenProps<RootStackParamList, 'ParcelLists'>;

export default function ParcelLists(props: ParcelListsPropTypes) {
  const { navigation } = props;

  // State to save parcel lists grouped by pickup date
  const [parcelLists, setParcelLists] = useState<ParcelListType[]>([]);

  const isFocused = useIsFocused();

  const [modalVisible, setModalVisible] = useState(false);
  const [parcelId, setParcelId] = useState<string>('');
  const [carrierId, setCarrierId] = useState<string>('');

  const [addParcelError, setAddParcelError] = useState<string | null>(null);

  const dispatchCarriers = useCarriersDispatch();
  const carriers = useCarriersState();

  // Refetch parcels from storage when this screen is focused
  useEffect(() => {
    const getDefaultData = async () => {
      const defaultParcelsData = await getParcelsData();
      if (defaultParcelsData) {
        const parcelListData = parcelsDataToParcelLists(defaultParcelsData);
        const sortedParcelListData = parcelListData.sort((a, b) => {
          return (
            new Date(a.pickupDate).getTime() - new Date(b.pickupDate).getTime()
          );
        });
        setParcelLists(sortedParcelListData);
      }
    };
    getDefaultData();
  }, [isFocused]);

  // Refetch carriers from service when this screen is focused
  useEffect(() => {
    const getCarriersData = async () => {
      const carriers = await getCarriers();
      dispatchCarriers({ type: CarriersActions.SET_CARRIERS, data: carriers });
    };

    getCarriersData();
  }, [isFocused]);

  // Callback when a parcel list is tapped
  const onParcelItemPressed = (parcelList: ParcelListType) => {
    navigation.navigate('ParcelList', {
      title: `Parcel List ${parcelList.pickupDate}`,
      parcelList,
    });
  };

  // Callback when scanner button is pressed
  const onScannerButtonPressed = () => {
    navigation.navigate('Scanner');
  };

  // Callback when user adds a new parcel, add parcel to storage
  const onAddNewParcel = async () => {
    setCarrierId('');
    setParcelId('');
    const parcelFromStorage = await getParcelById(parcelId);
    if (parcelFromStorage !== null) {
      setModalVisible(false);
      setAddParcelError('Parcel has been already added to the list');
      return;
    }

    const parcelData = await getParcelByIdApi(parcelId);

    if (parcelData !== null) {
      const updatedParcelsData = await addToParcelsData(parcelData, carrierId);
      if (updatedParcelsData) {
        const updatedParcelLists = parcelsDataToParcelLists(updatedParcelsData);
        setParcelLists(updatedParcelLists);
      }
    } else {
      setAddParcelError("Parcel ID not found. Can't add it to the list.");
    }
    setCarrierId('');
    setParcelId('');
    setModalVisible(false);
  };

  // Carrier options to pass to CustomSelector component
  const carrierOptions = carriers.map((item) => ({
    id: item.id,
    value: `${item.companyName} (${item.id})`,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={parcelLists}
          renderItem={({ item }) => (
            <PickupListItem onItemPressed={onParcelItemPressed} item={item} />
          )}
          keyExtractor={(item) => item.pickupDate}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListDivider />}
          ListHeaderComponent={() => (
            <View style={styles.listHeaderContainer}>
              <Text style={styles.listHeading}>Parcel Lists</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.footerContainer}>
        <Pressable
          style={{
            position: 'absolute',
          }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Image
            source={require('../../assets/RoundButton.png')}
            style={{
              height: 80,
              width: 80,
            }}
          />
        </Pressable>

        <Pressable
          style={{
            position: 'absolute',
            right: 26,
          }}
          onPress={onScannerButtonPressed}
        >
          <MaterialCommunityIcons
            name='barcode-scan'
            size={40}
            color={COLORS.red}
          />
        </Pressable>
      </View>
      <BottomSheet
        open={modalVisible}
        onRequestClose={() => {
          setCarrierId('');
          setParcelId('');
          setModalVisible(false);
        }}
        title={'Parcel and carrier information'}
        buttonTitle={'ADD'}
        onButtonPress={async () => {
          await onAddNewParcel();
        }}
      >
        <>
          <CustomTextInput
            placeholder={'ID'}
            containerStyles={{ marginBottom: 10 }}
            value={parcelId}
            onChangeValue={setParcelId}
          />
          <CustomSelector
            placeholder={'Carrier ID'}
            options={carrierOptions}
            onSelectItem={(item) => {
              setCarrierId(item.id);
            }}
            selectedId={carrierId}
          />
        </>
      </BottomSheet>

      <Alert
        icon={<AntDesign name='warning' style={styles.icon} />}
        open={!!addParcelError}
        onRequestClose={() => {
          setAddParcelError(null);
        }}
        buttonText={'BACK'}
        onButtonPress={() => {
          setAddParcelError(null);
        }}
        description={addParcelError ? addParcelError : ''}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContainer: {
    flex: 1,
    marginLeft: SPACINGS.large,
    marginRight: SPACINGS.large,
  },
  listHeaderContainer: {
    marginBottom: SPACINGS.small,
    marginTop: SPACINGS.xLarge,
  },
  listHeading: { fontSize: FONT_SIZE.heading, fontWeight: FONT_WEIGHT.heavy },
  footerContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    fontSize: 48,
    color: COLORS.red,
    marginBottom: SPACINGS.large,
  },
});
