import { BreadCrumb } from '@/modules/core/components';
import React from 'react';

export const HomeManagementPage: React.FC = () => {
  return (
    <>
      <BreadCrumb finalItem={''} />
      <main className="h-[50vh] flex items-center justify-center">
        <div>
          <h1 className="mb-10 text-2xl font-bold text-center">
            Bienvenid@ a la administración de CropCo
          </h1>
          <p className="text-center text-muted-foreground">
            Aquí podrás controlar la información de los inquilinos de la
            plataforma
          </p>
          <p className="text-center text-muted-foreground">
            Explora la barra lateral para acceder a las herramientas disponibles
          </p>
        </div>
      </main>
    </>
  );
};
