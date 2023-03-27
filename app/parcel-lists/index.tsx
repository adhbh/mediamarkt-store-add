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
import { StackNavigationProp } from '@react-navigation/stack';
import CustomSelector from '../../shared/Selector/index';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ParcelListType, ParcelType } from '../../types/ParcelList';
import { addToParcelsData, getParcelListsData } from '../../storage/ParcelsStorage/index';
import { getParcelById } from '../../service/parcels/index';

const COURIER_DATA = [
  {
    id: { $oid: 'het32r0g0u78' },
    companyName: 'Seur',
    driver: 'Manfred Steger',
    licensePlate: '3859fyh',
    centerAdress: 'St. Cal Patrici, 2, Barcelona',
  },
  {
    id: { $oid: 'het32gb78b6q' },
    companyName: 'MWR',
    driver: 'Anna-maria Tompion',
    licensePlate: '5780hqa',
    centerAdress: 'St. Paris, 158, Barcelona',
  },
  {
    id: { $oid: 'het32r0g36g9' },
    companyName: 'Seur',
    driver: 'Suellen Sandifer',
    licensePlate: '1008dcl',
    centerAdress: 'St. Cal Patrici, 2, Barcelona',
  },
  {
    id: { $oid: 'het32bf618ka' },
    companyName: 'DHL',
    driver: 'Demetra Luckman',
    licensePlate: '9255jvz',
    centerAdress: 'St. Estany de la Messeguera, 14, Barcelona',
  },
  {
    id: { $oid: 'het32bff15sm' },
    companyName: 'DHL',
    driver: 'Judd Beekman',
    licensePlate: '2349fia',
    centerAdress: 'St. Estany de la Messeguera, 14, Barcelona',
  },
  {
    id: { $oid: 'het32yw1747f' },
    companyName: 'Correos',
    driver: 'Charlean Booker',
    licensePlate: '3821has',
    centerAdress: 'St. Numero 29, 12, Barcelona',
  },
  {
    id: { $oid: 'het32gb7yh18' },
    companyName: 'MWR',
    driver: 'Stevana Hassan',
    licensePlate: '7711gus',
    centerAdress: 'St. Paris, 158, Barcelona',
  },
  {
    id: { $oid: 'het32r0gr6na' },
    companyName: 'Seur',
    driver: 'Gearard Dilke',
    licensePlate: '4601kme',
    centerAdress: 'St. Cal Patrici, 2, Barcelona',
  },
  {
    id: { $oid: 'het32yw174i5' },
    companyName: 'Correos',
    driver: 'Elaina Molyneaux',
    licensePlate: '8928jab',
    centerAdress: 'St. Numero 29, 12, Barcelona',
  },
  {
    id: { $oid: 'het32gb78j6v' },
    companyName: 'MWR',
    driver: 'Jecho Tatlock',
    licensePlate: '1072mbn',
    centerAdress: 'St. Paris, 158, Barcelona',
  },
];

type ParcelListsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ParcelLists'
>;

interface ParcelListsPropTypes {
  navigation: ParcelListsNavigationProp;
}

export default function ParcelLists(props: ParcelListsPropTypes) {
  const { navigation } = props;
  const [parcelLists, setParcelLists] = useState<ParcelListType[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [parcelId, setParcelId] = useState<string>('');
  const [carrierId, setCarrierId] = useState<string>('');

  const parcelsDataToParcelLists = (parcelsData: ParcelType[]) => {
    const uniquePickupDates = [
      ...new Set(parcelsData.map((item) => item.pickupDate)),
    ];
    const parcelListData = uniquePickupDates.map((pickupDate) => {
      return {
        pickupDate,
        parcels: parcelsData.filter(
          (parcel) => parcel.pickupDate === pickupDate
        ),
      };
    });

    return parcelListData
  }

  useEffect(() => {
    const getDefaultData = async () => {
      const defaultParcelsData = await getParcelListsData();
      if (defaultParcelsData) {
        const parcelListData = parcelsDataToParcelLists(defaultParcelsData)
        setParcelLists(parcelListData);
      }
    };
    getDefaultData();
  }, []);

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

    if(parcelData !== null) {
      const updatedParcelsData = await addToParcelsData(parcelData, carrierId)
      if (updatedParcelsData) {
        const updatedParcelLists = parcelsDataToParcelLists(updatedParcelsData)
        setParcelLists(updatedParcelLists)
      }
    }
    setModalVisible(false)
  };

  const data = COURIER_DATA.map((item) => ({
    id: item.id.$oid,
    value: `${item.companyName} (${item.id.$oid})`,
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
          ItemSeparatorComponent={() => (
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: COLORS.lightGrey,
                paddingBottom: 10,
                marginTop: 6,
                marginBottom: 6,
              }}
            />
          )}
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
          await onAddNewParcel()
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
            options={data}
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
