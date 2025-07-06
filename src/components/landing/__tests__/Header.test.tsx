import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

// Mock de la configuración
vi.mock('@/config', () => ({
  PATH_ADMIN_LOGIN: '/admin/login',
}));

// Mock de las utilidades
vi.mock('@/lib/utils', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Header', () => {
  it('debería renderizar correctamente', () => {
    renderWithRouter(<Header />);

    expect(screen.getByText('CropCo')).toBeInTheDocument();
    expect(screen.getByText('Administración')).toBeInTheDocument();
  });

  it('debería tener la estructura correcta del DOM', () => {
    renderWithRouter(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('shadow-sm');

    const container = header.querySelector('.container');
    expect(container).toHaveClass('flex', 'items-center', 'justify-between', 'px-4', 'py-4', 'mx-auto');
  });

  it('debería renderizar el logo como un enlace a la página principal', () => {
    renderWithRouter(<Header />);

    const logoLink = screen.getByText('CropCo').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
    expect(logoLink).toHaveClass('text-2xl', 'font-bold', 'text-foreground');
  });

  it('debería renderizar el enlace de administración con las clases correctas', () => {
    renderWithRouter(<Header />);

    const adminLink = screen.getByText('Administración');
    expect(adminLink).toHaveAttribute('href', '/admin/login');
    expect(adminLink).toHaveClass(
      'px-4',
      'py-2',
      'font-bold',
      'bg-gray-200',
      'border',
      'rounded-md',
      'text-foreground',
      'hover:bg-gray-400',
      'dark:text-slate-900'
    );
  });

  it('debería aplicar clases personalizadas cuando se proporciona className', () => {
    const customClass = 'custom-header-class';
    renderWithRouter(<Header className={customClass} />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('shadow-sm', customClass);
  });

  it('debería renderizar sin className personalizado por defecto', () => {
    renderWithRouter(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('shadow-sm');
    expect(header.className).not.toContain('undefined');
  });
});
