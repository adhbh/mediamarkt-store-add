import COLORS from '../../utils/colors';
import { StyleSheet, View } from 'react-native';
import { SPACINGS } from '../../utils/spacings';

const ListDivider = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    marginTop: SPACINGS.small,
    marginBottom: SPACINGS.small,
  },
});

export default ListDivider;
