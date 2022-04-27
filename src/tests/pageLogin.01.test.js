import React from 'react';
/* import userEvent from '@testing-library/user-event'; */
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWhitRouter';
import Login from '../pages/Login';

describe('1- Teste o componente <Login.js />.', () => {
  test('Os elementos devem respeitar a descrição para a tela de login.', () => {
    renderWithRouter(<Login />);
    const email = screen.getByTestId('email-input');
    const password = screen.getAllByTestId('password-input');
    const button = screen.getAllByTestId('login-submit-btn');
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
