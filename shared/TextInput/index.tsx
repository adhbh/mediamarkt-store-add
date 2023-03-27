import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TextInput, Animated, Pressable, ViewStyle } from 'react-native';
import COLORS from '../../utils/colors';

interface CustomTextInputPropTypes {
  containerStyles?: ViewStyle;
  placeholder: string;
}
const CustomTextInput = (props: CustomTextInputPropTypes) => {
  const [value, setValue] = useState('');
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
    setValue(text);
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
    <View style={[styles.container, props.containerStyles ]}>
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
          <Pressable onPress={() => {
            if(refInput.current) {
              refInput.current.focus()
            }
          }}>
          <Animated.Text
            style={[styles.label]}
          >
            {props.placeholder}
          </Animated.Text>
          </Pressable>
        </Animated.View>

    </View>
  );
};
export default CustomTextInput;

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
    top: 15,
    left: 15,
    position: 'absolute',
    borderRadius: 90,
    zIndex: 10000,
    backgroundColor: COLORS.white,
  },
});
