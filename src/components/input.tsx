import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  TextInputProps,
  Text,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';

interface InputProps extends TextInputProps {
  isFocused: boolean;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  errorMessage?: string;
  showTimer?: boolean;
  timerDuration?: number;
  onTimerEnd?: () => void;
  onStartTimer?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  onFocus,
  onBlur,
  showPasswordToggle,
  onTogglePassword,
  isFocused,
  errorMessage,
  showTimer,
  timerDuration,
  onTimerEnd,
  onStartTimer,
  containerStyle,
  inputStyle,
  ...props
}) => {
  const [timer, setTimer] = useState(timerDuration || 0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // 타이머 시작 및 관리
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && isTimerActive) {
      setIsTimerActive(false);
      if (onTimerEnd) {
        onTimerEnd();
      }
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timer, onTimerEnd]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input, isFocused && styles.focusedInput, inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
        autoCapitalize="none"
        placeholderTextColor="#A7A7A7"
        {...props}
        pointerEvents="auto"
      />
      {showPasswordToggle && (
        <TouchableOpacity
          onPress={() => {
            console.log('터치됨!');
            onTogglePassword();
          }}
          style={styles.icon}>
          <Image
            source={require('../assets/unlook.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      )}
      {showTimer && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTimer(timer)}</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        {errorMessage && errorMessage.trim() !== '' ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '82.5%',
    position: 'relative',
    borderWidth: 1,
  },
  input: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    borderColor: '#d1d5db',
    borderWidth: 1,
    paddingHorizontal: 16,
    fontWeight: '600',
    color: '#000',
  },
  focusedInput: {
    borderColor: '#FF9900',
    borderWidth: 2,
    color: '#000',
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: '35%',
    transform: [{translateY: -12}],
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  timerContainer: {
    position: 'absolute',
    right: 10,
    top: '35%',
    transform: [{translateY: -12}],
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 14,
    color: '#4B5563',
    marginRight: 8,
  },
  resendText: {
    fontSize: 14,
    color: '#FF9900',
    textDecorationLine: 'underline',
    marginBottom: 4,
  },
  textContainer: {
    height: 24,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 2,
    margin: 3,
  },
});

export default Input;
