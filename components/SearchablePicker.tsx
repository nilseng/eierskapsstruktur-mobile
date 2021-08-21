import React, {useRef} from 'react';
import {useContext} from 'react';
import {StyleSheet, TextInput, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GlobalContext} from '../App';

interface IProps {
  style: any;
  placeholder?: string;
  search: Function;
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

export const SearchablePicker = ({
  style,
  placeholder,
  search,
  setItems,
}: IProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const timer = useRef<NodeJS.Timeout>();

  const {popupProps: popupContext} = useContext(GlobalContext);

  return (
    <TextInput
      style={{
        ...styles.input,
        ...style,
        backgroundColor: isDarkMode ? Colors.dark : '#fff',
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
            if (popupContext?.setPopupProps && res.length === 0) {
              popupContext.setPopupProps({
                msg: 'Could not find any results :/',
                duration: 2000,
                backgroundColor: 'info',
              });
            }
          } else {
            if (popupContext?.setPopupProps)
              popupContext.setPopupProps({
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
    padding: 10,
  },
});
