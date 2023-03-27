import COLORS from '../../utils/colors';
import { View } from 'react-native';

const ListDivider = () => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGrey,
        paddingBottom: 10,
        marginTop: 6,
        marginBottom: 6,
      }}
    />
  );
};

export default ListDivider;
