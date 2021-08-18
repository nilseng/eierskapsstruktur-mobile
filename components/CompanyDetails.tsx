import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GlobalContext} from '../App';
import {useBrregUnit} from '../services/companyService';
import {jsxify} from '../utils/jsxify';

export const CompanyDetails = () => {
  const {
    routeContext: {params: company},
    theme,
  } = useContext(GlobalContext);

  const unit = useBrregUnit(company?.orgnr);

  return (
    <View style={styles.container}>
      {company && (
        <View>
          <Text key={'name'} style={{color: theme.text}}>
            {company.name}
          </Text>
          <Text key={'stocks'} style={{color: theme.text}}>
            Stocks: {company.stocks?.toLocaleString()}
          </Text>
          <Text key={'orgnr'} style={{color: theme.text}}>
            Orgnr: {company.orgnr}
          </Text>
        </View>
      )}
      {unit && theme && (
        <View style={{marginTop: 8}}>
          <Text
            style={{color: theme.text, fontWeight: 'bold', marginVertical: 16}}>
            Data fra Brønnøysundregistrene:
          </Text>
          {jsxify(unit, theme, 'root')}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
