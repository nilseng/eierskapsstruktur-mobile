import React, {useContext, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {GlobalContext} from '../App';
import {ICompany} from '../models/models';
import {useGetOwnerships} from '../services/ownershipService';
import {OwnershipsDetails} from './OwnershipDetails';

interface IProps {
  company: ICompany;
}

export const OwnershipsList = ({company}: IProps) => {
  const {height} = useWindowDimensions();

  const ownerships = useGetOwnerships(company);

  return (
    <ScrollView style={{maxHeight: height / 3, height: height / 3}}>
      {ownerships ? (
        ownerships.map((o, i) => (
          <OwnershipsDetails
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
