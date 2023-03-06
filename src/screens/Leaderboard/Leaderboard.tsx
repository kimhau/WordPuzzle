import { faker } from '@faker-js/faker';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from 'WordPuzzle/src/hooks';
import { UserState } from 'WordPuzzle/src/store/user';

const Leaderboard = ({ navigation }) => {
  const user = useSelector((state: { user: UserState }) => state.user);
  const { Layout, Fonts, Gutters } = useTheme();

  const renderItem = ({ item, index }) => {
    console.log(item);
    return (
      <View style={[Layout.row, Gutters.smallMargin]}>
        <Text style={[Fonts.textRegular, Gutters.tinyRMargin, { flex: 0.2 }]}>
          {index + 1}
        </Text>
        <Text style={[Fonts.textRegular, Layout.fill]}>{item?.name}</Text>
        <Text style={[Fonts.textRegular]}>{item?.points}</Text>
      </View>
    );
  };

  interface User {
    name: string;
    points: string;
    id: string;
  }

  const fakeUsers = (count: number): User[] => {
    const users: User[] = [];
    for (let i = 0; i < count; i++) {
      users.push({
        name: faker.name.fullName(),
        points: faker.random.numeric(9),
        id: faker.random.numeric(9),
      });
    }
    return users.sort((a, b) => parseInt(b.points) - parseInt(a.points));
  };

  return (
    <SafeAreaView style={[Layout.fill]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={[Fonts.textRegular, Fonts.textPrimary]}>{'< Back'}</Text>
      </TouchableOpacity>
      <FlatList
        data={[...fakeUsers(10), user]}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View style={[Layout.row, Gutters.smallMargin]}>
            <Text
              style={[Fonts.textRegular, Gutters.tinyRMargin, { flex: 0.2 }]}
            >
              #
            </Text>
            <Text style={[Fonts.textRegular, Fonts.textBold, Layout.fill]}>
              Name
            </Text>
            <Text style={[Fonts.textRegular, Fonts.textBold]}>Points</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Leaderboard;
