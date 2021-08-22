import {faBuilding, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GlobalContext} from '../App';
import {IShareholder} from '../models/models';

import {styles as commonStyles} from '../styles/styles';
import {CompanyList} from './CompanyList';
import {YearSelector} from './YearSelector';

export const ShareholderOverview = () => {
  const {
    routeContext: {params: shareholder},
    theme,
  } = useContext(GlobalContext);

  const [year, setYear] = useState<2019 | 2020>(2020);

  return (
    <View style={styles.container}>
      {shareholder && (
        <View style={{display: 'flex', alignItems: 'center', marginTop: 16}}>
          <View
            style={{display: 'flex', flexDirection: 'row', marginBottom: 8}}>
            <FontAwesomeIcon
              icon={faUser}
              color={theme.primary}
              style={{marginRight: 8}}
            />
            <Text
              key={'name'}
              style={{
                color: theme.text,
                ...commonStyles.highlight,
                marginRight: 8,
              }}>
              {shareholder.name}
            </Text>
            {shareholder.orgnr && (
              <Text key={'orgnr'} style={{color: theme.muted}}>
                ({shareholder.orgnr})
              </Text>
            )}
          </View>
          <YearSelector year={year} setYear={setYear} />
        </View>
      )}
      {shareholder && (
        <>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 32,
            }}>
            <FontAwesomeIcon
              icon={faBuilding}
              color={theme.secondary}
              style={{marginRight: 8}}
            />
            <Text
              style={{
                ...commonStyles.sectionTitle,
                marginVertical: 16,
                color: theme.text,
              }}>
              Aksjeselskaper
            </Text>
          </View>
          <CompanyList shareholder={shareholder as IShareholder} year={year} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});
