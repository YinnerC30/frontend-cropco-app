import { Loading } from '@/modules/core/components';
import { Suspense } from 'react';
import { ProtectedRoute } from '../components';
import { RouteConfig } from '../interfaces/RouteConfig';

export const generateRoutes = (nameModule: string, routes: RouteConfig[]) =>
  routes.map(
    ({ path, action, element, viewComponent = false }: RouteConfig) => ({
      path,
      element: (
        <Suspense fallback={<Loading />}>
          <ProtectedRoute
            module={nameModule}
            action={action}
            element={element}
            viewComponent={viewComponent}
          />
        </Suspense>
      ),
    })
  );
