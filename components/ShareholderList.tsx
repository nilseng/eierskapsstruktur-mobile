import React from 'react';
import {ActivityIndicator, ScrollView, useWindowDimensions} from 'react-native';
import {ICompany} from '../models/models';
import {useGetCompanyOwnerships} from '../services/ownershipService';
import {ShareholderDetails} from './ShareholderDetails';

interface IProps {
  company: ICompany;
}

export const ShareholderList = ({company}: IProps) => {
  const {height} = useWindowDimensions();

  const ownerships = useGetCompanyOwnerships(company);

  return (
    <ScrollView style={{maxHeight: height / 3, height: height / 3}}>
      {ownerships ? (
        ownerships.map((o, i) => (
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
