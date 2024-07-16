import { CreateConsumption } from "../components/CreateConsumption";
import { ModifyConsumption } from "../components/ModifyConsumption";
import ConsumptionModule from "../components/ConsumptionModule";
import { ViewConsumption } from "../components/ViewConsumption";

const consumptionRoutes = {
  path: "consumption",
  children: [
    {
      path: "view",
      element: <ConsumptionModule />,
    },
    {
      path: "create",
      element: <CreateConsumption />,
    },
    {
      path: "modify/:id",
      element: <ModifyConsumption />,
    },
    {
      path: "view/:id",
      element: <ViewConsumption />,
    },
  ],
};

export { consumptionRoutes };
