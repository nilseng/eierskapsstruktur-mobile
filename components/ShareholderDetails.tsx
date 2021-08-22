import {faChevronCircleDown, faUsers} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useContext, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {GlobalContext, Routes} from '../App';
import {ICompany, IOwnership} from '../models/models';
import {getCompany} from '../services/companyService';

interface IProps {
  ownership: IOwnership;
  index: number;
  company: ICompany;
}

export const ShareholderDetails = ({ownership, index, company}: IProps) => {
  const {
    theme,
    routeContext: {setParams, setRoute},
  } = useContext(GlobalContext);

  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <View
      key={ownership._id}
      style={{
        backgroundColor:
          index % 2 ? theme.backgroundColor : theme.backgroundColorAccent,
        borderRadius: 4,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 8,
        }}>
        <View
          onTouchEnd={() => {
            if (setRoute && setParams && ownership.shareholder) {
              setRoute(Routes.SHAREHOLDER_OVERVIEW);
              setParams(ownership.shareholder);
            }
          }}>
          <Text
            style={{
              color: theme.text,
            }}>
            {ownership.shareholder?.name}
          </Text>
          {ownership.shareholder?.countryCode && (
            <Text
              style={{
                color: theme.muted,
                marginVertical: 1,
                fontSize: 10,
              }}>
              {ownership.shareholder?.countryCode}
            </Text>
          )}
        </View>

        <View onTouchEnd={() => setShowDetails(s => !s)}>
          <FontAwesomeIcon
            icon={faChevronCircleDown}
            color={theme.info}
            size={18}
            style={{marginRight: 8}}
          />
        </View>
      </View>
      {showDetails && ownership.shareholder && (
        <View
          style={{
            paddingLeft: 16,
            paddingBottom: 16,
            backgroundColor:
              index % 2 ? theme.backgroundColor : theme.backgroundColorAccent,
          }}>
          <Text
            style={{
              color: theme.text,
              marginVertical: 1,
            }}>
            Har {ownership.stocks.toLocaleString()} aksjer
            {company?.stocks && (
              <>
                {' '}
                og en eierandel på{' '}
                {((ownership.stocks / company.stocks) * 100).toFixed(2)}%
              </>
            )}
          </Text>
          {ownership.shareholder?.orgnr &&
            (ownership.shareholder.name.includes(' AS') ||
              ownership.shareholder.name
                .toLowerCase()
                .includes('aksjeselskap')) && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 8,
                  marginTop: 8,
                }}
                onTouchEnd={async () => {
                  if (setParams && ownership.shareholder?.orgnr) {
                    const company = await getCompany(
                      ownership.shareholder.orgnr,
                    );
                    setParams(company);
                  }
                }}>
                <FontAwesomeIcon
                  icon={faUsers}
                  color={theme.secondary}
                  size={18}
                  style={{marginRight: 4}}
                />
                <Text
                  style={{
                    color: theme.muted,
                    fontWeight: 'bold',
                    marginVertical: 1,
                  }}>
                  Aksjonærer
                </Text>
              </View>
            )}
        </View>
      )}
    </View>
  );
};
