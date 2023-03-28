import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, Animated, Pressable, ViewStyle } from 'react-native';
import { styles } from './styles';

interface CustomTextInputPropTypes {
  containerStyles?: ViewStyle;
  placeholder: string;
  value: string;
  onChangeValue: (value: string) => void;
}
const CustomTextInput = (props: CustomTextInputPropTypes) => {
  const { value, onChangeValue, placeholder } = props;

  const moveText = useRef(new Animated.Value(0)).current;

  const refInput = React.useRef<TextInput>(null);

  useEffect(() => {
    if (value !== '') {
      moveTextTop();
    } else if (value === '') {
      moveTextBottom();
    }
  }, [value]);

  const onChangeText = (text: string) => {
    onChangeValue(text);
  };

  const onFocusHandler = () => {
    if (value !== '') {
      moveTextTop();
    }
  };

  const onBlurHandler = () => {
    if (value === '') {
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

  return (
    <View style={[styles.container, props.containerStyles]}>
      <TextInput
        autoCapitalize={'none'}
        style={styles.input}
        value={value}
        onChangeText={(text: string) => onChangeText(text)}
        editable={true}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        blurOnSubmit
        ref={refInput}
      />

      <Animated.View style={[styles.animatedStyle, animStyle]}>
        <Pressable
          onPress={() => {
            if (refInput.current) {
              refInput.current.focus();
            }
          }}
        >
          <Animated.Text style={[styles.label]}>{placeholder}</Animated.Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};
export default CustomTextInput;
