import { Button } from "@/components";
import { ButtonCancelRegister } from "./ButtonCancelRegister";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

interface Props {
  isPending: boolean;
  formId: string;
  className: string;
}

export const ButtonsForm = ({ isPending, formId, className }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={className}>
      <ButtonCancelRegister action={() => navigate(-1)} />
      <Button type="submit" form={formId} disabled={isPending}>
        {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
        Guardar
      </Button>
    </div>
  );
};
