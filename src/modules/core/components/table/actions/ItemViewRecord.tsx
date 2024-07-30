import { Button } from "@/components";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
}
export const ItemViewRecord = ({ id }: Props) => {
  const navigate = useNavigate();
  return (
    <DropdownMenuItem asChild>
      <Button variant={"ghost"} onClick={() => navigate(`../view/${id}`)}>
        <EyeOpenIcon className="w-full h-4 mr-2" /> Ver
      </Button>
    </DropdownMenuItem>
  );
};
