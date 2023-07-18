import type { FC } from 'react';
import React from 'react';
import { View, Text } from 'react-native';

import type { TABS } from '../../../constants/enums';

import styles from './specifics.style';

interface ISpecifics {
  title: TABS;
  data: string[];
}

const Specifics: FC<ISpecifics> = ({ title, data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}:</Text>
      <View style={styles.pointsContainer}>
        {data.map((point, idx) => (
          <View style={styles.pointWrapper} key={`${point}${idx}`}>
            <Text style={styles.pointDot} />
            <Text style={styles.pointText}>{point}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Specifics;
