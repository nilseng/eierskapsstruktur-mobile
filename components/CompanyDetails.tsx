import {faChevronCircleDown, faUsers} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useContext, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {GlobalContext, Routes} from '../App';
import {ICompany, IOwnership, IShareholder} from '../models/models';
import {getCompany} from '../services/companyService';

interface IProps {
  ownership: IOwnership;
  index: number;
  shareholder: IShareholder;
}

export const CompanyDetails = ({ownership, index, shareholder}: IProps) => {
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
        <View>
          <Text
            style={{
              color: theme.text,
            }}>
            {ownership.company?.name}
          </Text>
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
      {showDetails && ownership.company && (
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
            {ownership.company?.stocks && (
              <>
                {' '}
                og en eierandel på{' '}
                {((ownership.stocks / ownership.company.stocks) * 100).toFixed(
                  2,
                )}
                %
              </>
            )}
          </Text>
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
              if (setParams && setRoute && ownership.company) {
                setRoute(Routes.COMPANY_OVERVIEW);
                setParams(ownership.company);
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
              Se alle aksjonærer
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
