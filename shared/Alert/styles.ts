import { StyleSheet } from 'react-native';
import { SPACINGS } from '../../utils/spacings';
import COLORS from '../../utils/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../../utils/fonts';

export const containerStyles = StyleSheet.create({
  centerdView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flex: 1,
    padding: SPACINGS.large,
  },
  modalView: {
    backgroundColor: COLORS.white,
    borderRadius: SPACINGS.large,
    padding: SPACINGS.large,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  description: {
    fontSize: FONT_SIZE.subHeading,
    color: COLORS.darkGrey,
    textAlign: 'center',
    fontWeight: FONT_WEIGHT.medium,
  },
});

export const buttonStyles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    backgroundColor: COLORS.red,
    alignItems: 'center',
    padding: SPACINGS.large,
    borderRadius: 5,
    marginTop: SPACINGS.large,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.heavy,
  },
});
