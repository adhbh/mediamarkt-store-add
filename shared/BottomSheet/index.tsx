import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Backdrop from '../Backdrop/index';
import { styles } from './styles';

interface BottomSheetPropTypes {
  open: boolean;
  onRequestClose: () => void;
  onButtonPress: () => void;
  title: string;
  buttonTitle: string;
}
export default function BottomSheet(
  props: React.PropsWithChildren<BottomSheetPropTypes>
) {
  const { open, onRequestClose, onButtonPress, title, buttonTitle, children } =
    props;

  return (
    <>
      {open ? <Backdrop /> : null}
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
            {children}
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
