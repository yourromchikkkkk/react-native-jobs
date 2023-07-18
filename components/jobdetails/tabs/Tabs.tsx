import type { FC, ReactElement } from 'react';
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import { SIZES, COLORS } from '../../../constants';
import type { TABS } from '../../../constants/enums';

import styles from './tabs.style';

interface ITabs {
  tabs: TABS[];
  activeTab: TABS;
  setActiveTab: (value: TABS) => void;
}

interface ITabButton {
  name: TABS;
  isActive: boolean;
  onHandleSearchType: () => void;
}

const TabButton: FC<ITabButton> = ({ name, isActive, onHandleSearchType }) => (
  <TouchableOpacity
    style={[
      styles.btn,
      { backgroundColor: isActive ? COLORS.primary : '#F3F4F8' },
    ]}
    onPress={onHandleSearchType}
  >
    <Text style={[styles.btnText, { color: isActive ? '#C3BFCC' : '#AAA9B8' }]}>
      {name}
    </Text>
  </TouchableOpacity>
);

const Tabs: FC<ITabs> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }): ReactElement => (
          <TabButton
            name={item}
            isActive={item === activeTab}
            onHandleSearchType={(): void => setActiveTab(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item): TABS => item}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
      />
    </View>
  );
};

export default Tabs;
