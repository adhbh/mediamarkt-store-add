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
    fontSize: FONT_SIZE.subHeading,
  },
  animatedStyle: {
    position: 'absolute',
    top: -5,
    borderRadius: 90,
    zIndex: 10000,
    backgroundColor: COLORS.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 22,
    width: '100%',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
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
    height: 300,
  },
  selectionItem: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  listContainer: {
    width: '100%',
  },
  listItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.darkGrey,
  },
});
