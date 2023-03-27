import { StyleSheet } from 'react-native';
import COLORS from '../../utils/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../../utils/fonts';
import { SPACINGS } from '../../utils/spacings';

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
    padding: 15,
    backgroundColor: 'rgba(223, 0, 0, 0.1)',
    borderRadius: 10,
    fontSize: 24,
    color: COLORS.red,
    marginRight: SPACINGS.small,
  },
  title: {
    fontSize: FONT_SIZE.subHeading,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.darkGrey,
  },
  content: {
    fontSize: 10,
    fontWeight: '400',
    color: 'rgba(58, 53, 65, 0.87)',
  },
  rightSection: { color: '#DF0000', fontWeight: '500', fontSize: 10 },
});

export const footerStyles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    backgroundColor: '#DF0000',
    alignItems: 'center',
    padding: 20,
    boxShadow: '0px 4px 8px -4px rgba(58, 53, 65, 0.42)',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
});
