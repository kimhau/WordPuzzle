import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { store } from 'WordPuzzle/src/store';
import Congratz from './Congratz';

const mockStore = configureStore([]);

describe('Congratz', () => {
  let initialStore;
  let component;

  beforeEach(() => {
    initialStore = mockStore({
      user: {
        name: 'John Doe',
        points: 100,
      },
      theme: { theme: 'default', darkMode: null },
    });

    component = (
      <Provider store={initialStore}>
        <Congratz
          route={{
            params: {
              points: 50,
              category: 'Animals',
            },
          }}
          navigation={{ reset: jest.fn() }}
        />
      </Provider>
    );
  });

  it('renders correctly', () => {
    const { getByText, toJSON } = render(component);
    expect(toJSON()).toMatchSnapshot();
    expect(getByText('title')).toBeTruthy();
    expect(getByText('desc')).toBeTruthy();
    expect(getByText('next')).toBeTruthy();
    expect(getByText('share')).toBeTruthy();
  });

  it('calls navigation.reset() when "Next" button is pressed with a name provided', () => {
    const { getByText, getByPlaceholderText } = render(component);

    fireEvent.press(getByText('next'));
    expect(
      component.props.children.props.navigation.reset,
    ).toHaveBeenCalledWith({
      index: 1,
      routes: [
        {
          name: 'Home',
        },
        {
          name: 'Game',
          params: { category: 'Animals' },
        },
      ],
    });
  });

  it('shows a modal when "Next" button is pressed with no name was provided previosly', async () => {
    const { getByText, toJSON, getByRole } = render(
      <Provider store={store}>
        <Congratz
          route={{
            params: {
              points: 50,
              category: 'Animals',
            },
          }}
          navigation={{ reset: jest.fn() }}
        />
      </Provider>,
    );

    fireEvent.press(getByText('next'));
    await waitFor(() => {
      expect(getByText('modalTitle')).toBeTruthy();
      expect(getByText('modalDesc')).toBeTruthy();
      expect(getByText('submit')).toBeTruthy();
    });
  });

  it('calls Share.open() when "Share" button is pressed', async () => {
    const { getByText } = render(component);
    // const openMock = jest.fn();

    const openMock = jest.spyOn(require('react-native-share'), 'open');

    fireEvent.press(getByText('share'));

    await waitFor(() => {
      expect(openMock).toHaveBeenCalledWith({
        title: 'shareTitle',
        url: undefined,
        type: 'image/jpeg',
      });
    });
  });
});
