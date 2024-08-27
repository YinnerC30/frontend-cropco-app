import { Button } from "@/components";
import { ReloadIcon } from "@radix-ui/react-icons";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Button disabled>
        <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
        Cargando información
      </Button>
    </div>
  );
};
