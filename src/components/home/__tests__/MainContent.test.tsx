import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { MainContent } from '../MainContent';
import { useSidebar } from '@/components/ui/sidebar';

// Mock del hook useSidebar
vi.mock('@/components/ui/sidebar', () => ({
  useSidebar: vi.fn(),
}));

// Mock de react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet">Contenido del Outlet</div>,
  };
});

describe('MainContent', () => {
  const mockUseSidebar = vi.mocked(useSidebar);

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('debería renderizar el componente principal correctamente', () => {
    mockUseSidebar.mockReturnValue({
      isMobile: false,
      open: false,
      state: 'collapsed',
      setOpen: vi.fn(),
      openMobile: false,
      setOpenMobile: vi.fn(),
      toggleSidebar: vi.fn(),
    });

    render(
      <MemoryRouter>
        <MainContent />
      </MemoryRouter>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  it('debería aplicar clases CSS correctas cuando no es móvil y sidebar está cerrado', () => {
    mockUseSidebar.mockReturnValue({
      isMobile: false,
      open: false,
      state: 'collapsed',
      setOpen: vi.fn(),
      openMobile: false,
      setOpenMobile: vi.fn(),
      toggleSidebar: vi.fn(),
    });

    render(
      <MemoryRouter>
        <MainContent />
      </MemoryRouter>
    );

    const mainDiv = screen.getByRole('main').firstElementChild;
    expect(mainDiv).toHaveClass('h-screen', 'px-5', 'pt-5', 'w-screen');
  });

  it('debería aplicar clases CSS correctas cuando no es móvil y sidebar está abierto', () => {
    mockUseSidebar.mockReturnValue({
      isMobile: false,
      open: true,
      state: 'collapsed',
      setOpen: vi.fn(),
      openMobile: false,
      setOpenMobile: vi.fn(),
      toggleSidebar: vi.fn(),
    });

    render(
      <MemoryRouter>
        <MainContent />
      </MemoryRouter>
    );

    const mainDiv = screen.getByRole('main').firstElementChild;
    expect(mainDiv).toHaveClass('h-screen', 'px-5', 'pt-5');
    expect(mainDiv).toHaveClass('w-[calc(100vw-var(--sidebar-width))]');
  });

  it('debería aplicar clases CSS correctas cuando es móvil', () => {
    mockUseSidebar.mockReturnValue({
      isMobile: true,
      open: false,
      state: 'collapsed',
      setOpen: vi.fn(),
      openMobile: false,
      setOpenMobile: vi.fn(),
      toggleSidebar: vi.fn(),
    });

    render(
      <MemoryRouter>
        <MainContent />
      </MemoryRouter>
    );

    const mainDiv = screen.getByRole('main').firstElementChild;
    expect(mainDiv).toHaveClass('h-screen', 'px-5', 'pt-5', 'w-screen');
  });

  it('debería aplicar clases CSS correctas cuando es móvil y sidebar está abierto', () => {
    mockUseSidebar.mockReturnValue({
      isMobile: true,
      open: true,
      state: 'collapsed',
      setOpen: vi.fn(),
      openMobile: false,
      setOpenMobile: vi.fn(),
      toggleSidebar: vi.fn(),
    });

    render(
      <MemoryRouter>
        <MainContent />
      </MemoryRouter>
    );

    const mainDiv = screen.getByRole('main').firstElementChild;
    expect(mainDiv).toHaveClass('h-screen', 'px-5', 'pt-5', 'w-screen');
  });

  it('debería renderizar el Outlet dentro del contenedor principal', () => {
    mockUseSidebar.mockReturnValue({
      isMobile: false,
      open: false,
      state: 'collapsed',
      setOpen: vi.fn(),
      openMobile: false,
      setOpenMobile: vi.fn(),
      toggleSidebar: vi.fn(),
    });

    render(
      <MemoryRouter>
        <MainContent />
      </MemoryRouter>
    );

    const outlet = screen.getByTestId('outlet');
    const mainDiv = screen.getByRole('main').firstElementChild;

    expect(mainDiv).toContainElement(outlet);
  });
});
