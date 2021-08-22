import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {GlobalContext} from '../App';
import {useBrregUnit} from '../services/companyService';
import {jsxify} from '../utils/jsxify';
import {ShareholderList} from './ShareholderList';

import {styles as commonStyles} from '../styles/styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBuilding,
  faChevronCircleDown,
  faInfo,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

export const CompanyOverview = () => {
  const {
    routeContext: {params: company},
    theme,
  } = useContext(GlobalContext);

  const unit = useBrregUnit(company?.orgnr);

  const [isBrregInfoVisible, setIsBrregInfoVisible] = useState(false);

  return (
    <View style={styles.container}>
      {company && (
        <View style={{display: 'flex', alignItems: 'center', marginTop: 16}}>
          <View
            style={{display: 'flex', flexDirection: 'row', marginBottom: 8}}>
            <FontAwesomeIcon
              icon={faBuilding}
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
              {company.name}
            </Text>
            <Text key={'orgnr'} style={{color: theme.muted}}>
              ({company.orgnr})
            </Text>
          </View>
          <Text key={'stocks'} style={{color: theme.text}}>
            {company.stocks?.toLocaleString()} aksjer
          </Text>
        </View>
      )}
      {company && (
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
              icon={faUsers}
              color={theme.secondary}
              style={{marginRight: 8}}
            />
            <Text
              style={{
                ...commonStyles.sectionTitle,
                marginVertical: 16,
                color: theme.text,
              }}>
              Aksjonærer
            </Text>
          </View>
          <ShareholderList company={company} />
        </>
      )}
      {unit && theme && (
        <View
          style={{
            marginTop: 32,
            backgroundColor: theme.backgroundColorAccent,
            borderRadius: 8,
            padding: 8,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon
              icon={faInfo}
              style={{marginRight: 4}}
              color={theme.secondary}
            />
            <Text
              style={{
                color: theme.text,
                fontWeight: 'bold',
                marginVertical: 16,
              }}>
              Om selskapet
            </Text>
            <View onTouchEnd={() => setIsBrregInfoVisible(s => !s)}>
              <FontAwesomeIcon
                icon={faChevronCircleDown}
                color={theme.info}
                size={18}
                style={{marginLeft: 8}}
              />
            </View>
          </View>
          {isBrregInfoVisible && jsxify(unit, theme, 'root')}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});
