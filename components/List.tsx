import React, {useContext} from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GlobalContext, Routes} from '../App';

interface IProps {
  items: {[key: string]: any; _id: string; name: string}[];
  route?: Routes;
}

export const List = ({items, route}: IProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const {
    routeContext: {setRoute, setParams},
  } = useContext(GlobalContext);

  const handleTouch = (item: any) => {
    if (setParams) setParams(item);
    if (setRoute && route) setRoute(route);
  };

  return (
    <>
      {items.map(i => (
        <View
          key={i._id}
          style={{
            backgroundColor: isDarkMode ? Colors.darker : '#fff',
            shadowColor: isDarkMode ? '#fff' : '#000',
            ...styles.listItem,
          }}
          onTouchEnd={() => handleTouch(i)}>
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
