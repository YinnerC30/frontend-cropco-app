import { Button } from "@/components";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
}

export const ItemModifyRecord = ({ id }: Props) => {
  const navigate = useNavigate();
  return (
    <DropdownMenuItem asChild>
      <Button
        variant={"ghost"}
        onClick={() => navigate(`../modify/${id}`)}
      >
        <Pencil2Icon className="w-full h-4 mr-2" /> Modificar
      </Button>
    </DropdownMenuItem>
  );
};
