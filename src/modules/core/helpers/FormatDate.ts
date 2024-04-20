import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  date: string;
}
export const FormatDate = ({ date }: Props) => {
  return format(`${date}T00:00:00-05:00`, "PPP", { locale: es });
};
