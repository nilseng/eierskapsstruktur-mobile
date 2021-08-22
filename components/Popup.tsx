import React, {useEffect, useRef, useState} from 'react';
import {useContext} from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {GlobalContext} from '../App';

export interface IPopupProps {
  setPopupProps?: Function;
  msg?: string;
  duration?: number;
  backgroundColor?: string;
}

export const Popup = () => {
  const colorScheme = useColorScheme() ?? 'light';

  const timer = useRef<NodeJS.Timeout>();

  const {
    popupProps: {msg, duration, backgroundColor, setPopupProps},
    theme,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (setPopupProps) setPopupProps(undefined);
    }, duration);
  }, [duration]);

  return !msg ? null : (
    <View
      style={{
        ...styles.popup,
        backgroundColor: backgroundColor
          ? theme[backgroundColor]
          : theme.warning,
      }}>
      <Text style={styles.popupText}>{msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
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
