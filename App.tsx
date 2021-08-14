/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {debounce} from 'lodash';
import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {IPopupProps, Popup} from './components/Popup';
import {SearchablePicker} from './components/SearchablePicker';
import {ICompany, IShareholder} from './models/models';
import {searchCompanies, getCompanies} from './services/companyService';
import {
  getShareholders,
  searchShareholders,
} from './services/shareholderService';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';

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
  const isDarkMode = useColorScheme() === 'dark';

  const [companyCount, setCompanyCount] = useState<number>();
  const [shareholderCount, setShareholderCount] = useState<number>();
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [shareholders, setShareholders] = useState<IShareholder[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>();

  const [popupProps, setPopupProps] = useState<IPopupProps>();

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
      <SearchablePicker
        placeholder="Søk etter selskap..."
        search={searchCompanies}
        setItems={setCompanies}
        setError={setPopupProps}
      />
      <SearchablePicker
        placeholder="Søk etter aksjonær..."
        search={searchShareholders}
        setItems={setShareholders}
        setError={setPopupProps}
      />
      {(companies?.length > 0 || shareholders?.length > 0) && (
        <View
          style={{
            width: '100%',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            backgroundColor: isDarkMode ? Colors.dark : Colors.light,
            padding: 8,
          }}>
          {companies &&
            companies.map(c => (
              <Text
                key={c._id}
                style={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  padding: 10,
                  marginVertical: 4,
                  backgroundColor: '#f8f9fa',
                }}>
                {c.name}
              </Text>
            ))}
          {shareholders &&
            shareholders.map(c => (
              <Text
                key={c._id}
                style={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  padding: 10,
                  marginVertical: 4,
                  backgroundColor: '#f8f9fa',
                }}>
                {c.name}
              </Text>
            ))}
        </View>
      )}
      {selectedItem && (
        <View>
          <Text
            style={[
              styles.sectionDescription,
              {
                color: isDarkMode ? Colors.light : Colors.dark,
              },
            ]}>
            {Object.keys(selectedItem).map(key => (
              <Text key={key}>{selectedItem[key]}</Text>
            ))}
          </Text>
        </View>
      )}
      <Popup {...{...popupProps, setPopupProps}} />
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
