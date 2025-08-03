import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { FormUserContext, FormUserProvider } from '../FormUserContext';
import { render } from '@/test-utils';

const mockChildren = <div>Contenido de prueba</div>;

const mockProps = {
  children: mockChildren,
  readOnly: false,
  user: undefined,
  hiddenPassword: false,
  onSubmit: vi.fn(),
};

describe('FormUserContext', () => {
  it('debe renderizar el proveedor y pasar el contexto correctamente', () => {
    let contextValue: any = null;

    function ContextConsumer() {
      contextValue = React.useContext(FormUserContext);
      return <span>Consumer</span>;
    }

    render(
      <FormUserProvider {...mockProps}>
        <ContextConsumer />
      </FormUserProvider>
    );

    expect(contextValue).toBeDefined();
    expect(contextValue.form).toBeDefined();
    expect(contextValue.readOnly).toBe(false);
    expect(contextValue.hiddenPassword).toBe(false);
    expect(typeof contextValue.onSubmit).toBe('function');
    expect(contextValue.form.getValues()).toBeDefined();
  });

  it('debe pasar los valores por defecto cuando no se proporciona usuario', () => {
    let contextValue: any = null;

    function ContextConsumer() {
      contextValue = React.useContext(FormUserContext);
      return <span>Consumer</span>;
    }

    render(
      <FormUserProvider {...mockProps}>
        <ContextConsumer />
      </FormUserProvider>
    );

    expect(contextValue.form.getValues()).toBeDefined();
  });

  it('debe permitir el acceso a las funciones del contexto', () => {
    let contextValue: any = null;

    function ContextConsumer() {
      contextValue = React.useContext(FormUserContext);
      return <span>Consumer</span>;
    }

    render(
      <FormUserProvider {...mockProps}>
        <ContextConsumer />
      </FormUserProvider>
    );

    expect(typeof contextValue.handleSelectAllActions).toBe('function');
    expect(typeof contextValue.handleInselectAllActions).toBe('function');
    expect(typeof contextValue.updateActionsUserForm).toBe('function');
  });

  it('debe renderizar los children correctamente', () => {
    const { getByText } = render(
      <FormUserProvider {...mockProps}>{mockChildren}</FormUserProvider>
    );
    expect(getByText('Contenido de prueba')).toBeInTheDocument();
  });
});
