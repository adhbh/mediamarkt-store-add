import React from 'react';
import { Modal, Text, View, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import COLORS from '../../utils/colors';

const Alert = ({ visible, onClose, children, footerBtnText }: any) => {
  return (
    <Modal animationType='fade' transparent visible={visible}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.modalContainer}>
        <AntDesign name='checkcircleo' style={headerStyles.icon} />
        {children}
        <Pressable onPress={onClose} style={footerStyles.buttonContainer}>
          <Text style={footerStyles.buttonText}>{footerBtnText}</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
  },
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -150 },
      { translateY: -100 },
    ],
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center'
  },
});
const footerStyles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    backgroundColor: '#DF0000',
    alignItems: 'center',
    padding: 20,
    boxShadow: '0px 4px 8px -4px rgba(58, 53, 65, 0.42)',
    borderRadius: 5,
    marginTop: 35
  },
  buttonText: {
    color: 'white',
    fontWeight: '500'
  }
});
 const headerStyles = StyleSheet.create({
  icon: {
    fontSize: 48,
    color: '#DF0000',
    marginBottom: 20
  },
})

export default Alert;
