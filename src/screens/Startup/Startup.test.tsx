import { act, render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'WordPuzzle/src/store';
import Startup from './Startup';

// jest.mock('../../store/theme');

describe('Startup', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Mock timers to avoid waiting for 2 seconds
  });

  afterEach(() => {
    jest.useRealTimers(); // Restore real timers
    jest.resetAllMocks(); // Reset all mocks
  });

  it('should render ActivityIndicator and Text components', async () => {
    const { getByTestId, toJSON } = render(
      <Provider store={store}>
        <Startup />
      </Provider>,
    );
    expect(toJSON()).toMatchSnapshot();
    expect(getByTestId('activity-indicator')).toBeDefined();
    expect(getByTestId('text')).toBeDefined();
  });

  it('should call init function and navigate to Home screen', async () => {
    const resetMock = jest.fn();
    const navigation = { reset: resetMock };
    const { getByTestId } = render(
      <Provider store={store}>
        <Startup navigation={navigation} />
      </Provider>,
    );
    await act(async () => {
      jest.runAllTimers(); // Advance timers to resolve setTimeout in init function
    });
    expect(resetMock).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  });

  it('should display title using translation hook', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Startup />
      </Provider>,
    );
    expect(getByText('welcome:title')).toBeDefined();
  });
});
