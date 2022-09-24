import React from 'React';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Navbar from '../client/components/Navbar';

import '@testing-library/jest-dom';

const initialState = {slice: {
  codeOutput: `describe('Sample description')`,
}};

const mockStore = configureStore()

const navbar = () => {
  render(
    <Provider store={mockStore(initialState)}>
      <Navbar />
    </Provider>
  );
};

// Not rending in beforeEach yet in case we need t
describe('Unit testing Navbar components', () => {
  beforeEach(() => {
    navbar();
  });

  test('Renders Navbar', () => {
    navbar();
  });

  test('Renders Logo', () => {
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });

  test('Renders the link to the tutorial', () => {
    const button = screen.getByRole('button', { name: /tutorial/i });
    expect(button).toBeInTheDocument();
  });

  test('Renders the logout button', () => {
    const button = screen.getByRole('button', { name: /logout/i  });
    expect(button).toBeInTheDocument();
  });

})