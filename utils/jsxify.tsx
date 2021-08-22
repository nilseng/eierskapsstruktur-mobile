import React from 'react';
import {Text, View} from 'react-native';
import {titleCase} from './titleCase';

export const jsxify = (o: any, theme: any, parent?: string) => {
  return (
    <View key={parent} style={{marginLeft: 4}}>
      {Object.keys(o).map((key: string) =>
        typeof o[key] === 'string' ||
        typeof o[key] === 'number' ||
        typeof o[key] === 'boolean' ? (
          <Text key={'leaf' + parent + key} style={{color: theme.text}}>
            {titleCase(key)}: {o[key] + ''}
          </Text>
        ) : (
          <View key={'key' + parent + key}>
            <Text style={{color: theme.text, marginTop: 4}}>
              {titleCase(key)}:
            </Text>
            {jsxify(o[key], theme, key)}
          </View>
        ),
      )}
    </View>
  );
};
