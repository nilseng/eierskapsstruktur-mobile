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
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {IPopupProps, Popup} from './components/Popup';
import {Home} from './components/Home';
import {styles} from './styles/styles';
import {colors} from './styles/colors';
import {CompanyDetails} from './components/CompanyDetails';
import {ICompany, IShareholder} from './models/models';
import {useWindowDimensions} from 'react-native';

export enum Routes {
  HOME = 'home',
  COMPANY_DETAIL = 'company_detail',
}
export interface GlobalContext {
  routeContext: {
    route?: Routes;
    setRoute?: React.Dispatch<React.SetStateAction<Routes>>;
    params?: ICompany | IShareholder;
    setParams?: React.Dispatch<React.SetStateAction<any>>;
  };
  theme: any;
  popupProps: IPopupProps;
}

export const GlobalContext = React.createContext<GlobalContext>({
  popupProps: {},
  routeContext: {},
  theme: {},
});

const pages: {[key: string]: JSX.Element} = {
  [Routes.HOME]: <Home />,
  [Routes.COMPANY_DETAIL]: <CompanyDetails />,
};

const App = () => {
  const colorScheme = useColorScheme() || 'light';
  const {height, width} = useWindowDimensions();

  const [popupProps, setPopupProps] = useState<IPopupProps>();
  const [route, setRoute] = useState<Routes>(Routes.HOME);
  const [params, setParams] = useState<any>();

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors[colorScheme].backgroundColor,
        height: '100%',
      }}>
      <GlobalContext.Provider
        value={{
          routeContext: {route, setRoute, params, setParams},
          theme: colors[colorScheme],
          popupProps: {...popupProps, setPopupProps},
        }}>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <Popup />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{height: height}}>
          <View
            onTouchEnd={() => {
              setRoute(Routes.HOME);
              setParams(undefined);
            }}>
            <Text
              style={[
                styles.appTitle,
                {
                  color: colors[colorScheme].primary,
                },
              ]}>
              Norske aksjer
            </Text>
          </View>
          {pages[route]}
        </ScrollView>
      </GlobalContext.Provider>
    </SafeAreaView>
  );
};

export default App;
