import { Button } from "@/components";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { useNavigate } from "react-router-dom";

interface Props {
  path: string;
  Icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  name: string;
}

export const ItemNavigate = ({ path, Icon, name }: Props) => {
  const navigate = useNavigate();
  return (
    <DropdownMenuItem asChild>
      <Button variant={"ghost"} onClick={() => navigate(path)}>
        <Icon className="w-full h-4 mr-2" /> {name}
      </Button>
    </DropdownMenuItem>
  );
};
