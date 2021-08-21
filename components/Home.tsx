import React, {useEffect, useState} from 'react';
import {useContext} from 'react';
import {ScrollView, Text, useWindowDimensions, View} from 'react-native';
import {GlobalContext, Routes} from '../App';
import {ICompany, IShareholder} from '../models/models';
import {getCompanies, searchCompanies} from '../services/companyService';
import {
  getShareholders,
  searchShareholders,
} from '../services/shareholderService';
import {styles} from '../styles/styles';
import {List} from './List';
import {SearchablePicker} from './SearchablePicker';
import {StatCard} from './StatCard';

export const Home = () => {
  const [companyCount, setCompanyCount] = useState<number>();
  const [shareholderCount, setShareholderCount] = useState<number>();
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [shareholders, setShareholders] = useState<IShareholder[]>([]);

  const {theme} = useContext(GlobalContext);
  const {height, width} = useWindowDimensions();

  useEffect(() => {
    getCompanies(true).then(c => setCompanyCount(c));
    getShareholders(true).then(c => setShareholderCount(c));
  }, []);

  return (
    <>
      <View>
        <View
          style={{
            backgroundColor: theme.backgroundColor,
          }}>
          <View style={styles.flexRow}>
            <StatCard label="Selskaper" stat={companyCount?.toLocaleString()} />
            <StatCard
              label="Aksjonærer"
              stat={shareholderCount?.toLocaleString()}
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text
              style={[
                styles.sectionDescription,
                {
                  color: theme.text,
                },
              ]}>
              Søk og finn alle norske aksjer og deres eiere
            </Text>
          </View>
        </View>
      </View>
      <View style={{paddingBottom: 12}}>
        <SearchablePicker
          style={{marginHorizontal: 8, borderRadius: 32}}
          placeholder="Søk etter selskap..."
          search={searchCompanies}
          setItems={setCompanies}
        />
      </View>
      <View style={{paddingBottom: 12}}>
        <SearchablePicker
          style={{marginHorizontal: 8, borderRadius: 32}}
          placeholder="...eller aksjonærer..."
          search={searchShareholders}
          setItems={setShareholders}
        />
      </View>
      {(companies?.length > 0 || shareholders?.length > 0) && (
        <>
          {companies && (
            <List items={companies} route={Routes.COMPANY_DETAIL} />
          )}
          {shareholders && <List items={shareholders} />}
        </>
      )}
      <View
        style={{
          height,
          width,
          position: 'absolute',
          top: 0,
          zIndex: -10,
          display: 'flex',
          alignItems: 'center',
        }}>
        <Text
          style={{
            position: 'absolute',
            bottom: height / 10,
            padding: 10,
            paddingBottom: 0,
            color: theme.muted,
          }}>
          Denne appen er utviklet av Teodor Nilseng Danielsen ved PureOKRs AS.
          All data er allerede gjort offentlig tilgjengelig av Skatteetaten
          eller Brønnøysundsregistrene.
        </Text>
      </View>
    </>
  );
};
