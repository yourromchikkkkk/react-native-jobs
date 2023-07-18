import type { FC } from 'react';
import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';

import { icons } from '../../../constants';

import styles from './footer.style';

interface IFooter {
  url: string;
  isLiked?: boolean;
  toggleIsLiked?: () => void;
}

const Footer: FC<IFooter> = ({
  url,
  isLiked = false,
  toggleIsLiked = (): void => {},
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn} onPress={toggleIsLiked}>
        <Image
          source={isLiked ? icons.heart : icons.heartOutline}
          resizeMode="contain"
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.applyBtn}
        onPress={(): Promise<unknown> => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
