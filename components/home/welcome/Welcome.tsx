import React, { useState } from 'react';
import type { FC, ReactElement } from 'react';
import type { StyleProp, ImageStyle } from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';

import { icons, SIZES, COLORS } from '../../../constants';
import { JOB_TYPES } from '../../../constants/enums';

import styles from './welcome.style';

interface IWelcome {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onSearchPress: () => void;
}

interface IJobTypeElement {
  item: string;
  isActive: boolean;
  onPress: () => void;
}

const JobTypeElement: FC<IJobTypeElement> = ({ item, isActive, onPress }) => (
  <TouchableOpacity
    style={[
      styles.tab,
      {
        borderColor: isActive ? COLORS.secondary : COLORS.gray2,
      },
    ]}
    onPress={onPress}
  >
    <Text
      style={[
        styles.tabText,
        {
          color: isActive ? COLORS.secondary : COLORS.gray2,
        },
      ]}
    >
      {item}
    </Text>
  </TouchableOpacity>
);

const Welcome: FC<IWelcome> = ({
  searchQuery,
  setSearchQuery,
  onSearchPress,
}) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState<JOB_TYPES>(
    JOB_TYPES.CONTRACTOR
  );

  const onJobTypePress = (item: JOB_TYPES): void => {
    setActiveJobType(item);
    router.push(`/search/${item}`);
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Roman</Text>
        <Text style={styles.welcomeMessage}>Find your pefect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={(value: string): void => setSearchQuery(value)}
            placeholder="What are you looking for?"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={onSearchPress}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage as StyleProp<ImageStyle>}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={Object.values(JOB_TYPES)}
          renderItem={({ item }: { item: string }): ReactElement => (
            <JobTypeElement
              item={item}
              isActive={activeJobType === item}
              onPress={(): void => onJobTypePress(item as JOB_TYPES)}
            />
          )}
          keyExtractor={(item: string): string => item}
          contentContainerStyle={{ columnGap: SIZES.large }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
