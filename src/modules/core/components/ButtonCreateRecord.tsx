import { Button } from "@/components";
import { ToolTipTemplate } from "./ToolTipTemplate";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ButtonCreateRecord = ({ route }: any) => {
  const navigate = useNavigate();
  return (
    <>
      <ToolTipTemplate content={"Crear"}>
        <Button
          className="bg-blue-600 rounded-full hover:bg-blue-400"
          onClick={() => navigate(route)}
        >
          <PlusIcon className="w-4 h-4 mr-2" /> Crear
        </Button>
      </ToolTipTemplate>
    </>
  );
};
