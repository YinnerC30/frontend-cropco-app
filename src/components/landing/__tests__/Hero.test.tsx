import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from '../Hero';

describe('Hero Component', () => {
  it('should render correctly', () => {
    const { container } = render(<Hero />);

    // Verificar que el componente se renderice
    const heroSection = container.querySelector('section');
    expect(heroSection).toBeInTheDocument();
  });

  it('should display the main heading', () => {
    render(<Hero />);

    const mainHeading = screen.getByRole('heading', {
      name: /administra tus cultivos con cropco/i,
    });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveClass(
      'mb-6',
      'text-4xl',
      'font-bold',
      'md:text-5xl',
      'text-slate-900'
    );
  });

  it('should display the description text', () => {
    render(<Hero />);

    const description = screen.getByText(
      /la solución integral para gestionar la información de tus cultivos agrícolas de manera eficiente y efectiva/i
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('mb-8', 'text-xl', 'text-gray-600');
  });

  it('should have the correct section structure and classes', () => {
    const { container } = render(<Hero />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('py-20', 'bg-primary/60', 'dark:bg-black-200');

    const containerDiv = section?.querySelector('.container');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv).toHaveClass('px-4', 'mx-auto', 'text-center');
  });

  it('should have proper heading hierarchy', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H1');
  });

  it('should match snapshot', () => {
    const { container } = render(<Hero />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
