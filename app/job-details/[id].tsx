import type { ReactElement, FC } from 'react';
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from '../../components';
import { COLORS, SIZES, icons } from '../../constants';
import useFetch from '../../utils/hooks/useFetch';
import { TABS } from '../../constants/enums';

const JobDetails: FC = () => {
  const { id } = useSearchParams();
  const router = useRouter();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS.ABOUT);
  const [isLiked, setIsLiked] = useState(false);

  const { data, isLoading, error, refetch } = useFetch('job-details', {
    job_id: id,
  });

  const toggleIsLiked = (): void => setIsLiked(prevValue => !prevValue);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    refetch();
    setIsRefreshing(false);
  }, [id]);

  const displayTabContent = (): ReactElement => {
    switch (activeTab) {
      case TABS.ABOUT:
        return (
          <JobAbout
            title={TABS.ABOUT}
            info={data?.[0].job_description ?? 'No information provided'}
          />
        );
      case TABS.QUALIFICATIONS:
        return (
          <Specifics
            title={TABS.QUALIFICATIONS}
            data={data?.[0].job_highlights.Qualifications ?? ['N/A']}
          />
        );
      case TABS.RESPONSIBILITIES:
        return (
          <Specifics
            title={TABS.RESPONSIBILITIES}
            data={data?.[0].job_highlights.Responsibilities ?? ['N/A']}
          />
        );
      default:
        return <Text>Somethins went wrong!</Text>;
    }
  };

  const renderView = (): ReactElement => {
    if (isLoading) {
      return <ActivityIndicator size="large" color={COLORS.primary} />;
    }
    if (error) {
      return <Text>Something went wrong! </Text>;
    }
    if (data?.length === 0) {
      return <Text>No data</Text>;
    }

    if (data?.[0]) {
      const job = data?.[0];
      return (
        <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
          <Company
            companyLogo={job?.employer_logo}
            jobTitle={job.job_title}
            companyName={job.employer_name}
            locations={job.job_country}
          />
          <JobTabs
            tabs={Object.values(TABS)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {displayTabContent()}
        </View>
      );
    }

    return <Text>Something went wrong! </Text>;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: (): ReactElement => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={(): void => router.back()}
            />
          ),
          headerRight: (): ReactElement => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: '',
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          {renderView()}
        </ScrollView>
        <JobFooter
          isLiked={isLiked}
          toggleIsLiked={toggleIsLiked}
          url={
            data?.[0].job_google_link ??
            'https://careers.google.com/jobs/result'
          }
        />
      </>
    </SafeAreaView>
  );
};
export default JobDetails;
