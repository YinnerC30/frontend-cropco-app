import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from '../Header';

describe('Header', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('debería renderizar el header con la clase CSS proporcionada', () => {
    const testClassName = 'test-header-class';
    const testChildren = 'Contenido del header';

    render(<Header className={testClassName}>{testChildren}</Header>);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass(testClassName);
    expect(headerElement).toHaveTextContent(testChildren);
  });

  it('debería renderizar children complejos correctamente', () => {
    const testClassName = 'header-with-complex-children';
    const complexChildren = (
      <div>
        <h1>Título</h1>
        <p>Descripción</p>
      </div>
    );

    render(<Header className={testClassName}>{complexChildren}</Header>);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass(testClassName);
    expect(headerElement).toHaveTextContent('Título');
    expect(headerElement).toHaveTextContent('Descripción');
  });

  it('debería aplicar múltiples clases CSS', () => {
    const multipleClasses = 'header-class bg-blue-500 text-white';
    const testChildren = 'Header con múltiples clases';

    render(<Header className={multipleClasses}>{testChildren}</Header>);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass('header-class');
    expect(headerElement).toHaveClass('bg-blue-500');
    expect(headerElement).toHaveClass('text-white');
  });
});
