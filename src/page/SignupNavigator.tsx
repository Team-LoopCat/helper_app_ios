import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Signup from './signup/index';
import Signup2 from './signup/index2';
import Signup3 from './signup/index3';

const Stack = createStackNavigator();

export default function SignupNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Signup2" component={Signup2} />
        <Stack.Screen name="Signup3" component={Signup3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
