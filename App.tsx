import React from 'react';
import {SafeAreaView} from 'react-native';
import {Login} from './src/page/login/index';
import Signup from './src/page/signup';
import Signup2 from './src/page/signup/index2';
import {StudyPage} from './src/page/study';
import {Signup3} from './src/page/signup/index3';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <Login />
      {/* <Signup /> */}
      {/* <Signup2 /> */}
      {/* <Signup3 /> */}
      {/* <StudyPage /> */}
    </SafeAreaView>
  );
}

export default App;
