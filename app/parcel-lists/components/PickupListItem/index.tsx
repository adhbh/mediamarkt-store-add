import { Pressable, StyleSheet, Text, View } from 'react-native';
import COLORS from '../../../../utils/colors';
import { ParcelListType } from '../../../../types/ParcelList';

interface PickupListItemPropType {
  item: ParcelListType;
  onItemPressed: (item: ParcelListType) => void;
}
export default function PickupListItem(props: PickupListItemPropType) {
  const { onItemPressed, item } = props;

  const getTotalItems = () => {
    return item.parcels.reduce((memo, item) => {
      return memo + item.itemsCount;
    }, 0);
  };

  const getTotalCarriers = () => {
    return item.parcels.reduce((memo, item) => {
      const carrierCount = item.carrierId ? 1 : 0;
      return memo + carrierCount;
    }, 0);
  };

  return (
    <Pressable
      onPress={() => {
        onItemPressed(item);
      }}
    >
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <Text
            style={{ fontSize: 16, color: COLORS.darkGrey, fontWeight: '500' }}
          >
            Parcel List {item.pickupDate}
          </Text>
          <Text
            style={{ fontSize: 10, fontWeight: '400', color: COLORS.darkGrey }}
          >
            {getTotalCarriers()} carriers will pick up the parcel on{' '}
            {item.pickupDate}
          </Text>
          <Text
            style={{ fontSize: 10, fontWeight: '400', color: COLORS.darkGrey }}
          >
            {item.parcels.length} Parcels containing {getTotalItems()} items.
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <Text style={{ fontSize: 12, color: COLORS.red, fontWeight: '500' }}>
            {item.pickupDate}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
});
