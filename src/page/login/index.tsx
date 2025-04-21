// src/pages/login/index.tsx
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { login } from '../../../apis/login_api'; // 로그인 API 임포트
import useAuthStore from '../../store/authStore'; // Zustand 상태 임포트
import Button from '../../components/button';
import Input from '../../components/input';

export function Login() {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorId, setErrorId] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string>('');
  const { setTokens } = useAuthStore(); // Zustand 상태로 토큰 설정 메서드

  const handleLogin = async () => {
    let hasError = false;

    // ID 유효성 검사
    if (!id) {
      setErrorId('아이디를 입력해주세요');
      hasError = true;
    } else {
      setErrorId('');
    }

    // 비밀번호 유효성 검사
    if (!password) {
      setErrorPassword('비밀번호를 입력해주세요');
      hasError = true;
    } else {
      setErrorPassword('');
    }

    if (!hasError) {
      try {
        // 로그인 API 호출
        const response = await login(id, password);

        // 응답에서 토큰이 존재하는지 확인
        if (response && response.accessToken && response.refreshToken) {
          const { accessToken, refreshToken } = response;
          setTokens(accessToken, refreshToken); // Zustand에 토큰 저장
          console.log('로그인 성공:', response);
        } else {
          Alert.alert('로그인 실패', '토큰을 찾을 수 없습니다');
        }
      } catch (error) {
        // 에러 응답 처리
        console.error('로그인 실패:', error);
        handleResponseError(error); // 응답 오류 처리
      }
    }
  };

  const handleResponseError = (error: any) => {
    // API 응답 상태에 따른 에러 처리
    if (error?.status === 400) {
      Alert.alert('유효하지 않은 요청입니다');
    } else if (error?.status === 403) {
      Alert.alert('비밀번호가 맞지 않습니다');
    } else if (error?.status === 404) {
      Alert.alert('존재하지 않는 계정입니다');
    } else {
      Alert.alert('알 수 없는 오류가 발생했습니다');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <Input
        value={id}
        onChangeText={setId}
        placeholder="아이디"
        onFocus={() => setFocusedField('id')}
        onBlur={() => setFocusedField('')}
        isFocused={focusedField === 'id'}
        errorMessage={errorId}
      />
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder="비밀번호"
        secureTextEntry={!showPassword}
        onFocus={() => setFocusedField('password')}
        onBlur={() => setFocusedField('')}
        showPasswordToggle
        onTogglePassword={() => setShowPassword(!showPassword)}
        isFocused={focusedField === 'password'}
        errorMessage={errorPassword}
      />

      <Button
        title="로그인"
        onPress={handleLogin}
        value="big"
        buttonStyle={[
          styles.button,
          { backgroundColor: id && password ? '#FF9900' : '#BEBEBE' },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  title: {
    marginBottom: '10%',
    color: '#000000',
    marginTop: '40%',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '900',
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
  },
  button: {
    position: 'absolute',
    bottom: '10%',
    borderRadius: 8,
    width: '82.5%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
