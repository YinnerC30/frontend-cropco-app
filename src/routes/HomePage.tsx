import { BreadCrumb } from '@/modules/core/components';
import React from 'react';

export const HomePage: React.FC = () => {
  return (
    <>
      <BreadCrumb finalItem={''} />
      <main className="h-[50vh] flex items-center justify-center">
        <div>
          <h1 className="mb-10 text-2xl font-bold text-center">
            Bienvenid@ a CropCo
          </h1>
          <p className="text-center text-muted-foreground">
            La aplicación donde podrá controlar la información de sus cultivos
          </p>
          <p className="text-center text-muted-foreground">
            Dale un vistazo a la barra lateral donde encontrarás las
            herramientas disponibles
          </p>
          <p className="my-2 text-center text-muted-foreground">
            O puedes intentar presionar{' '}
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘ + J</span>
            </kbd>
            <span> o </span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">CTRL + J</span>
            </kbd>
          </p>
        </div>
      </main>
    </>
  );
};
