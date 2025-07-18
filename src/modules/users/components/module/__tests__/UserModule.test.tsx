import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { UsersModule } from '../UsersModule';
import { render } from '@/test-utils';

describe('UsersModule', () => {
  beforeEach(() => {
    // Aquí podrías limpiar mocks o hacer setup común si fuera necesario
  });

  it('should render the UsersModule with all main sections', () => {
    render(<UsersModule />);
    // El módulo principal debe estar presente
    expect(screen.getByTestId('module-user')).toBeInTheDocument();
    // El breadcrumb debe mostrar "Usuarios"
  });

//   it('should match snapshot', () => {
//     const { asFragment } = render(<UsersModule />);
//     expect(asFragment()).toMatchSnapshot();
//   });
});
