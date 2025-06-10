import {
  Blocks,
  BookUser,
  Cable,
  CircleDollarSign,
  Contact,
  CreditCard,
  Leaf,
  Monitor,
  Pickaxe,
  PillIcon,
  ShoppingBagIcon,
  Tractor,
  User,
} from 'lucide-react';

export interface Route {
  label: string;
  name_module: string;
  path: string;
  Icon: any;
}

export const routes: Route[] = [
  {
    label: 'Panel de control',
    path: 'dashboard',
    Icon: <Monitor />,
    name_module: 'dashboard',
  },
  {
    label: 'Usuarios',
    path: 'users/view/all',
    Icon: <User />,
    name_module: 'users',
  },
  {
    label: 'Empleados',
    path: 'employees/view/all',
    Icon: <Contact />,
    name_module: 'employees',
  },
  {
    label: 'Clientes',
    path: 'clients/view/all',
    Icon: <BookUser />,
    name_module: 'clients',
  },
  {
    label: 'Cultivos',
    path: 'crops/view/all',
    Icon: <Leaf />,
    name_module: 'crops',
  },
  {
    label: 'Proveedores',
    path: 'suppliers/view/all',
    Icon: <Blocks />,
    name_module: 'suppliers',
  },
  {
    label: 'Insumos',
    path: 'supplies/view/all',
    Icon: <PillIcon />,
    name_module: 'supplies',
  },
  {
    label: 'Cosechas',
    path: 'harvests/view/all',
    Icon: <Tractor />,
    name_module: 'harvests',
  },
  {
    label: 'Trabajos',
    path: 'works/view/all',
    Icon: <Pickaxe />,
    name_module: 'works',
  },
  {
    label: 'Ventas',
    path: 'sales/view/all',
    Icon: <CircleDollarSign />,
    name_module: 'sales',
  },
  {
    label: 'Compras',
    path: 'shopping/view/all',
    Icon: <ShoppingBagIcon />,
    name_module: 'shopping',
  },
  {
    label: 'Consumos',
    path: 'consumptions/view/all',
    Icon: <Cable />,
    name_module: 'consumptions',
  },
  {
    label: 'Pagos',
    path: 'payments/view/all',
    Icon: <CreditCard />,
    name_module: 'payments',
  },
];

export const getRouteIcon = (nameModule: string) => {
  const route = routes.find((route) => route.name_module === nameModule);
  return route?.Icon || null;
};
