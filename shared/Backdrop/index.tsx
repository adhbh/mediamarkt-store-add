import { View, StyleSheet } from 'react-native';
import React from 'react';

const Backdrop = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});

export default Backdrop;
