import ErrorPage from '@/ErrorPage';
import { Home } from '@/components/Home';
import { ClientsModule } from '@/dashboard/clients/ClientsModule';
import { CreateClient } from '@/dashboard/clients/form/CreateClient';
import { ModifyClient } from '@/dashboard/clients/form/ModifyClient';
import { ViewClient } from '@/dashboard/clients/form/ViewClient';
import CropsModule from '@/dashboard/crops/CropsModule';
import { CreateCrop } from '@/dashboard/crops/form/CreateCrop';
import { ModifyCrop } from '@/dashboard/crops/form/ModifyCrop';
import { ViewCrop } from '@/dashboard/crops/form/ViewCrop';
import { EmployeesModule } from '@/dashboard/employees/EmployeesModule';
import { CreateEmployee } from '@/dashboard/employees/form/CreateEmployee';
import { ModifyEmployee } from '@/dashboard/employees/form/ModifyEmployee';
import { ViewEmployee } from '@/dashboard/employees/form/ViewEmployee';
import { SuppliersModule } from '@/dashboard/suppliers/SuppliersModule';
import { CreateSupplier } from '@/dashboard/suppliers/form/CreateSupplier';
import { ModifySupplier } from '@/dashboard/suppliers/form/ModifySupplier';
import { ViewSupplier } from '@/dashboard/suppliers/form/ViewSupplier';
import SuppliesModule from '@/dashboard/supplies/SuppliesModule';
import { CreateSupply } from '@/dashboard/supplies/form/CreateSupply';
import { ModifySupply } from '@/dashboard/supplies/form/ModifySupply';
import { ViewSupply } from '@/dashboard/supplies/form/ViewSupply';
import UsersModule from '@/dashboard/users/UsersModule';
import { CreateUser } from '@/dashboard/users/CreateUser';
import { ModifyUser } from '@/dashboard/users/ModifyUser';
import { ViewUser } from '@/dashboard/users/ViewUser';
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
