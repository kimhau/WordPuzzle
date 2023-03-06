/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native';
import { CommonParams } from '../../@types/theme';
import buttonStyles from './components/Buttons';

export default function <C>({ Colors, ...args }: CommonParams<C>) {
  return {
    button: buttonStyles({ Colors, ...args }),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      textInput: {
        backgroundColor: Colors.inputBackground,
        color: Colors.text,
        height: 45,
        borderRadius: 10,
        alignItems: 'center',
      },
      modal: {
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 20,
        margin: 20,
        justifyContent: 'center',
        elevation: 5,
      },
      modalContainer: {
        backgroundColor: '#FFFFFF40',
      },
    }),
  };
}
