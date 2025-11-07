import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../Navigation';
import { describe, it, expect } from 'vitest';
import { AuthProvider } from '@/providers/auth-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('Navigation', () => {
  it('should render all navigation links', () => {
    const queryClient = new QueryClient();
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Navigation />
          </AuthProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Mapa das Hortas')).toBeInTheDocument();
    expect(screen.getByText('Receitas')).toBeInTheDocument();
    expect(screen.getByText('Calendario verde')).toBeInTheDocument();
    expect(screen.getByText('Guia do cultivo')).toBeInTheDocument();
  });
});
