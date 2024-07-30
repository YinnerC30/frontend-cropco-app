import { Button } from "@/components";
import { SquarePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToolTipTemplate } from "./ToolTipTemplate";

export const ButtonCreateRecord = ({ route }: any) => {
  const navigate = useNavigate();
  return (
    <>
      <ToolTipTemplate content={"Crear"}>
        <Button
          className="bg-blue-600 rounded-full hover:bg-blue-400"
          onClick={() => navigate(route)}
        >
          <SquarePlus className="w-4 h-4 mr-2" /> Crear
        </Button>
      </ToolTipTemplate>
    </>
  );
};
