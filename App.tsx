/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {getCompanies} from './services/companyService';
import {getShareholders} from './services/shareholderService';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'light';

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'light';

  const [companyCount, setCompanyCount] = useState<number>();
  const [shareholderCount, setShareholderCount] = useState<number>();

  useEffect(() => {
    getCompanies(true).then(c => setCompanyCount(c));
    getShareholders(true).then(c => setShareholderCount(c));
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.h100]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={[backgroundStyle]}>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            }}>
            <Text
              style={[
                styles.appTitle,
                {
                  color: isDarkMode ? Colors.white : Colors.black,
                },
              ]}>
              Norske aksjer
            </Text>
            <View style={styles.flexRow}>
              <Section title="Selskaper">
                {companyCount?.toLocaleString()}
              </Section>
              <Section title="Aksjonærer">
                {shareholderCount?.toLocaleString()}
              </Section>
            </View>
            <View style={styles.sectionContainer}>
              <Text
                style={[
                  styles.sectionDescription,
                  {
                    color: isDarkMode ? Colors.light : Colors.dark,
                  },
                ]}>
                Søk og finn alle norske aksjer og deres eiere
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <SearchableDropdown
        items={[{id: 1, name: 'test'}]}
        containerStyle={{padding: 5, marginTop: 10}}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#f8f9fa',
          borderColor: '#f8f9fa',
          borderWidth: 1,
          borderRadius: 5,
        }}
        textInputProps={{
          placeholder: 'Søk her...',
          underlineColorAndroid: 'transparent',
          style: {
            padding: 12,
            borderWidth: 1,
            borderColor: '#f8f9fa',
            backgroundColor: '#f8f9fa',
            borderRadius: 5,
          },
          onTextChange: (text: string) => console.log(text),
        }}
        onItemSelect={(item: any) => {
          console.log(item);
        }}></SearchableDropdown>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  h100: {
    height: '100%',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 4,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 48,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '300',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textInput: {
    height: 40,
    backgroundColor: '#f8f9fa',
    marginTop: 12,
    padding: 1,
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default App;
