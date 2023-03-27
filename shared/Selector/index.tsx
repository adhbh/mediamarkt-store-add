import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Animated,
  ViewStyle,
  Pressable,
  Modal,
  FlatList,
} from 'react-native';
import COLORS from '../../utils/colors';

interface SelectionOption {
  id: string;
  value: string;
}

interface CustomSelectorPropTypes {
  containerStyles?: ViewStyle;
  placeholder: string;
  options: SelectionOption[];
  onSelectItem: (item: SelectionOption) => void;
}

const CustomSelector = (props: CustomSelectorPropTypes) => {
  const { placeholder, options, onSelectItem } = props;

  const [selectedItem, setSelectedItem] = useState<SelectionOption>();
  const [showSelectionModal, setShowSelectionModal] = useState<boolean>(false);

  const moveText = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selectedItem) {
      moveTextTop();
    } else if (!selectedItem) {
      moveTextBottom();
    }
  }, [selectedItem]);

  const onFocusHandler = () => {
    if (selectedItem) {
      moveTextTop();
    }
  };

  const onBlurHandler = () => {
    if (!selectedItem) {
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
    setSelectedItem(item)
    onSelectItem(item)
    setShowSelectionModal(false)
  }

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
            value={selectedItem?.value}
            editable={true}
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
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.lightGrey,
                    paddingBottom: 10,
                    marginTop: 6,
                    marginBottom: 6,
                  }}
                />
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default CustomSelector;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingTop: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    height: 56,
  },
  icon: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    height: 24,
    color: COLORS.darkGrey,
  },
  label: {
    color: COLORS.darkGrey,
    fontSize: 14,
  },
  animatedStyle: {
    position: 'absolute',
    borderRadius: 90,
    zIndex: 10000,
    backgroundColor: COLORS.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 22,
    width: '100%',
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
    height: 300,
  },
  selectionItem: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  listContainer: {
    width: '100%',
  },
  listItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.darkGrey,
  },
});
