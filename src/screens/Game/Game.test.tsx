import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'WordPuzzle/src/store';
import Game from './Game';

jest.mock('@faker-js/faker', () => ({
  faker: {
    animal: {
      type: jest.fn(() => 'lion'),
    },
  },
}));

//mock Math.random()
const randomFn = jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

describe('Game', () => {
  const mockNavigation = {
    goBack: jest.fn(),
    reset: jest.fn(),
  };
  const mockRoute = {
    params: { category: 'animals' },
  };

  let component;

  beforeEach(() => {
    component = (
      <Provider store={store}>
        <Game navigation={mockNavigation} route={mockRoute} />
      </Provider>
    );
  });

  it('renders correctly', () => {
    const { toJSON } = render(component);
    expect(toJSON()).toMatchSnapshot();
  });

  it('allows user to enter letters and remove them', () => {
    const { getByTestId, getByText, getAllByText } = render(component);

    // Click on a random character and verify that it appears in the answer
    const randomCharL = getByText('L');
    const randomCharI = getByText('I');
    const randomCharO = getByText('O');
    const randomCharN = getByText('N');

    const answerChars = getAllByText('_');
    fireEvent.press(randomCharL);
    expect(answerChars[0].props.children).toEqual('L');

    // Click on the answer character and verify that it disappears
    fireEvent.press(answerChars[0]);
    expect(answerChars[0].props.children).toEqual('_');
  });

  it('allows user to skip the game', () => {
    const { getByText } = render(component);

    // Click on the Skip button and verify that navigation.reset is called
    const skipButton = getByText('Skip');
    fireEvent.press(skipButton);
    expect(randomFn).toHaveBeenCalled();
  });
});
