import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Features from '../Features';

describe('Features', () => {
  it('debería renderizar correctamente', () => {
    render(<Features />);

    const section = screen
      .getByRole('heading', { level: 2 })
      .closest('section');
    expect(section).toBeInTheDocument();
  });

  it('debería tener la estructura correcta del DOM', () => {
    render(<Features />);

    const section = screen
      .getByRole('heading', { level: 2 })
      .closest('section');
    expect(section).toHaveClass('py-20');

    const container = section?.querySelector('.container');
    expect(container).toHaveClass('container', 'px-4', 'mx-auto');
  });

  it('debería renderizar el título de la sección', () => {
    render(<Features />);

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass(
      'mb-12',
      'text-3xl',
      'font-bold',
      'text-center',
      'text-black-800'
    );
    expect(title).toHaveTextContent('Características principales');
  });

  it('debería renderizar la grilla de características', () => {
    render(<Features />);

    const grid = screen
      .getByRole('heading', { level: 2 })
      .closest('section')
      ?.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass(
      'grid',
      'grid-cols-1',
      'gap-8',
      'sm:grid-cols-2',
      'md:grid-cols-3',
      'lg:grid-cols-4'
    );
  });

  it('debería renderizar todas las características con sus elementos', () => {
    render(<Features />);

    // Verificar que se rendericen los iconos SVG
    const svgIcons = document.querySelectorAll('svg');
    expect(svgIcons).toHaveLength(8);

    // Verificar que se rendericen los títulos de las características
    const featureTitles = screen.getAllByRole('heading', { level: 3 });
    expect(featureTitles).toHaveLength(8);

    // Verificar algunos títulos específicos
    expect(screen.getByText('Seguimiento de cultivos')).toBeInTheDocument();
    expect(screen.getByText('Control de Inventario')).toBeInTheDocument();
    expect(screen.getByText('Gestión de Personal')).toBeInTheDocument();
  });

  it('debería tener las clases correctas en las tarjetas de características', () => {
    const { container } = render(<Features />);

    const cards = container.querySelectorAll('.p-6');
    expect(cards).toHaveLength(8);

    cards.forEach((card) => {
      expect(card).toHaveClass(
        'p-6',
        'text-center',
        'transition-shadow',
        'duration-300',
        'bg-white',
        'rounded-lg',
        'shadow-sm',
        'hover:shadow-md'
      );
    });
  });

  it('debería tener las clases correctas en los iconos', () => {
    const { container } = render(<Features />);

    const icons = container.querySelectorAll('svg');
    icons.forEach((icon) => {
      expect(icon).toHaveClass(
        'w-12',
        'h-12',
        'mx-auto',
        'mb-4',
        'text-primary',
        'dark:text-slate-900'
      );
    });
  });

  it('debería tener las clases correctas en los títulos de características', () => {
    render(<Features />);

    const titles = screen.getAllByRole('heading', { level: 3 });
    titles.forEach((title) => {
      expect(title).toHaveClass(
        'mb-2',
        'text-xl',
        'font-semibold',
        'dark:text-slate-900'
      );
    });
  });

  it('debería tener las clases correctas en las descripciones de características', () => {
    const { container } = render(<Features />);

    const descriptions = container.querySelectorAll('p');
    descriptions.forEach((description) => {
      expect(description).toHaveClass('text-gray-600');
    });
  });

  it('debería mostrar las descripciones correctas', () => {
    render(<Features />);

    expect(
      screen.getByText(
        'Registra y monitorea el progreso de tus cultivos en tiempo real.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Gestiona eficientemente tus insumos y recursos agrícolas.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Administra tu equipo y asigna tareas de manera eficiente.'
      )
    ).toBeInTheDocument();
  });
});
