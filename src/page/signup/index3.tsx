import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Input from '../../components/input';
import Button from '../../components/button';

export function Signup3() {
  const [grade, setGrade] = useState<string>('');
  const [classNum, setClassNum] = useState<string>('');
  const [studentNum, setStudentNum] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [focusedField, setFocusedField] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleProfileChange = () => {
    console.log('프로필 사진 변경 시도');
    setProfileImage('https://via.placeholder.com/100');
  };

  const handleSignup = () => {
    console.log('회원가입 시도:', { grade, classNum, studentNum, nickname });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileContainer} onPress={handleProfileChange}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Text style={styles.profilePlaceholder}>프로필 사진 변경</Text>
        )}
      </TouchableOpacity>

      <View style={styles.inputRow}>
        <Input
          value={grade}
          onChangeText={setGrade}
          placeholder="학년"
          onFocus={() => setFocusedField('grade')}
          onBlur={() => setFocusedField('')}
          isFocused={focusedField === 'grade'}
          containerStyle={[styles.input, {marginRight: 5}]}
        />
        <Input
          value={classNum}
          onChangeText={setClassNum}
          placeholder="반"
          onFocus={() => setFocusedField('classNum')}
          onBlur={() => setFocusedField('')}
          isFocused={focusedField === 'classNum'}
          containerStyle={[styles.input, {marginHorizontal: 5}]}
        />
        <Input
          value={studentNum}
          onChangeText={setStudentNum}
          placeholder="번호"
          onFocus={() => setFocusedField('studentNum')}
          onBlur={() => setFocusedField('')}
          isFocused={focusedField === 'studentNum'}
          containerStyle={[styles.input, {marginLeft: 5}]}
        />
      </View>

      <View style={styles.nicknameContainer}>
        <Input
          value={nickname}
          onChangeText={setNickname}
          placeholder="닉네임"
          onFocus={() => setFocusedField('nickname')}
          onBlur={() => setFocusedField('')}
          isFocused={focusedField === 'nickname'}
          containerStyle={styles.inputNickname}
        />
        <Button
          value="small"
          title="확인"
          onPress={() => console.log('닉네임 확인:', nickname)}
          buttonStyle={styles.smallButton}
        />
      </View>

      <Button
        value="big"
        title="다음"
        onPress={handleSignup}
        buttonStyle={styles.bigButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: 20,
    gap: 15,
  },
  profileContainer: {
    marginTop: '10%',
    marginBottom: '5%',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  profilePlaceholder: {
    color: '#808080',
    textAlign: 'center',
    fontSize: 14,
  },
  inputRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 48,
    textAlign: 'center',
  },
  nicknameContainer: {
    flexDirection: 'row',
  },
  inputNickname: {
    flex: 1,
    marginRight: 5,
  },
  smallButton: {
    height: 48,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  bigButton: {
    height: 48,
    justifyContent: 'center',
  },
});
