import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Registration from '../screens/Registration';

test('renders Registration component', () => {
  const { getByText } = render(<Registration />);

  const titleElement = getByText(/Registrate/i);
  expect(titleElement).toBeTruthy();
});

test('fires handleRegistration on button press', () => {
  const { getByText } = render(<Registration />);
  const buttonElement = getByText(/Ok/i);

  fireEvent.press(buttonElement);

  // Add assertions based on the expected behavior of handleRegistration
});
