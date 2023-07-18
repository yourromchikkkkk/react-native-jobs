import type { ReactElement, FC } from 'react';
import React, { useEffect, useState, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';

import { ScreenHeaderBtn, NearbyJobCard } from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import styles from '../../styles/search';
import searchJobs from '../../utils/searchJobs';
import type { JobDetails } from '../../utils/types/fetch';

const JobSearch: FC = () => {
  const params = useSearchParams();
  const query = useMemo(() => params.id, []);
  const router = useRouter();

  const [searchResult, setSearchResult] = useState<JobDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<Error>();
  const [page, setPage] = useState(1);

  const toggleIsLoadingState = (): void =>
    setIsLoading(prevState => !prevState);

  const handleSearch = async (): Promise<void> => {
    try {
      setSearchResult([]);
      toggleIsLoadingState();
      const data = await searchJobs({ query, pageNum: page });
      setSearchResult(data);
    } catch (error) {
      console.error(error);
      setSearchError(error as Error);
    } finally {
      toggleIsLoadingState();
    }
  };

  const handlePagination = (direction: string): void => {
    if (direction === 'left' && page > 1) {
      setPage(page - 1);
      handleSearch();
    } else if (direction === 'right') {
      setPage(page + 1);
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: (): ReactElement => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={(): void => router.back()}
            />
          ),
          headerTitle: '',
        }}
      />

      <FlatList
        data={searchResult}
        renderItem={({ item }): ReactElement => (
          <NearbyJobCard
            job={item}
            hadnleCardPress={(): void =>
              router.push(`/job-details/${item.job_id}`)
            }
          />
        )}
        keyExtractor={(item): string => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={(): ReactElement => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{query}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                searchError && <Text>Oops something went wrong</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={(): ReactElement | null => {
          return isLoading ? null : (
            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={styles.paginationButton}
                disabled={isLoading}
                onPress={(): void => handlePagination('left')}
              >
                <Image
                  source={icons.chevronLeft}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={styles.paginationTextBox}>
                <Text style={styles.paginationText}>{page}</Text>
              </View>
              <TouchableOpacity
                style={styles.paginationButton}
                disabled={isLoading}
                onPress={(): void => handlePagination('right')}
              >
                <Image
                  source={icons.chevronRight}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default JobSearch;
