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
    path: "users/all",
    Icon: <User />,
  },
  {
    name: "Empleados",
    path: "employees/all",
    Icon: <Contact />,
  },
  {
    name: "Cultivos",
    path: "crops/all",
    Icon: <Leaf />,
  },
  {
    name: "Clientes",
    path: "clients/all",
    Icon: <BookUser />,
  },
  {
    name: "Proveedores",
    path: "suppliers/all",
    Icon: <Blocks />,
  },
  {
    name: "Insumos",
    path: "supplies/all",
    Icon: <PillIcon />,
  },
  {
    name: "Cosechas",
    path: "harvests/all",
    Icon: <Tractor />,
  },
  {
    name: "Ventas",
    path: "sales/all",
    Icon: <CircleDollarSign />,
  },
  {
    name: "Trabajos",
    path: "works/all",
    Icon: <Pickaxe />,
  },
  {
    name: "Pagos",
    path: "payments/all",
    Icon: <CreditCard />,
  },
  {
    name: "Compras",
    path: "shopping/all",
    Icon: <ShoppingBagIcon />,
  },
  {
    name: "Consumos",
    path: "consumption/all",
    Icon: <Cable />,
  },
];
