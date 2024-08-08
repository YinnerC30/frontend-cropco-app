import { Pencil2Icon } from "@radix-ui/react-icons";
import { ItemNavigate } from "./ItemNavigate";

interface Props {
  id: string;
}

export const ItemModifyRecord = ({ id }: Props) => {
  return (
    <ItemNavigate
      path={`../modify/${id}`}
      Icon={Pencil2Icon}
      name={"Modificar"}
    />
  );
};
