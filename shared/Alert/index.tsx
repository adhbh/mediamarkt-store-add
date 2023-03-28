import React from 'react';
import { Modal, Text, View, Pressable } from 'react-native';
import { buttonStyles, containerStyles } from './styles';
import Backdrop from '../Backdrop/index';

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
  description,
}: React.PropsWithChildren<AlertPropsType>) => {
  return (
    <>
      {open ? <Backdrop /> : null}
      <Modal
        transparent={true}
        onRequestClose={onRequestClose}
        animationType='fade'
        visible={open}
      >
        <View style={containerStyles.centerdView}>
          <View style={containerStyles.modalView}>
            {icon}
            {children}
            <Text style={containerStyles.description}>{description}</Text>
            <Pressable
              onPress={onButtonPress}
              style={buttonStyles.buttonContainer}
            >
              <Text style={buttonStyles.buttonText}>{buttonText}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CustomAlert;
