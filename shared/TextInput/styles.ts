import { StyleSheet } from 'react-native';
import COLORS from '../../utils/colors';
import { FONT_SIZE } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingTop: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    height: 56,
  },
  icon: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: FONT_SIZE.subHeading,
    height: 24,
    color: COLORS.darkGrey,
  },
  label: {
    color: COLORS.darkGrey,
    fontSize: 14,
  },
  animatedStyle: {
    top: 15,
    left: 15,
    position: 'absolute',
    borderRadius: 90,
    zIndex: 10000,
    backgroundColor: COLORS.white,
  },
});
