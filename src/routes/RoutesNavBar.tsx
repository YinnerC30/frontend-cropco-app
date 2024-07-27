import {
  User,
  Contact,
  Leaf,
  BookUser,
  Blocks,
  PillIcon,
  Tractor,
  CircleDollarSign,
  Pickaxe,
  CreditCard,
  ShoppingBagIcon,
  Cable,
} from "lucide-react";

interface Route {
  name: string;
  path: string;
  Icon: any;
}

export const routes: Route[] = [
  {
    name: "Usuarios",
    path: "users/view",
    Icon: <User />,
  },
  {
    name: "Empleados",
    path: "employees/view",
    Icon: <Contact />,
  },
  {
    name: "Cultivos",
    path: "crops/view",
    Icon: <Leaf />,
  },
  {
    name: "Clientes",
    path: "clients/view",
    Icon: <BookUser />,
  },
  {
    name: "Proveedores",
    path: "suppliers/view",
    Icon: <Blocks />,
  },
  {
    name: "Insumos",
    path: "supplies/view",
    Icon: <PillIcon />,
  },
  {
    name: "Cosechas",
    path: "harvests/view",
    Icon: <Tractor />,
  },
  {
    name: "Ventas",
    path: "sales/view",
    Icon: <CircleDollarSign />,
  },
  {
    name: "Trabajos",
    path: "works/view",
    Icon: <Pickaxe />,
  },
  {
    name: "Pagos",
    path: "payments/view",
    Icon: <CreditCard />,
  },
  {
    name: "Compras",
    path: "shopping/view",
    Icon: <ShoppingBagIcon />,
  },
  {
    name: "Consumos",
    path: "consumption/view",
    Icon: <Cable/>,
  },
];
