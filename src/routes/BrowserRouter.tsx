import ErrorPage from '@/ErrorPage';
import { Home } from '@/components/Home';
import { ClientsModule } from '@/features/clients/ClientsModule';
import { CreateClient } from '@/features/clients/form/CreateClient';
import { ModifyClient } from '@/features/clients/form/ModifyClient';
import { ViewClient } from '@/features/clients/form/ViewClient';
import CropsModule from '@/features/crops/CropsModule';
import { CreateCrop } from '@/features/crops/form/CreateCrop';
import { ModifyCrop } from '@/features/crops/form/ModifyCrop';
import { ViewCrop } from '@/features/crops/form/ViewCrop';
import { EmployeesModule } from '@/features/employees/EmployeesModule';
import { CreateEmployee } from '@/features/employees/form/CreateEmployee';
import { ModifyEmployee } from '@/features/employees/form/ModifyEmployee';
import { ViewEmployee } from '@/features/employees/form/ViewEmployee';
import { SuppliersModule } from '@/features/suppliers/SuppliersModule';
import { CreateSupplier } from '@/features/suppliers/form/CreateSupplier';
import { ModifySupplier } from '@/features/suppliers/form/ModifySupplier';
import { ViewSupplier } from '@/features/suppliers/form/ViewSupplier';
import SuppliesModule from '@/features/supplies/SuppliesModule';
import { CreateSupply } from '@/features/supplies/form/CreateSupply';
import { ModifySupply } from '@/features/supplies/form/ModifySupply';
import { ViewSupply } from '@/features/supplies/form/ViewSupply';
import UsersModule from '@/features/users/UsersModule';
import { CreateUser } from '@/features/users/form/CreateUser';
import { ModifyUser } from '@/features/users/form/ModifyUser';
import { ViewUser } from '@/features/users/form/ViewUser';
import { createBrowserRouter } from 'react-router-dom';

// TODO: Crear archivo de barril para las importaciones

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'users',
        children: [
          {
            path: 'view',
            element: <UsersModule />,
          },
          {
            path: 'create',
            element: <CreateUser />,
          },
          {
            path: 'view/:id',
            element: <ViewUser />,
          },
          {
            path: 'modify/:id',
            element: <ModifyUser />,
          },
        ],
      },
      {
        path: 'crops',
        children: [
          {
            path: 'view',
            element: <CropsModule />,
          },
          {
            path: 'create',
            element: <CreateCrop />,
          },
          {
            path: 'modify/:id',
            element: <ModifyCrop />,
          },
          {
            path: 'view/:id',
            element: <ViewCrop />,
          },
        ],
      },
      {
        path: 'clients',
        children: [
          {
            path: 'view',
            element: <ClientsModule />,
          },
          {
            path: 'create',
            element: <CreateClient />,
          },
          {
            path: 'modify/:id',
            element: <ModifyClient />,
          },
          {
            path: 'view/:id',
            element: <ViewClient />,
          },
        ],
      },
      {
        path: 'employees',
        children: [
          {
            path: 'view',
            element: <EmployeesModule />,
          },
          {
            path: 'create',
            element: <CreateEmployee />,
          },
          {
            path: 'modify/:id',
            element: <ModifyEmployee />,
          },
          {
            path: 'view/:id',
            element: <ViewEmployee />,
          },
        ],
      },
      {
        path: 'supplies',
        children: [
          {
            path: 'view',
            element: <SuppliesModule />,
          },
          {
            path: 'create',
            element: <CreateSupply />,
          },
          {
            path: 'modify/:id',
            element: <ModifySupply />,
          },
          {
            path: 'view/:id',
            element: <ViewSupply />,
          },
        ],
      },
      {
        path: 'suppliers',
        children: [
          {
            path: 'view',
            element: <SuppliersModule />,
          },
          {
            path: 'create',
            element: <CreateSupplier />,
          },
          {
            path: 'modify/:id',
            element: <ModifySupplier />,
          },
          {
            path: 'view/:id',
            element: <ViewSupplier />,
          },
        ],
      },
    ],
  },
]);
