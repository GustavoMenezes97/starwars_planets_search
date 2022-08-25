import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';
import AppProvider from '../context/AppProvider';
import App from '../App';

describe('Testa a aplicação', () => {
  
  test('Testa o botão "Filtrar" e "Remover"', () => {
    render( <AppProvider><App /></AppProvider>);
    
    const filterButton = screen.getByRole('button', { name: /filtrar/i });
  
    expect(filterButton).toBeInTheDocument();
  
    userEvent.click(filterButton);
  
    const filter = screen.getByText(/population | maior que | 0/i);
  
    expect(filter).toBeInTheDocument();
  });

  test('Testa campo de filtro por nome', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    render( <AppProvider><App /></AppProvider>);

    const name = screen.getByTestId('name-filter');

    expect(name).toBeInTheDocument();

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    userEvent.type(name, 'ooi');

    const tatooine = await screen.findByText(/tatooine/i);
      
    expect(tatooine).toBeInTheDocument();
  });

  test('Testa o filtro "Igual a", "Menor que" e "Maior que"', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    render( <AppProvider><App /></AppProvider>);

    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const filterButton = screen.getByRole('button', { name: /filtrar/i });

    userEvent.selectOptions(column, 'surface_water');
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.type(value, '100');
    userEvent.click(filterButton);

    userEvent.selectOptions(column, 'orbital_period');
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.type(value, '500');
    userEvent.click(filterButton);

    userEvent.selectOptions(column, 'population');
    userEvent.selectOptions(comparison, 'maior que');
    userEvent.type(value, '5000000');
    userEvent.click(filterButton);
  });

});
