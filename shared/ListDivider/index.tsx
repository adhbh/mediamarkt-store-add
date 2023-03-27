import COLORS from '../../utils/colors';
import { View } from 'react-native';
import { SPACINGS } from '../../utils/spacings';

const ListDivider = () => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGrey,
        marginTop: SPACINGS.small,
        marginBottom: SPACINGS.small,
      }}
    />
  );
};

export default ListDivider;
