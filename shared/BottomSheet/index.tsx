import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import COLORS from '../../utils/colors';

export default function BottomSheet(props: any) {
  const { open, onRequestClose, onButtonPress, title, buttonTitle } = props;

  return (
    <>
      {open ? (
        <Pressable
          onPress={onRequestClose}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            }}
          />
        </Pressable>
      ) : null}

      <Modal
        animationType='slide'
        visible={open}
        transparent={true}
        onRequestClose={onRequestClose}
      >
        <View style={styles.bottomSheetView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <View style={styles.divider}></View>
            {props.children}
            <Pressable
              style={[styles.button]}
              onPress={() => {
                onButtonPress();
              }}
            >
              <Text style={styles.textStyle}>{buttonTitle}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    width: '100%',
    height: 1,
    marginBottom: 20,
  },
  bottomSheetView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 22,
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
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
    marginTop: 20,
  },
});
