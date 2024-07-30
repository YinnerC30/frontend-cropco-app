import { Button } from "@/components";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { TrashIcon } from "lucide-react";
interface Props {
  id: string;
  mutate: any;
  setOpenDropDownMenu: (state: boolean) => void;
}
export const ItemDeleteRecord = ({
  id,
  mutate,
  setOpenDropDownMenu,
}: Props) => {
  return (
    <DropdownMenuItem asChild>
      <Button
        onClick={() => {
          mutate(id);
          setOpenDropDownMenu(false);
        }}
        variant={"ghost"}
      >
        <TrashIcon className="w-4 h-4 mr-2" /> Eliminar
      </Button>
    </DropdownMenuItem>
  );
};
