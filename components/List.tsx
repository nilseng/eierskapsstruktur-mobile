import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface IProps {
  items: {[key: string]: any; _id: string; name: string}[];
}

export const List = ({items}: IProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      {items.map(i => (
        <View
          key={i._id}
          style={{
            backgroundColor: isDarkMode ? Colors.darker : '#fff',
            shadowColor: isDarkMode ? '#fff' : '#000',
            ...styles.listItem,
          }}>
          <Text
            style={{
              color: isDarkMode ? Colors.lighter : Colors.darker,
            }}>
            {i.name}
          </Text>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 4,
    padding: 10,
    marginHorizontal: 8,
    marginVertical: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
