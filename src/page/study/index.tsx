import React, { useState } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Study_container from '../../components/study_container';
import Dropdown from '../../components/dropdown';

interface DropdownItem {
  id: number;
  label: string;
}

const options = [
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Option 3" },
];

export function StudyPage() {
  const [selected, setSelected] = useState<DropdownItem | null>(null);
  return (
    <View>
      <View style={styles.TitleContiner}>
        <Image style={styles.leftArrow} source={require('../../assets/leftArrow.png')} />
        <Text style={styles.pretendard}>스터디 모집</Text>
      </View>
      <Dropdown options={options} selected={selected} onSelect={setSelected} />
      <Study_container />
    </View>
  );
}

const styles = StyleSheet.create({
  TitleContiner: {
    borderBottomWidth: 0.4,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  pretendard: {
    fontFamily: 'PretendardVariable',
    color: '#505050',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 10,
  },
  leftArrow: {
    display: 'flex',
    position: 'absolute',
    left: 10,
  },
});
