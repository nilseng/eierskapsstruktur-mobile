import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {colors} from '../styles/colors';

interface IProps {
  label: string;
  stat?: string;
}

export const StatCard = ({label, stat}: IProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={[
        {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter},
        {shadowColor: isDarkMode ? '#fff' : '#000'},
        styles.container,
      ]}>
      <Text
        style={[
          styles.label,
          {color: isDarkMode ? colors.dark.text : colors.light.text},
        ]}>
        {label}
      </Text>
      {stat && (
        <Text
          style={[
            styles.stat,
            {color: isDarkMode ? colors.dark.info : colors.light.info},
          ]}>
          {stat}
        </Text>
      )}
      {!stat && <ActivityIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 8,
    minWidth: 150,
    padding: 16,
  },
  label: {
    marginVertical: 8,
    textAlign: 'center',
  },
  stat: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
