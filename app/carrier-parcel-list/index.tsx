import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { footerStyles, headingStyles, listStyles } from './styles';
import COLORS from '../../utils/colors';
import CustomTextInput from '../../shared/TextInput/index';
import BottomSheet from '../../shared/BottomSheet/index';
import { useState } from 'react';

const data = [
  {
    id: 'FC13AE2238000168',
    icon: <AntDesign name='laptop' style={listStyles.icon} />,
    weight: '2kg',
  },
  {
    id: 'FC13AE2238000169',
    icon: <Feather name='smartphone' style={listStyles.icon} />,
    weight: '2kg',
  },
  {
    id: 'FC13AE2238000170',
    icon: <AntDesign name='laptop' style={listStyles.icon} />,
    weight: '2kg',
  },
  {
    id: 'FC13AE2238000171',
    icon: <Ionicons name='ios-watch' style={listStyles.icon} />,
    weight: '2kg',
  },
  {
    id: 'FC13AE2238000172',
    icon: <Ionicons name='ios-watch' style={listStyles.icon} />,
    weight: '2kg',
  },
];

const Item = ({ id, icon, weight }: any) => (
  <View style={listStyles.itemContainer}>
    <View style={listStyles.leftSection}>
      {icon}
      <View style={listStyles.contentContainer}>
        <Text style={listStyles.title}>{id}</Text>
        <Text style={listStyles.content}>{weight}</Text>
      </View>
    </View>
  </View>
);

const CarrierParcelList = ({ title = 'SK16588798 Parcel List' }) => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={headingStyles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name='arrowleft' size={24} color='black' />
        </Pressable>
        <Text style={headingStyles.title}>{title}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item id={item.id} icon={item.icon} weight={item.weight} />
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
          />
          <CustomTextInput placeholder={'License Plate'} />
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
