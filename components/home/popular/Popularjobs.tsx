import type { FC, JSX } from 'react';
import React, { useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';

import styles from './popularjobs.style';

import { COLORS, SIZES } from '@/constants';
import PopularJobCard from '@/components/common/cards/popular/PopularJobCard';
import useFetch from '@/utils/hooks/useFetch';

const Popularjobs: FC = () => {
  const router = useRouter();
  const { data, error, isLoading } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
  });

  const renderContent = (): JSX.Element => {
    if (isLoading) {
      return <ActivityIndicator size="large" color={COLORS.primary} />;
    }

    if (error) {
      return <Text>Something went wrong!</Text>;
    }

    return (
      <FlatList
        data={data}
        renderItem={({ item }): JSX.Element => (
          <PopularJobCard
            job={item}
            isSelected={false}
            onCardPress={() => {}}
          />
        )}
        keyExtractor={({ job_id }): string => job_id}
        contentContainerStyle={{ columnGap: SIZES.medium }}
        horizontal
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity style={styles.headerBtn as StyleProp<ViewStyle>}>
          <Text>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>{renderContent()}</View>
    </View>
  );
};

export default Popularjobs;
