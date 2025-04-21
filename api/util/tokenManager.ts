import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToken = async (token: string) => {
  await AsyncStorage.setItem("accessToken", token)
}

export const TokenManager = {
  saveToken
}