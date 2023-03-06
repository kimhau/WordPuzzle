import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'WordPuzzle/src/hooks';
import { ApplicationScreenProps } from '../../../@types/navigation';

const Home = ({ navigation }: ApplicationScreenProps) => {
  const { t } = useTranslation('home');
  const { Fonts, Common, Layout, Gutters } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleStartPress = () => {
    // Navigate to game screen with selectedCategory
    console.log(`Starting game with category: ${selectedCategory}`);
    navigation.navigate({
      name: 'Game',
      params: {
        category: selectedCategory,
      },
    });
  };

  const handleLeaderboardPress = () => {
    // Navigate to leaderboard screen
    navigation.navigate({
      name: 'Leaderboard',
    });
  };

  return (
    <SafeAreaView
      style={[Layout.fill, Gutters.regularPadding, Layout.justifyContentAround]}
    >
      <Text style={[Fonts.titleRegular, Fonts.textCenter]}>
        {t('wordPuzzle')}
      </Text>
      <View style={[Layout.column, Layout.gap, Gutters.smallPadding]}>
        <TouchableOpacity
          style={[
            Common.button.rounded,
            {
              backgroundColor:
                selectedCategory === 'animals' ? 'orange' : 'gray',
            },
          ]}
          onPress={() => handleCategorySelect('animals')}
        >
          <Text style={Fonts.textCenter}>{t('animals')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Common.button.rounded,
            {
              backgroundColor:
                selectedCategory === 'countries' ? 'orange' : 'gray',
            },
          ]}
          onPress={() => handleCategorySelect('countries')}
        >
          <Text style={Fonts.textCenter}>{t('countries')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Common.button.rounded,
            {
              backgroundColor:
                selectedCategory === 'chemicals' ? 'orange' : 'gray',
            },
          ]}
          onPress={() => handleCategorySelect('chemicals')}
        >
          <Text style={Fonts.textCenter}>{t('chemicals')}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        testID="start-button"
        disabled={!selectedCategory}
        style={[Common.button.rounded]}
        onPress={handleStartPress}
      >
        <Text style={Fonts.textBold}>{t('start')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLeaderboardPress}>
        <Text style={[Fonts.textRight, Fonts.textPrimary]}>
          {t('go-to-leaderboard')}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
