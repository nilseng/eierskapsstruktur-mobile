import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {colors} from '../styles/colors';

export interface IPopupProps {
  setPopupProps: Function;
  msg?: string;
  duration?: number;
  backgroundColor?: string;
}

export const Popup = ({
  msg,
  duration = 0,
  backgroundColor = 'warning',
  setPopupProps,
}: IPopupProps) => {
  const colorScheme = useColorScheme() ?? 'light';

  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setPopupProps(undefined), duration);
  }, [duration]);

  return !msg ? null : (
    <View
      style={{
        ...styles.popup,
        backgroundColor: colors[colorScheme][backgroundColor],
      }}>
      <Text style={styles.popupText}>{msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: 16,
    marginTop: 40,
    display: 'flex',
    justifyContent: 'center',
  },
  popupText: {
    textAlign: 'center',
  },
});
