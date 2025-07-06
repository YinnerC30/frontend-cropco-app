import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NavBar } from '../NavBar';

describe('NavBar', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });
  it('debería renderizar la barra de navegación con la clase CSS proporcionada', () => {
    const testClassName = 'test-navbar-class';
    const testChildren = 'Contenido de la navbar';

    render(<NavBar className={testClassName}>{testChildren}</NavBar>);

    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass(testClassName);
    expect(navElement).toHaveTextContent(testChildren);
  });

  it('debería renderizar children complejos correctamente', () => {
    const testClassName = 'navbar-with-complex-children';
    const complexChildren = (
      <div>
        <a href="/">Inicio</a>
        <a href="/about">Acerca de</a>
      </div>
    );

    render(<NavBar className={testClassName}>{complexChildren}</NavBar>);

    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass(testClassName);
    expect(navElement).toHaveTextContent('Inicio');
    expect(navElement).toHaveTextContent('Acerca de');
  });

  it('debería aplicar múltiples clases CSS', () => {
    const multipleClasses = 'navbar-class bg-gray-800 text-white';
    const testChildren = 'Navbar con múltiples clases';

    render(<NavBar className={multipleClasses}>{testChildren}</NavBar>);

    const navElement = screen.getByRole('navigation');
    expect(navElement).toHaveClass('navbar-class');
    expect(navElement).toHaveClass('bg-gray-800');
    expect(navElement).toHaveClass('text-white');
  });
});
