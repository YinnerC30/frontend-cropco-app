import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LandingPage } from '../LandingPage';

// Mock de los componentes hijos
vi.mock('./Header', () => {
  return {
    default: function MockHeader() {
      return <div data-testid="header">Header</div>;
    },
  };
});

vi.mock('./Hero', () => {
  return {
    default: function MockHero() {
      return <div data-testid="hero">Hero</div>;
    },
  };
});

vi.mock('./Features', () => {
  return {
    default: function MockFeatures() {
      return <div data-testid="features">Features</div>;
    },
  };
});

describe('LandingPage', () => {
  it('debería renderizar correctamente', () => {
    render(<LandingPage />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('features')).toBeInTheDocument();
  });

  it('debería tener la estructura correcta del DOM', () => {
    render(<LandingPage />);

    const container = screen.getByRole('main').parentElement;
    expect(container).toHaveClass('h-screen');

    const main = screen.getByRole('main');
    expect(main).toHaveClass('flex-grow');
  });

  it('debería renderizar todos los componentes hijos en el orden correcto', () => {
    render(<LandingPage />);

    const main = screen.getByRole('main');
    const children = main.children;

    expect(children[0]).toHaveAttribute('data-testid', 'hero');
    expect(children[1]).toHaveAttribute('data-testid', 'features');
  });
});
