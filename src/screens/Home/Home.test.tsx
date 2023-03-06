import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'WordPuzzle/src/store';
import Home from './Home';

describe('Home', () => {
  it('renders correctly', () => {
    const { getByText, toJSON, getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    expect(toJSON()).toMatchSnapshot();
    expect(getByText('wordPuzzle')).toBeDefined();
    expect(getByText('animals')).toBeDefined();
    expect(getByText('countries')).toBeDefined();
    expect(getByText('chemicals')).toBeDefined();
    expect(getByTestId('start-button').props.enabled).toBe(false);
    expect(getByText('go-to-leaderboard')).toBeDefined();
  });

  it('selects a category', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    const animalsButton = getByText('animals');
    const countriesButton = getByText('countries');
    const chemicalsButton = getByText('chemicals');

    fireEvent.press(animalsButton);
    expect(animalsButton.parent?.parent?.props.style.backgroundColor).toBe(
      'orange',
    );
    expect(countriesButton.parent?.parent?.props.style.backgroundColor).toBe(
      'gray',
    );
    expect(chemicalsButton.parent?.parent?.props.style.backgroundColor).toBe(
      'gray',
    );
    expect(getByTestId('start-button').props.enabled).toBe(true);

    fireEvent.press(countriesButton);
    expect(animalsButton.parent?.parent?.props.style.backgroundColor).toBe(
      'gray',
    );
    expect(countriesButton.parent?.parent?.props.style.backgroundColor).toBe(
      'orange',
    );
    expect(chemicalsButton.parent?.parent?.props.style.backgroundColor).toBe(
      'gray',
    );
    expect(getByTestId('start-button').props.enabled).toBe(true);

    fireEvent.press(chemicalsButton);
    expect(animalsButton.parent?.parent?.props.style.backgroundColor).toBe(
      'gray',
    );
    expect(countriesButton.parent?.parent?.props.style.backgroundColor).toBe(
      'gray',
    );
    expect(chemicalsButton.parent?.parent?.props.style.backgroundColor).toBe(
      'orange',
    );
    expect(getByTestId('start-button').props.enabled).toBe(true);
  });

  it('navigates to game screen with selected category', () => {
    const navigation = { navigate: jest.fn() };
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Home navigation={navigation} />
      </Provider>,
    );
    const animalsButton = getByText('animals');
    fireEvent.press(animalsButton);

    const startButton = getByTestId('start-button');
    fireEvent.press(startButton);
    expect(navigation.navigate).toHaveBeenCalledWith({
      name: 'Game',
      params: { category: 'animals' },
    });
  });

  it('navigates to leaderboard screen', () => {
    const navigation = { navigate: jest.fn() };
    const { getByText } = render(
      <Provider store={store}>
        <Home navigation={navigation} />
      </Provider>,
    );
    const leaderboardButton = getByText('go-to-leaderboard');
    fireEvent.press(leaderboardButton);
    expect(navigation.navigate).toHaveBeenCalledWith({ name: 'Leaderboard' });
  });
});
