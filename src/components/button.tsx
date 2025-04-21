import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  value: 'big' | 'small';
}

const Button = ({
  title,
  onPress,
  buttonStyle,
  titleStyle,
  value,
}: ButtonProps) => {
  const isBig = value === 'big';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[isBig ? styles.bigButton : styles.smallButton, buttonStyle]}
      activeOpacity={0.7}>
      <Text style={[isBig ? styles.bigtitle : styles.smalltitle, titleStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bigtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  smalltitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  bigButton: {
    backgroundColor: '#FF9900',
    position: 'absolute',
    bottom: '10%',
    borderRadius: 8,
    width: '82.5%',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallButton: {
    backgroundColor: '#FF9900',
    borderRadius: 8,
    width: '30%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
