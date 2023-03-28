import { StyleSheet } from 'react-native';
import COLORS from '../../utils/colors';
import { SPACINGS } from '../../utils/spacings';
import { FONT_SIZE, FONT_WEIGHT } from '../../utils/fonts';

export const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  footerContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export const listStyles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginLeft: SPACINGS.large,
    marginRight: SPACINGS.large,
  },
  listHeaderContainer: {
    marginBottom: SPACINGS.small,
    marginTop: SPACINGS.xLarge,
  },
  listHeading: { fontSize: FONT_SIZE.heading, fontWeight: FONT_WEIGHT.heavy },
  icon: {
    fontSize: 48,
    color: COLORS.red,
    marginBottom: SPACINGS.large,
  },
});
