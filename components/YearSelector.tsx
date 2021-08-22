import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {GlobalContext} from '../App';

interface IProps {
  year: 2019 | 2020;
  setYear: React.Dispatch<React.SetStateAction<2019 | 2020>>;
}

export const YearSelector = ({year, setYear}: IProps) => {
  const {theme} = useContext(GlobalContext);
  return (
    <View style={{display: 'flex', flexDirection: 'row', padding: 16}}>
      <View
        style={{
          backgroundColor:
            year === 2020 ? theme.backgroundColorAccent : theme.backgroundColor,
          padding: 4,
          borderRadius: 4,
        }}
        onTouchEnd={() => setYear(2020)}>
        <Text
          style={{
            marginHorizontal: 8,
            color: theme.text,
            fontWeight: year === 2020 ? 'bold' : 'normal',
          }}>
          2020
        </Text>
      </View>
      <View
        style={{
          backgroundColor:
            year === 2019 ? theme.backgroundColorAccent : theme.backgroundColor,
          padding: 4,
          borderRadius: 4,
        }}
        onTouchEnd={() => setYear(2019)}>
        <Text
          style={{
            marginHorizontal: 8,
            color: theme.text,
            fontWeight: year === 2019 ? 'bold' : 'normal',
          }}>
          2019
        </Text>
      </View>
    </View>
  );
};
