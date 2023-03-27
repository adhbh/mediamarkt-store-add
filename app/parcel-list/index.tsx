import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { headingStyles, listStyles } from './styles';
import COLORS from '../../utils/colors';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';
import { useEffect, useState } from 'react';
import { ParcelType } from '../../types/ParcelList';

interface ItemProps {
  parcel: ParcelType;
  onPressButton: (parcel: ParcelType) => void;
}

const Item = ({ parcel, onPressButton }: ItemProps) => (
  <View style={listStyles.itemContainer}>
    <Pressable onPress={() => onPressButton(parcel)}>
      <View style={listStyles.leftSection}>
        <FontAwesome5 name='truck' style={listStyles.icon} />
        <View style={listStyles.contentContainer}>
          <Text style={listStyles.title}>{parcel.id}</Text>
          <Text style={listStyles.content}>{parcel.carrierId}</Text>
          <Text style={listStyles.content}>
            {parcel.items.length} items to be picked up
          </Text>
        </View>
      </View>
    </Pressable>
    <Text style={listStyles.rightSection}>DELIVERY</Text>
  </View>
);

type ParcelListNavigationProp = StackScreenProps<
  RootStackParamList,
  'ParcelList'
>;

const ParcelList = ({
  route,
  navigation: navigationProp,
}: ParcelListNavigationProp) => {
  const navigation = useNavigation();

  const [parcels, setParcels] = useState<ParcelType[]>([]);

  const { params } = route;

  const onItemPress = (parcel: ParcelType) => {
    navigationProp.navigate('CarrierParcelList', {
      title: parcel.id,
      parcel: parcel,
    });
  };

  useEffect(() => {
    const getItemDetails = async () => {
      const parcelListData = params.parcelList;

      const parcels = parcelListData.parcels;

      setParcels(parcels);
    };
    getItemDetails();
  }, [params.parcelList]);

  const getTotalItems = () => {
    return parcels.reduce((memo, parcel) => {
      return memo + parcel.itemsCount;
    }, 0);
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
        {getTotalItems()} items to be picked up
      </Text>
      <FlatList
        style={{
          marginLeft: 20,
          marginRight: 20,
        }}
        data={parcels}
        renderItem={({ item: parcel }) => (
          <Item parcel={parcel} onPressButton={onItemPress} />
        )}
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
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ParcelList;
