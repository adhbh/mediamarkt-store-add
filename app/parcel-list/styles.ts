import { StyleSheet } from 'react-native';
import COLORS from '../../utils/colors';
import { SPACINGS } from '../../utils/spacings';
import { FONT_SIZE, FONT_WEIGHT } from '../../utils/fonts';

export const headingStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACINGS.xLarge,
    marginLeft: SPACINGS.large,
    marginRight: SPACINGS.large,
  },
  title: {
    fontSize: FONT_SIZE.heading,
    fontWeight: FONT_WEIGHT.heavy,
    marginLeft: SPACINGS.small,
    color: COLORS.darkGrey,
  },
  subTitle: {
    fontSize: FONT_SIZE.content,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.darkGrey,
    marginTop: SPACINGS.small,
    marginLeft: SPACINGS.large,
    marginRight: SPACINGS.large,
    marginBottom: SPACINGS.small,
  },
});

export const listStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: { flexDirection: 'row', alignItems: 'center' },
  contentContainer: { justifyContent: 'space-evenly' },
  icon: {
    padding: SPACINGS.small,
    backgroundColor: 'rgba(223, 0, 0, 0.1)',
    borderRadius: 10,
    fontSize: FONT_SIZE.heading,
    color: COLORS.red,
    marginRight: SPACINGS.small,
  },
  title: {
    fontSize: FONT_SIZE.subHeading,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.darkGrey,
  },
  content: {
    fontSize: FONT_SIZE.content,
    fontWeight: FONT_WEIGHT.medium,
    color: 'rgba(58, 53, 65, 0.87)',
  },
  deliveryStatusDelivery: {
    color: COLORS.red,
    fontWeight: FONT_WEIGHT.heavy,
    fontSize: FONT_SIZE.highlight,
  },
  deliveryStatusDelivered: {
    color: COLORS.darkGrey,
    fontWeight: FONT_WEIGHT.heavy,
    fontSize: FONT_SIZE.highlight,
  },
});
