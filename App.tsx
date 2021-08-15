/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {IPopupProps, Popup} from './components/Popup';
import {Home} from './components/Home';
import {styles} from './styles/styles';
import {colors} from './styles/colors';

export const ThemeContext = React.createContext(colors['light']);
export const PopupContext = React.createContext<IPopupProps>({});

const App = () => {
  const colorScheme = useColorScheme() || 'light';

  const [popupProps, setPopupProps] = useState<IPopupProps>();

  return (
    <SafeAreaView
      style={[
        {backgroundColor: colors[colorScheme].backgroundColor},
        styles.h100,
      ]}>
      <ThemeContext.Provider value={colors[colorScheme]}>
        <PopupContext.Provider value={{...popupProps, setPopupProps}}>
          <StatusBar
            barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          />
          <Popup />
          <Home />
        </PopupContext.Provider>
      </ThemeContext.Provider>
    </SafeAreaView>
  );
};

export default App;
