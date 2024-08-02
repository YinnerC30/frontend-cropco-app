import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ErrorLoading, Loading } from "@/modules/core/components";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { UnitOfMeasure } from "@/modules/supplies/interfaces/UnitOfMeasure";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useGetSupply } from "../hooks/useGetSupply";
import { usePatchSupply } from "../hooks/usePatchSupply";
import { formSchemaSupply } from "../utils";
import { FormSupply } from "./FormSupply";

export const ModifySupply = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSupply(id!);
  const { mutate, isSuccess, isPending } = usePatchSupply();
  const navigate = useNavigate();

  const onSubmit = (values: z.infer<typeof formSchemaSupply>) => {
    mutate({ id, ...values });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <ErrorLoading />;
  }

  if (isSuccess) {
    navigate("../all");
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/supplies/all", name: "Insumos" }]}
        finalItem={`Modificar`}
      />
      <Label className="text-2xl">Actualizar insumo</Label>
      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormSupply
          onSubmit={onSubmit}
          isPending={isPending}
          defaultValues={{
            ...data,
            unit_of_measure:
              UnitOfMeasure[data.unit_of_measure as keyof typeof UnitOfMeasure],
          }}
        />
      </ScrollArea>
    </>
  );
};
