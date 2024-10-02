import { getTokenToLocalStorage } from "@/modules/authentication/utils/getTokenToLocalStorage";
import axios from "axios";

export const cropcoAPI = axios.create({
  baseURL: `${import.meta.env.VITE_HOST_API_CROPCO}`,
  headers: {
    Authorization: `Bearer ${getTokenToLocalStorage()}`,
    "Content-Type": "application/json",
  },
});

export const pathsCropco = {
  users: "/users",
  crops: "/crops",
  clients: "/clients",
  employees: "/employees",
  suppliers: "/suppliers",
  supplies: "/supplies",
  harvests: "/harvest",
  harvestsProcessed: "/harvest/processed",
  harvestsStock: "/harvest/stock",
  sales: "/sales",
  works: "/works",
  payments: "/payments",
  authentication: "/auth",
  purchase: "supplies/purchase",
  consumption: "supplies/consumption",
};
