import { faker } from '@faker-js/faker';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Grid from 'WordPuzzle/src/components/Grid/Grid';
import { useTheme } from 'WordPuzzle/src/hooks';
import { GameProps } from '../../../@types/navigation';

export interface RandomChar {
  char: string;
  used: boolean;
}

const Game = ({ navigation, route }: GameProps) => {
  const { category } = route.params;
  const [answer, setAnswer] = useState<string>('');
  const [attempAnswer, setAttempAnswer] = useState<string[]>();
  const [randomCharArr, setRandomCharArr] = useState<RandomChar[]>();

  const initialRandomCharArr = useMemo(
    () => answer.split('').sort(() => Math.random() - 0.5),
    [answer],
  );

  const createAnswer = useCallback(() => {
    let ans = '';
    switch (category) {
      case 'animals':
        ans = faker.animal.type().toUpperCase();
        break;
      case 'countries':
        ans = faker.address.country().toUpperCase();
        break;
      case 'chemicals':
        ans = faker.science.chemicalElement().name.toUpperCase();
        break;
      default:
        ans = faker.animal.type().toUpperCase();
        break;
    }
    setAnswer(ans);
  }, []);

  useEffect(() => {
    setAttempAnswer(answer.split('').map(() => '_'));
  }, [answer]);

  useEffect(() => {
    createAnswer();
  }, []);

  useEffect(() => {
    setRandomCharArr(
      initialRandomCharArr.map(char => {
        return { char, used: false };
      }),
    );
  }, [initialRandomCharArr]);

  useEffect(() => {
    if (attempAnswer && attempAnswer.join('') === answer.toUpperCase()) {
      const mutiplier =
        category === 'animals' ? 1 : category === 'countries' ? 2 : 3;
      navigation.reset({
        index: 1,
        routes: [
          {
            name: 'Home',
          },
          {
            name: 'Congratz',
            params: { points: answer.length * mutiplier, category },
          },
        ],
      });
    }
  }, [attempAnswer, answer, category]);

  const { Layout, Fonts, Common, Gutters } = useTheme();

  function onRandomCharPress(letter: string, index: number) {
    // const attempAnswerIndex = attempAnswer.indexOf('_');
    // if (attempAnswerIndex > -1) {
    setRandomCharArr(prev => {
      return prev.map((char, i) => {
        if (i === index) {
          return { ...char, used: true };
        }
        return char;
      });
    });
    setAttempAnswer(prev => {
      const attempAnswerIndex = prev.indexOf('_');
      if (attempAnswerIndex === -1) {
        return prev;
      }
      return prev.map((char, i) => {
        if (i === attempAnswerIndex) {
          return letter;
        }
        return char;
      });
    });
    // }
  }

  function onRemoveAttempAnswer(letter: string, index: number) {
    setRandomCharArr(prev => {
      const randomCharIndex = prev.findIndex(
        char => char.char === letter && char.used,
      );
      if (randomCharIndex === -1) {
        return prev;
      }
      return prev.map((char, i) => {
        if (i === randomCharIndex) {
          return { ...char, used: false };
        }
        return char;
      });
    });

    setAttempAnswer(prev => {
      return prev.map((char, i) => {
        if (i === index) {
          return '_';
        }
        return char;
      });
    });
  }

  return (
    <SafeAreaView style={[Layout.fill, Layout.scrollSpaceBetween]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={[Fonts.textRegular, Fonts.textPrimary]}>{'< Back'}</Text>
      </TouchableOpacity>
      <Grid data={attempAnswer} onPress={onRemoveAttempAnswer} />
      <Grid data={randomCharArr} onPress={onRandomCharPress} />
      <TouchableOpacity
        style={[
          Common.button.rounded,
          Gutters.largeBMargin,
          Gutters.regularHMargin,
        ]}
        onPress={createAnswer}
      >
        <Text style={Fonts.textCenter}>Skip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Game;
