import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";

interface DropdownItem {
  id: number;
  label: string;
}

interface DropdownProps {
  options: DropdownItem[];
  selected: DropdownItem | null;
  onSelect: (item: DropdownItem) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const rotate = useSharedValue(0);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    rotate.value = withTiming(isOpen ? 0 : 180, { duration: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
        <Text style={styles.text}>{selected ? selected.label : "Select an option"}</Text>
        <Animated.View style={animatedStyle}>
          <Image source={require("../assets/chevron-down.png")} style={styles.icon} />
        </Animated.View>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownList}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => { onSelect(item); setIsOpen(false); }}>
                <Text style={styles.text}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: 100 },
  dropdown: {
    width: 100,
    height: 30,
    borderWidth: 1,
    borderColor: "#FF8C00",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: "#FF8C00",
    backgroundColor: "#FFFFFF",
    position: "absolute",
    top: 32,
    width: "100%",
    zIndex: 10,
  },
  item: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#FF8C00",
  },
  text: { color: "#FF8C00" },
  icon: {
    width: 16,
    height: 16,
  },
});

export default Dropdown;
