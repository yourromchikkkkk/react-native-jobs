import type { FC, ReactElement } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import useFetch from '../../../utils/hooks/useFetch';
import { COLORS } from '../../../constants';

import styles from './nearbyjobs.style';

const Nearbyjobs: FC = () => {
  const router = useRouter();
  const { data, error, isLoading } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
  });

  const renderContent = (): ReactElement | ReactElement[] => {
    if (isLoading) {
      return <ActivityIndicator size="large" color={COLORS.primary} />;
    }

    if (error || !data) {
      return <Text>Something went wrong!</Text>;
    }

    return data.map(item => (
      <NearbyJobCard
        key={item.job_id}
        job={item}
        hadnleCardPress={() => {
          router.push(`/job-details/${item.job_id}`);
        }}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity style={styles.headerBtn as StyleProp<ViewStyle>}>
          <Text>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>{renderContent()}</View>
    </View>
  );
};

export default Nearbyjobs;
