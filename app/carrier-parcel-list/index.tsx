import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { footerStyles, headingStyles, listStyles } from './styles';
import BottomSheet from '../../shared/BottomSheet/index';
import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';
import { getItemsDetailsByIds } from '../../service/items/index';
import { ItemType } from '../../types/Item';
import CustomTextInput from '../../shared/TextInput/index';
import {
  getParcelsData,
  updateParcelById,
} from '../../storage/ParcelsStorage/index';
import { DeliveryStatus } from '../../types/ParcelList';
import ListDivider from '../../shared/ListDivider/index';
import COLORS from '../../utils/colors';
import {
  findCarrierFromDriverNameAndLicencePlate,
  parcelsDataToParcelLists,
} from '../../utils/dataTranform';
import Alert from '../../shared/Alert/index';
import { useCarriersState } from '../../contexts/CarriersContext';
import { FONT_SIZE } from '../../utils/fonts';
import { SPACINGS } from '../../utils/spacings';

interface ItemTypeIconMap {
  [type: string]: JSX.Element;
}
const ItemTypeIconMap: ItemTypeIconMap = {
  Phone: <Feather name='smartphone' style={listStyles.icon} />,
  PC: <AntDesign name='laptop' style={listStyles.icon} />,
  Smartwatch: <Ionicons name='ios-watch' style={listStyles.icon} />,
  Television: <AntDesign name='laptop' style={listStyles.icon} />,
};

interface ItemPropType {
  item: ItemType;
  icon: JSX.Element;
}
const Item = ({ item, icon }: ItemPropType) => (
  <View style={listStyles.itemContainer}>
    <View style={listStyles.leftSection}>
      {icon}
      <View style={listStyles.contentContainer}>
        <Text style={listStyles.title}>{item.id.toUpperCase()}</Text>
        <Text style={listStyles.content}>{item.weight} gm</Text>
      </View>
    </View>
  </View>
);

type CarrierParcelListNavigationProp = StackScreenProps<
  RootStackParamList,
  'CarrierParcelList'
>;

const CarrierParcelList = ({
  route,
  navigation: sceenNavigation,
}: CarrierParcelListNavigationProp) => {
  const navigation = useNavigation();

  const [items, setItems] = useState<ItemType[]>([]);

  const [driverName, setDriverName] = useState<string>('');
  const [licenseNumber, setLicenseNumber] = useState<string>('');

  const [delivered, setDelivered] = useState<boolean>(false);
  const [deliveryError, setDeliveryError] = useState<boolean>(false);

  const { params } = route;

  const itemIds = params.parcel.items;

  const carriers = useCarriersState();

  useEffect(() => {
    const getItemDetails = async () => {
      const itemsDetails = getItemsDetailsByIds(itemIds);
      setItems(itemsDetails);
    };
    getItemDetails();
  }, [itemIds]);

  const [modalVisible, setModalVisible] = useState(false);

  const updateDeliveryStatus = async () => {
    const carrier = findCarrierFromDriverNameAndLicencePlate(
      carriers,
      driverName,
      licenseNumber
    );

    if (carrier) {
      const updatedParcel = await updateParcelById(params.parcel.id, {
        ...params.parcel,
        deliveryInfo: {
          carrierId: carrier.id,
          status: DeliveryStatus.DELIVERED,
        },
      });
      if (updatedParcel) {
        setDelivered(true);
      } else {
        setDeliveryError(true);
      }
    } else {
      setDeliveryError(true);
    }
    setModalVisible(false);
  };

  const navigateToParcelList = async () => {
    const parcels = await getParcelsData();
    const parcelLists = parcelsDataToParcelLists(parcels);

    const updatedParcelList = parcelLists.find(
      (parcelList) => parcelList.pickupDate === params.parcelList.pickupDate
    );

    if (updatedParcelList) {
      sceenNavigation.navigate('ParcelList', {
        title: `Parcel list ${params.parcelList.pickupDate}`,
        parcelList: updatedParcelList,
      });
    } else {
      setDeliveryError(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={headingStyles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name='arrowleft' size={24} color='black' />
        </Pressable>
        <Text style={headingStyles.title}>{params.title}</Text>
      </View>
      <Text style={headingStyles.subTitle}>
        {params.parcel.itemsCount} items to be picked up
      </Text>
      <FlatList
        style={{
          marginLeft: 20,
          marginRight: 20,
        }}
        data={items}
        renderItem={({ item }) => (
          <Item item={item} icon={ItemTypeIconMap[item.type]} />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <ListDivider />}
      />

      <View
        style={{
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <Pressable
          onPress={() => {
            setModalVisible(true);
          }}
          style={footerStyles.buttonContainer}
        >
          <Text style={footerStyles.buttonText}>DELIVERY</Text>
        </Pressable>
      </View>

      <BottomSheet
        open={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        title={'Delivery Information'}
        buttonTitle={'NEXT'}
        onButtonPress={async () => {
          await updateDeliveryStatus();
        }}
      >
        <>
          <CustomTextInput
            placeholder={"Driver's Name"}
            containerStyles={{ marginBottom: 10 }}
            value={driverName}
            onChangeValue={(name) => {
              setDriverName(name);
            }}
          />
          <CustomTextInput
            placeholder={'License Plate'}
            value={licenseNumber}
            onChangeValue={(name) => {
              setLicenseNumber(name);
            }}
          />
        </>
      </BottomSheet>

      <Alert
        icon={<AntDesign name='checkcircleo' style={headerStyles.icon} />}
        open={delivered}
        onRequestClose={() => {
          setDelivered(false);
        }}
        buttonText={'Show Parcel List'}
        onButtonPress={async () => {
          await navigateToParcelList();
        }}
        description={'Parcel successfully delivered to carrier'}
      />

      <Alert
        icon={<AntDesign name='warning' style={headerStyles.icon} />}
        open={deliveryError}
        onRequestClose={() => {
          setDeliveryError(false);
        }}
        buttonText={'BACK'}
        onButtonPress={() => {
          setDeliveryError(false);
        }}
        description={'Some information is wrong'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

const headerStyles = StyleSheet.create({
  icon: {
    fontSize: FONT_SIZE.heading,
    color: COLORS.red,
    marginBottom: SPACINGS.small,
  },
});

export default CarrierParcelList;
