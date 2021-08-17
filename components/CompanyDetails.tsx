import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GlobalContext} from '../App';

export const CompanyDetails = () => {
  const {
    routeContext: {params: company},
    theme,
  } = useContext(GlobalContext);

  return (
    <View style={styles.container}>
      {company && (
        <>
          <Text style={{color: theme.text}}>{company.name}</Text>
          <Text style={{color: theme.text}}>Stocks: {company.stocks}</Text>
        </>
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
