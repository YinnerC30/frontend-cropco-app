interface Route {
  name: string;
  path: string;
}

export const routes: Route[] = [
  {
    name: "Usuarios",
    path: "users/view",
  },
  {
    name: "Empleados",
    path: "employees/view",
  },
  {
    name: "Cultivos",
    path: "crops/view",
  },
  {
    name: "Clientes",
    path: "clients/view",
  },
  {
    name: "Proveedores",
    path: "suppliers/view",
  },
  {
    name: "Insumos",
    path: "supplies/view",
  },
  {
    name: "Cosechas",
    path: "harvests/view",
  },
  {
    name: "Ventas",
    path: "sales/view",
  },
  {
    name: "Trabajos",
    path: "works/view",
  },
  {
    name: "Pagos",
    path: "payments/view",
  },
];
