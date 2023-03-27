import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {FlatList, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { headingStyles, listStyles } from './styles';
import COLORS from '../../utils/colors';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';

const data = [
  { parcelTitle: '641DB7B2FC13 Parcel List', courierName: 'Seur', count: 5 },
  { parcelTitle: '641DB7B2FC14 Parcel List', courierName: 'MRW', count: 4 },
  { parcelTitle: '641DB7B2FC15 Parcel List', courierName: 'DHL', count: 3 },
  { parcelTitle: '641DB7B2FC16 Parcel List', courierName: 'UPA', count: 2 },
];

interface ItemProps  {
    title: string;
  courierName: string;
  count: number;
  onPressButton: () => void;
}

const Item = ({ title, courierName, count, onPressButton }: ItemProps) => (
  <View style={listStyles.itemContainer}>
  <Pressable onPress={onPressButton}>
    <View style={listStyles.leftSection}>
      <FontAwesome5 name='truck' style={listStyles.icon} />
      <View style={listStyles.contentContainer}>
        <Text style={listStyles.title}>{title}</Text>
        <Text style={listStyles.content}>{courierName}</Text>
        <Text style={listStyles.content}>{count} items to be picked up</Text>
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

const ParcelList = ({ route, navigation: navigationProp }: ParcelListNavigationProp) => {
  const navigation = useNavigation();


  const onDeliveryButtonPress = () => {
    navigationProp.navigate('CarrierParcelList')
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={headingStyles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name='arrowleft' size={24} color='black' />
        </Pressable>
          <Text style={headingStyles.title}>{route.params.title}</Text>
      </View>
      <Text style={headingStyles.subTitle}>14 items to be picked up</Text>
      <FlatList
        style={{
          marginLeft: 20,
          marginRight: 20
        }}
        data={data}
        renderItem={({ item }) => (
          <Item
            title={item.parcelTitle}
            courierName={item.courierName}
            count={item.count}
            onPressButton={onDeliveryButtonPress}
          />
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
        keyExtractor={(item) => item.parcelTitle}
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
