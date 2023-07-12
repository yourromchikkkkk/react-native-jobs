import type { FC } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import type { ImageSourcePropType, DimensionValue } from 'react-native';

import styles from './screenheader.style';

interface IScreenHeaderBtn {
  iconUrl: ImageSourcePropType;
  dimension: DimensionValue;
  handlePress?: () => void;
}

const ScreenHeaderBtn: FC<IScreenHeaderBtn> = ({
  iconUrl,
  dimension,
  handlePress = (): void => {},
}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode="contain"
        style={[
          styles.image,
          {
            width: dimension,
            height: dimension,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
