import { Pressable, StyleSheet, Text, View } from 'react-native';
import COLORS from '../../../../utils/colors';
import { ParcelListType } from '../../../../types/ParcelList';
import { FONT_SIZE, FONT_WEIGHT } from '../../../../utils/fonts';

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
      const carrierCount = item.deliveryInfo.carrierId ? 1 : 0;
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
          <Text style={styles.parcelListSubHeading}>
            Parcel List {item.pickupDate}
          </Text>
          <Text style={styles.carriersInfo}>
            {getTotalCarriers()} carriers will pick up the parcel on{' '}
            {item.pickupDate}
          </Text>
          <Text style={styles.parcelsInfo}>
            {item.parcels.length} parcels containing {getTotalItems()} items
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightPickupDate}>{item.pickupDate}</Text>
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
  rightContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  parcelListSubHeading: {
    fontSize: FONT_SIZE.subHeading,
    color: COLORS.darkGrey,
    fontWeight: FONT_WEIGHT.heavy,
  },
  parcelsInfo: {
    fontSize: FONT_SIZE.content,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.darkGrey,
  },
  carriersInfo: {
    fontSize: FONT_SIZE.content,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.darkGrey,
  },
  rightPickupDate: {
    fontSize: FONT_SIZE.highlight,
    color: COLORS.red,
    fontWeight: FONT_WEIGHT.heavy,
  },
});
