import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
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
import Alert from '../../shared/Alert/index';
import { containerStyles, listStyles } from './styles';

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
    // Validate for Carrier id to exist
    if (!carrierId) {
      setCarrierId('');
      setParcelId('');
      setModalVisible(false);
      setAddParcelError('Carrier Id not provided');
      return;
    }

    // Validate if Parcel is already added
    const parcelFromStorage = await getParcelById(parcelId);
    if (parcelFromStorage !== null) {
      setCarrierId('');
      setParcelId('');
      setModalVisible(false);
      setAddParcelError('Parcel has been already added to the list');
      return;
    }

    // Get Parcel data from api
    const parcelData = await getParcelByIdApi(parcelId);

    // Validate if Parcel id is available
    if (parcelData !== null) {
      const updatedParcelsData = await addToParcelsData(parcelData, carrierId);
      if (updatedParcelsData) {
        const updatedParcelLists = parcelsDataToParcelLists(updatedParcelsData);
        const sortedParcelListData = updatedParcelLists.sort((a, b) => {
          return (
            new Date(a.pickupDate).getTime() - new Date(b.pickupDate).getTime()
          );
        });
        setParcelLists(sortedParcelListData);
      }
    } else {
      setCarrierId('');
      setParcelId('');
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
    <SafeAreaView style={containerStyles.container}>
      <View style={listStyles.listContainer}>
        <FlatList
          data={parcelLists}
          renderItem={({ item }) => (
            <PickupListItem onItemPressed={onParcelItemPressed} item={item} />
          )}
          keyExtractor={(item) => item.pickupDate}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListDivider />}
          ListHeaderComponent={() => (
            <View style={listStyles.listHeaderContainer}>
              <Text style={listStyles.listHeading}>Parcel Lists</Text>
            </View>
          )}
        />
      </View>
      <View style={containerStyles.footerContainer}>
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
        icon={<AntDesign name='warning' style={listStyles.icon} />}
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
