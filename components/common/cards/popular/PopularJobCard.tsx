import type { FC } from 'react';
import React from 'react';
import type { StyleProp, ImageStyle } from 'react-native';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import type { JobDetails } from '../../../../utils/types/fetch';
import { checkImageURL } from '../../../../utils/checkImageUrl';
import { COLORS } from '../../../../constants';

import styles from './popularjobcard.style';

interface IPopularJobCard {
  job: JobDetails;
  isSelected: boolean;
  hadnleCardPress: () => void;
}

const PopularJobCard: FC<IPopularJobCard> = ({
  job: { employer_logo, employer_name, job_title, job_country },
  isSelected,
  hadnleCardPress = (): void => {},
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isSelected ? COLORS.primary : '#FFF',
        },
      ]}
      onPress={hadnleCardPress}
    >
      <View
        style={[
          styles.logoContainer,
          {
            backgroundColor: isSelected ? '#FFF' : COLORS.white,
          },
        ]}
      >
        <Image
          style={styles.logoImage as StyleProp<ImageStyle>}
          source={{ uri: checkImageURL(employer_logo) }}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.companyName} numberOfLines={1}>
        {employer_name}
      </Text>
      <View style={styles.infoContainer}>
        <Text
          style={[
            styles.jobName,
            {
              color: isSelected ? COLORS.white : COLORS.primary,
            },
          ]}
          numberOfLines={1}
        >
          {job_title}
        </Text>
        <Text style={styles.location}>{job_country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
