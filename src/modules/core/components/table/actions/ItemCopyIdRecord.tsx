import { Button } from "@/components";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

interface Props {
  id: string;
  setOpenDropDownMenu: (state: boolean) => void;
}

export const ItemCopyIdRecord = ({ id, setOpenDropDownMenu }: Props) => {
  return (
    <DropdownMenuItem asChild>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(id);
          setOpenDropDownMenu(false);
          toast.success("Id copiado al portapapeles");
        }}
        variant={"ghost"}
      >
        <PaperPlaneIcon className="w-4 h-4 mr-2" /> Copiar Id
      </Button>
    </DropdownMenuItem>
  );
};
