import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ErrorLoading, Loading } from "@/modules/core/components";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { useParams } from "react-router-dom";
import { useGetSupply } from "../hooks/useGetSupply";
import { FormSupply } from "./FormSupply";

export const ViewSupply = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSupply(id!);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <ErrorLoading />;
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/supplies/view/all", name: "Insumos" }]}
        finalItem={`Información del insumo`}
      />
      <Label className="text-2xl">Información del insumo "{data.name}"</Label>
      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormSupply
          defaultValues={{
            ...data,
          }}
          readOnly
        />
      </ScrollArea>
    </>
  );
};
