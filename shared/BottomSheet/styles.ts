import { StyleSheet } from 'react-native';
import COLORS from '../../utils/colors';
import { SPACINGS } from '../../utils/spacings';
import { FONT_SIZE, FONT_WEIGHT } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    width: '100%',
    height: 1,
    marginBottom: SPACINGS.large,
  },
  bottomSheetView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: SPACINGS.large,
  },
  modalView: {
    backgroundColor: 'white',
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
  modalText: {
    marginBottom: SPACINGS.small,
    textAlign: 'center',
    fontSize: FONT_SIZE.modalHeading,
    fontWeight: FONT_WEIGHT.heavy,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    borderRadius: 10,
    elevation: 2,
    backgroundColor: COLORS.red,
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACINGS.large,
  },
});
