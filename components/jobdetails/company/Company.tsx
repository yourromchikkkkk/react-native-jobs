import type { FC } from 'react';
import React from 'react';
import { View, Text, Image } from 'react-native';

import { icons } from '../../../constants';
import { checkImageURL } from '../../../utils/checkImageUrl';

import styles from './company.style';

interface ICompany {
  companyLogo: string;
  jobTitle: string;
  companyName: string;
  locations: string;
}

const Company: FC<ICompany> = ({
  companyLogo,
  jobTitle,
  companyName,
  locations,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          style={styles.logoImage}
          source={{ uri: checkImageURL(companyLogo) }}
        />
      </View>
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>

      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName}</Text>
        <View style={styles.locationBox}>
          <Image
            source={{ uri: icons.location }}
            resizeMode="contain"
            style={styles.locationImage}
          />
          <Text style={styles.locationName}>{locations}</Text>
        </View>
      </View>
    </View>
  );
};

export default Company;
