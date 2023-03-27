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
import { useEffect, useState } from 'react';
import CustomTextInput from '../../shared/TextInput';
import BottomSheet from '../../shared/BottomSheet';
import { RootStackParamList } from '../../types/RootStackParamList';
import { StackScreenProps } from '@react-navigation/stack';
import CustomSelector from '../../shared/Selector/index';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ParcelListType, ParcelType } from '../../types/ParcelList';
import {
  addToParcelsData,
  getParcelsData,
} from '../../storage/ParcelsStorage/index';
import { getParcelById } from '../../service/parcels/index';
import { useIsFocused } from '@react-navigation/native';
import ListDivider from '../../shared/ListDivider/index';
import { parcelsDataToParcelLists } from '../../utils/dataTranform';
import { getCarriers } from '../../service/carriers/index';
import {
  CarriersActions,
  useCarriersDispatch,
  useCarriersState,
} from '../../contexts/CarriersContext';

type ParcelListsPropTypes = StackScreenProps<RootStackParamList, 'ParcelLists'>;

export default function ParcelLists(props: ParcelListsPropTypes) {
  const { navigation } = props;
  const [parcelLists, setParcelLists] = useState<ParcelListType[]>([]);

  const isFocused = useIsFocused();

  const [modalVisible, setModalVisible] = useState(false);
  const [parcelId, setParcelId] = useState<string>('');
  const [carrierId, setCarrierId] = useState<string>('');

  const dispatchCarriers = useCarriersDispatch();

  const carriers = useCarriersState();

  useEffect(() => {
    const getDefaultData = async () => {
      const defaultParcelsData = await getParcelsData();
      if (defaultParcelsData) {
        const parcelListData = parcelsDataToParcelLists(defaultParcelsData);
        setParcelLists(parcelListData);
      }
    };
    getDefaultData();
  }, [isFocused]);

  useEffect(() => {
    const getCarriersData = async () => {
      const carriers = await getCarriers();
      dispatchCarriers({ type: CarriersActions.SET_CARRIERS, data: carriers });
    };

    getCarriersData();
  }, [isFocused]);

  const onItemPressed = (parcelList: ParcelListType) => {
    navigation.navigate('ParcelList', {
      title: `Parcel List ${parcelList.pickupDate}`,
      parcelList,
    });
  };

  const onScannerPressed = () => {
    navigation.navigate('Scanner');
  };

  const onAddNewParcel = async () => {
    const parcelData = await getParcelById(parcelId);

    if (parcelData !== null) {
      const updatedParcelsData = await addToParcelsData(parcelData, carrierId);
      if (updatedParcelsData) {
        const updatedParcelLists = parcelsDataToParcelLists(updatedParcelsData);
        setParcelLists(updatedParcelLists);
      }
    }
    setModalVisible(false);
  };

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
            <PickupListItem onItemPressed={onItemPressed} item={item} />
          )}
          keyExtractor={(item) => item.pickupDate}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListDivider />}
          ListHeaderComponent={() => (
            <View style={{ marginBottom: 17, marginTop: 48 }}>
              <Text style={{ fontSize: 24, fontWeight: '500' }}>
                Parcel lists
              </Text>
            </View>
          )}
        />
      </View>
      <View
        style={{
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
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
          onPress={onScannerPressed}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: { flex: 1, marginLeft: 20, marginRight: 20 },
});
