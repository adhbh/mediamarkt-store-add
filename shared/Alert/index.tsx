import React from 'react';
import { Modal, Text, View, StyleSheet, Pressable } from 'react-native';
import COLORS from "../../utils/colors";

interface AlertPropsType {
  open: boolean;
  onRequestClose: () => void;
  buttonText: string;
  icon: JSX.Element;
  onButtonPress: () => void;
  description: string;
}

const CustomAlert = ({
  open,
  onRequestClose,
  children,
  buttonText,
  icon,
  onButtonPress,
                       description
}: React.PropsWithChildren<AlertPropsType>) => {
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
        transparent={true}
        onRequestClose={onRequestClose}
        animationType='fade'
        visible={open}
      >
        <View style={styles.centerdView}>
          <View style={styles.modalView}>
            {icon}
            {children}
            <Text style={styles.description}>{description}</Text>
            <Pressable
              onPress={onButtonPress}
              style={footerStyles.buttonContainer}
            >
              <Text style={footerStyles.buttonText}>{buttonText}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centerdView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flex: 1,
    padding: 20,
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
  description: {
    fontSize: 20,
    color: COLORS.darkGrey,
    textAlign: 'center',
    fontWeight: '400'
  }
});
const footerStyles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    backgroundColor: '#DF0000',
    alignItems: 'center',
    padding: 20,
    boxShadow: '0px 4px 8px -4px rgba(58, 53, 65, 0.42)',
    borderRadius: 5,
    marginTop: 35,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default CustomAlert;
