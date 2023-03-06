import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from 'WordPuzzle/src/hooks';

const numColumns = 5;
const screenWidth = Dimensions.get('window').width;

interface Props {
  data: string[] | { char: string; used: boolean }[];
  onPress: (item: string, index: number) => void;
}

interface ItemProps {
  item: string | { char: string; used: boolean };
  index: number;
}

const Grid = ({ data, onPress }: Props) => {
  const [layout, setLayout] = useState({ width: screenWidth });
  const { Fonts, Gutters, Layout, Common } = useTheme();

  const renderItem = ({ item, index }: ItemProps) => {
    const { width } = layout;
    const itemWidth = (width - numColumns) / numColumns;
    return (
      <TouchableOpacity
        key={index}
        style={[Gutters.tinyPadding, { width: itemWidth, height: itemWidth }]}
        disabled={typeof item !== 'string' ? item.used : item === '_'}
        onPress={() =>
          onPress(typeof item === 'string' ? item : item.char, index)
        }
      >
        {
          <View
            style={[
              Common.textInput,
              Layout.fill,
              typeof item !== 'string' && item.used && Common.backgroundReset,
            ]}
          >
            <Text style={[Layout.fill, Fonts.textPrimary, Fonts.textLarge]}>
              {typeof item === 'string' ? item : item.used ? '' : item.char}
            </Text>
          </View>
        }
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      numColumns={numColumns}
      contentContainerStyle={[Layout.center]}
    />
  );
};

export default Grid;
