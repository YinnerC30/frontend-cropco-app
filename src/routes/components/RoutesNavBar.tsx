import { BookUser, Contact, Monitor, User } from 'lucide-react';

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
  // {
  //   label: 'Cultivos',
  //   path: 'crops/view/all',
  //   Icon: <Leaf />,
  //   name_module: 'crops',
  // },
  // {
  //   label: 'Proveedores',
  //   path: 'suppliers/view/all',
  //   Icon: <Blocks />,
  //   name_module: 'suppliers',
  // },
  // {
  //   label: 'Insumos',
  //   path: 'supplies/view/all',
  //   Icon: <PillIcon />,
  //   name_module: 'supplies',
  // },
  // {
  //   label: 'Cosechas',
  //   path: 'harvests/view/all',
  //   Icon: <Tractor />,
  //   name_module: 'harvests',
  // },
  // {
  //   label: 'Ventas',
  //   path: 'sales/view/all',
  //   Icon: <CircleDollarSign />,
  //   name_module: 'sales',
  // },
  // {
  //   label: 'Trabajos',
  //   path: 'works/view/all',
  //   Icon: <Pickaxe />,
  //   name_module: 'works',
  // },
  // {
  //   label: 'Pagos',
  //   path: 'payments/view/all',
  //   Icon: <CreditCard />,
  //   name_module: 'payments',
  // },
  // {
  //   label: 'Compras',
  //   path: 'shopping/view/all',
  //   Icon: <ShoppingBagIcon />,
  //   name_module: 'sales',
  // },
  // {
  //   label: 'Consumos',
  //   path: 'consumption/view/all',
  //   Icon: <Cable />,
  //   name_module: 'supplies',
  // },
];
