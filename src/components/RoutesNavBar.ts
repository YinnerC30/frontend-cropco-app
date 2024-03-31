interface Route {
  name: string;
  path: string;
}

export const routes: Route[] = [
  {
    name: 'Usuarios',
    path: 'users/view',
  },
  {
    name: 'Cultivos',
    path: 'crops/view',
  },
  {
    name: 'Clientes',
    path: 'clients/view',
  },
  {
    name: 'Proveedores',
    path: 'suppliers/view',
  },
  {
    name: 'Insumos',
    path: 'supplies/view',
  },
];
