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
    name_module: 'N/A',
  },
  {
    label: 'Usuarios',
    path: 'users/all',
    Icon: <User />,
    name_module: 'users',
  },
  {
    label: 'Empleados',
    path: 'employees/all',
    Icon: <Contact />,
    name_module: 'employees',
  },
  {
    label: 'Cultivos',
    path: 'crops/all',
    Icon: <Leaf />,
    name_module: 'crops',
  },
  {
    label: 'Clientes',
    path: 'clients/all',
    Icon: <BookUser />,
    name_module: 'clients',
  },
  {
    label: 'Proveedores',
    path: 'suppliers/all',
    Icon: <Blocks />,
    name_module: 'suppliers',
  },
  {
    label: 'Insumos',
    path: 'supplies/all',
    Icon: <PillIcon />,
    name_module: 'supplies',
  },
  {
    label: 'Cosechas',
    path: 'harvests/all',
    Icon: <Tractor />,
    name_module: 'harvests',
  },
  {
    label: 'Ventas',
    path: 'sales/all',
    Icon: <CircleDollarSign />,
    name_module: 'sales',
  },
  {
    label: 'Trabajos',
    path: 'works/all',
    Icon: <Pickaxe />,
    name_module: 'works',
  },
  {
    label: 'Pagos',
    path: 'payments/all',
    Icon: <CreditCard />,
    name_module: 'payments',
  },
  {
    label: 'Compras',
    path: 'shopping/all',
    Icon: <ShoppingBagIcon />,
    name_module: 'sales',
  },
  {
    label: 'Consumos',
    path: 'consumption/all',
    Icon: <Cable />,
    name_module: 'supplies',
  },
];
