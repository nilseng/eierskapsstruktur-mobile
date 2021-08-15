import React, {useEffect, useRef, useState} from 'react';
import {useContext} from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {PopupContext} from '../App';
import {colors} from '../styles/colors';

export interface IPopupProps {
  setPopupProps?: Function;
  msg?: string;
  duration?: number;
  backgroundColor?: string;
}

export const Popup = () => {
  const colorScheme = useColorScheme() ?? 'light';

  const timer = useRef<NodeJS.Timeout>();

  const {msg, duration, backgroundColor, setPopupProps} =
    useContext(PopupContext);

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
          ? colors[colorScheme][backgroundColor]
          : 'warning',
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
