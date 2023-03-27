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
import COLORS from '../../utils/colors';
import BottomSheet from '../../shared/BottomSheet/index';
import { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';
import { getItemsDetailsByIds } from '../../service/items/index';
import { ItemType } from '../../types/Item';
import CustomTextInput from '../../shared/TextInput/index';

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
        <Text style={listStyles.title}>{item.id}</Text>
        <Text style={listStyles.content}>{item.weight}</Text>
      </View>
    </View>
  </View>
);

type CarrierParcelListNavigationProp = StackScreenProps<
  RootStackParamList,
  'CarrierParcelList'
>;

const CarrierParcelList = ({ route }: CarrierParcelListNavigationProp) => {
  const navigation = useNavigation();

  const [items, setItems] = useState<ItemType[]>([]);

  const [driversName, setDriversName] = useState<string>('');
  const [licenseNumber, setLicenseNumber] = useState<string>('');

  const { params } = route;

  const itemIds = params.parcel.items;

  useEffect(() => {
    const getItemDetails = async () => {
      const itemsDetails = getItemsDetailsByIds(itemIds);
      setItems(itemsDetails);
    };
    getItemDetails();
  }, [itemIds]);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={headingStyles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name='arrowleft' size={24} color='black' />
        </Pressable>
        <Text style={headingStyles.title}>{params.title}</Text>
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <Item item={item} icon={ItemTypeIconMap[item.type]} />
        )}
        keyExtractor={(item) => item.id}
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
        onButtonPress={() => {
          setModalVisible(false);
        }}
      >
        <>
          <CustomTextInput
            placeholder={"Driver's Name"}
            containerStyles={{ marginBottom: 10 }}
            value={driversName}
            onChangeValue={(name) => {
              setDriversName(name);
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingRight: 20,
    paddingLeft: 20,
  },
});

export default CarrierParcelList;
