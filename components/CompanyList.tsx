import React from 'react';
import {ActivityIndicator, ScrollView, useWindowDimensions} from 'react-native';
import {ICompany, IShareholder} from '../models/models';
import {useGetShareholderOwnerships} from '../services/ownershipService';
import {CompanyDetails} from './CompanyDetails';

interface IProps {
  shareholder: IShareholder;
  year: 2019 | 2020;
}

export const CompanyList = ({shareholder, year}: IProps) => {
  const {height} = useWindowDimensions();

  const ownerships = useGetShareholderOwnerships(shareholder);

  return (
    <ScrollView style={{maxHeight: height / 2, height: height / 2}}>
      {ownerships ? (
        ownerships
          .filter(o => o.year === year)
          .map((o, i) => (
            <CompanyDetails
              key={o._id}
              ownership={o}
              index={i}
              shareholder={shareholder}
            />
          ))
      ) : (
        <ActivityIndicator />
      )}
    </ScrollView>
  );
};
