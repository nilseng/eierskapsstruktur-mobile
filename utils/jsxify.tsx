import React from 'react';
import {Text, View} from 'react-native';

export const jsxify = (o: any, theme: any, parent?: string) => {
  return (
    <View key={parent} style={{marginLeft: 4}}>
      {Object.keys(o).map((key: string) =>
        typeof o[key] === 'string' ||
        typeof o[key] === 'number' ||
        typeof o[key] === 'boolean' ? (
          <Text key={'leaf' + parent + key} style={{color: theme.text}}>
            {key}: {o[key] + ''}
          </Text>
        ) : (
          <View key={'key' + parent + key}>
            <Text style={{color: theme.text, marginTop: 4}}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </Text>
            {jsxify(o[key], theme, key)}
          </View>
        ),
      )}
    </View>
  );
};
