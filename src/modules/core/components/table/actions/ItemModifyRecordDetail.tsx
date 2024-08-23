import { Button } from "@/components";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Pencil2Icon } from "@radix-ui/react-icons";

export const ItemModifyRecordDetail = ({ setOpenDialog, children }: any) => {
  const handleModify = () => {
    setOpenDialog(true);
  };

  return (
    <DropdownMenuItem asChild>
      <>
        <Button variant="ghost" onClick={handleModify}>
          <Pencil2Icon className="w-full h-4 mr-2" /> Modificar
        </Button>
        {children}
      </>
    </DropdownMenuItem>
  );
};
