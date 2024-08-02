import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { ErrorLoading, Loading } from "../../core/components";

import { useGetSupplier } from "../hooks/useGetSupplier";
import { usePatchSupplier } from "../hooks/usePatchSupplier";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { formSchemaSupplier } from "../utils/formSchemaSupplier";
import { FormSupplier } from "./FormSupplier";

export const ModifySupplier = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSupplier(id!);
  const { mutate, isSuccess, isPending } = usePatchSupplier();
  const navigate = useNavigate();

  const onSubmit = (values: z.infer<typeof formSchemaSupplier>) => {
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
        items={[{ link: "/suppliers/all", name: "Proveedores" }]}
        finalItem={`Modificar`}
      />

      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormSupplier
          onSubmit={onSubmit}
          isPending={isPending}
          defaultValues={{ ...data, company_name: undefined }}
        />
      </ScrollArea>
    </>
  );
};
