import {DebouncedFunc} from 'lodash';
import React, {useRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';

interface IProps {
  placeholder?: string;
  search: Function;
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

export const SearchablePicker = ({placeholder, search, setItems}: IProps) => {
  const timer = useRef<NodeJS.Timeout>();
  return (
    <TextInput
      style={styles.input}
      onChangeText={async (text: string) => {
        if (!text || text.length < 3) return setItems([]);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(async () => {
          const res = await search(text);
          if (res && Array.isArray(res)) setItems(res);
          //TODO: Handle failed search
        }, 250);
      }}
      placeholder={placeholder || 'Søk her...'}></TextInput>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginVertical: 4,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
});
