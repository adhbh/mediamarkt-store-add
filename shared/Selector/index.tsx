import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  Animated,
  ViewStyle,
  Pressable,
  Modal,
  FlatList,
} from 'react-native';
import ListDivider from '../ListDivider/index';
import { styles } from './styles';

interface SelectionOption {
  id: string;
  value: string;
}

interface CustomSelectorPropTypes {
  containerStyles?: ViewStyle;
  placeholder: string;
  options: SelectionOption[];
  onSelectItem: (item: SelectionOption) => void;
  selectedId: string;
}

const CustomSelector = (props: CustomSelectorPropTypes) => {
  const { placeholder, options, onSelectItem, selectedId } = props;

  const [showSelectionModal, setShowSelectionModal] = useState<boolean>(false);

  const moveText = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selectedId) {
      moveTextTop();
    } else if (!selectedId) {
      moveTextBottom();
    }
  }, [selectedId]);

  const onFocusHandler = () => {
    if (selectedId) {
      moveTextTop();
    }
  };

  const onBlurHandler = () => {
    if (!selectedId) {
      moveTextBottom();
    }
  };

  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 1.2,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -20],
  });

  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
  };

  const openSelectionModal = () => {
    setShowSelectionModal(true);
  };

  const closeSelectionModal = () => {
    setShowSelectionModal(false);
  };

  const handleSelectItem = (item: SelectionOption) => () => {
    onSelectItem(item);
    setShowSelectionModal(false);
  };

  const selectedItem = options.find((item) => item.id === selectedId);

  return (
    <View style={styles.container}>
      <Pressable onPress={openSelectionModal}>
        <>
          <Animated.View style={[styles.animatedStyle, animStyle]}>
            <Text style={styles.label}>{placeholder}</Text>
          </Animated.View>
          <TextInput
            autoCapitalize={'none'}
            style={styles.input}
            value={selectedItem ? selectedItem.value : ''}
            editable={false}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            blurOnSubmit
            pointerEvents={'none'}
          />
        </>
      </Pressable>
      <Modal
        visible={showSelectionModal}
        transparent={true}
        onRequestClose={closeSelectionModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              style={styles.listContainer}
              data={options}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <Pressable onPress={handleSelectItem(item)}>
                    <View style={styles.selectionItem}>
                      <Text style={styles.listItemText}>{item.value}</Text>
                    </View>
                  </Pressable>
                );
              }}
              ItemSeparatorComponent={() => <ListDivider />}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default CustomSelector;
