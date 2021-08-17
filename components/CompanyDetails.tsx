import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GlobalContext} from '../App';

export const CompanyDetails = () => {
  const {
    routeContext: {params: company},
  } = useContext(GlobalContext);

  return (
    <View style={styles.container}>
      {company && (
        <>
          <Text>{company.name}</Text>
          <Text>Stocks: {company.stocks}</Text>
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
