import React from 'react';
import {ActivityIndicator, ScrollView, useWindowDimensions} from 'react-native';
import {ICompany} from '../models/models';
import {useGetCompanyOwnerships} from '../services/ownershipService';
import {ShareholderDetails} from './ShareholderDetails';

interface IProps {
  company: ICompany;
  year: 2020 | 2019;
}

export const ShareholderList = ({company, year}: IProps) => {
  const {height} = useWindowDimensions();

  const ownerships = useGetCompanyOwnerships(company);

  return (
    <ScrollView style={{maxHeight: height / 3, height: height / 3}}>
      {ownerships ? (
        ownerships
          .filter(o => o.year === year)
          .map((o, i) => (
            <ShareholderDetails
              key={o._id}
              ownership={o}
              index={i}
              company={company}
            />
          ))
      ) : (
        <ActivityIndicator />
      )}
    </ScrollView>
  );
};
