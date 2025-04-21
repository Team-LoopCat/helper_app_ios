import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSignupStore } from '../../../apis/signup_api';
import Input from '../../components/input';
import Button from '../../components/button';

export default function Signup2() {
  const { step, setStep, email, setSignupData } = useSignupStore();
  const [authCode, setAuthCode] = useState<string>('');
  const [focusedField, setFocusedField] = useState<string>('');
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false); // "다음" 버튼 활성화 상태

  const handleNext = () => {
    setStep(step + 1); // 다음 단계로 이동
  };

  const handleAuth = () => {
    console.log('이메일 인증 시도:', { email });
    startTimer();
  };

  const startTimer = () => {
    setIsButtonEnabled(false); // 인증 버튼 비활성화
  };

  const handleAuthCodeChange = (text: string) => {
    setAuthCode(text);
    setIsButtonEnabled(text.length > 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <View style={styles.emailContainer}>
        <Input
          value={email}
          onChangeText={(text) => setSignupData({ email: text })}
          placeholder="이메일"
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField('')}
          isFocused={focusedField === 'email'}
          containerStyle={styles.input}
        />
        <Button
          value="small"
          title="인증"
          onPress={handleAuth}
          buttonStyle={[{ backgroundColor: isButtonEnabled ? '#FF9900' : '#BEBEBE' }]}
        />
      </View>
      <Input
        value={authCode}
        onChangeText={handleAuthCodeChange}
        placeholder="인증코드 입력"
        onFocus={() => setFocusedField('authCode')}
        onBlur={() => setFocusedField('')}
        isFocused={focusedField === 'authCode'}
        showTimer
        timerDuration={300}
        onTimerEnd={() => console.log('타이머 종료')}
        onStartTimer={startTimer}
      />
      <Button
        value="big"
        title="다음"
        onPress={handleNext}
        buttonStyle={[{ backgroundColor: isButtonEnabled ? '#FF9900' : '#BEBEBE' }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    marginBottom: '10%',
    color: '#000000',
    marginTop: '40%',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '900',
  },
  emailContainer: {
    flexDirection: 'row',
    height: 48,
    width: '82.5%',
  },
  input: {
    flex: 1,
    marginRight: 5,
  },
});
