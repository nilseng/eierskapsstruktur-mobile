import {
  faArrowDown,
  faArrowRight,
  faChevronCircleDown,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {GlobalContext} from '../App';
import {ICompany, IOwnership} from '../models/models';
import {titleCase} from '../utils/titleCase';

interface IProps {
  ownership: IOwnership;
  index: number;
  company: ICompany;
}

export const OwnershipsDetails = ({ownership, index, company}: IProps) => {
  const {theme} = useContext(GlobalContext);

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
        </View>
      )}
    </View>
  );
};
