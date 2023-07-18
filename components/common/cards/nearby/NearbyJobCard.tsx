import type { FC } from 'react';
import React from 'react';
import type { StyleProp, ImageStyle } from 'react-native';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { checkImageURL } from '../../../../utils/checkImageUrl';
import type { JobDetails } from '../../../../utils/types/fetch';

import styles from './nearbyjobcard.style';

interface INearbyJobCard {
  job: JobDetails;
  hadnleCardPress: () => void;
}

const NearbyJobCard: FC<INearbyJobCard> = ({
  job: { employer_logo, job_title, job_employment_type },
  hadnleCardPress = (): void => {},
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={hadnleCardPress}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage as StyleProp<ImageStyle>}
          source={{ uri: checkImageURL(employer_logo) }}
          resizeMode="contain"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job_title}
        </Text>
        <Text style={styles.jobType}>{job_employment_type}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default NearbyJobCard;
