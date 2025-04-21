import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const Study_container = () => {
  return (
    <View>
      <View style={styles.Box}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  Box: {
    borderWidth: 1,
    borderCurve: 'circular',
    width: 12,
    height: 12,
  },
});

export default Study_container;
