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

import styles from './welcome.style';

const jobTypes = ['Full-time', 'Part-time', 'Contractor'];

const Welcome: FC = () => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState<string>('Contractor');

  const onJobTypePress = (item: string): void => {
    setActiveJobType(item);
    //TODO type routinh
    //@ts-ignore
    router.push(`search/${item}`);
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
            value=""
            onChange={() => {}}
            placeholder="What are you looking for?"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage as StyleProp<ImageStyle>}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }: { item: string }): ReactElement => (
            <JobTypeElement
              item={item}
              isActive={activeJobType === item}
              onPress={(): void => onJobTypePress(item)}
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

export default Welcome;
