import {DebouncedFunc} from 'lodash';
import React, {useRef} from 'react';
import {StyleSheet, TextInput, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {IPopupProps} from './Popup';

interface IProps {
  placeholder?: string;
  search: Function;
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
  setError?: Function;
}

export const SearchablePicker = ({
  placeholder,
  search,
  setItems,
  setError,
}: IProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const timer = useRef<NodeJS.Timeout>();

  return (
    <TextInput
      style={{
        ...styles.input,
        backgroundColor: isDarkMode ? Colors.dark : Colors.light,
        color: isDarkMode ? Colors.lighter : Colors.darker,
      }}
      placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
      onChangeText={async (text: string) => {
        if (timer.current) clearTimeout(timer.current);
        if (!text || text.length < 3) return setItems([]);
        timer.current = setTimeout(async () => {
          const res = await search(text);
          if (res && Array.isArray(res)) {
            setItems(res);
            if (setError && res.length === 0) {
              setError({
                msg: 'Could not find any results :/',
                duration: 2000,
                backgroundColor: 'info',
              });
            }
          } else {
            if (setError)
              setError({
                msg: 'Oh no, the search failed :(',
                duration: 2000,
                backgroundColor: 'warning',
              });
            setItems([]);
          }
        }, 100);
      }}
      placeholder={placeholder || 'Søk her...'}></TextInput>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginVertical: 4,
    padding: 10,
  },
});
