import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { ErrorLoading, Loading } from "../../core/components";
import { useGetClient } from "../hooks/useGetClient";
import { usePatchClient } from "../hooks/usePatchClient";
import { formSchemaClient } from "../utils";
import { FormClient } from "./FormClient";

export const ModifyClient = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetClient(id!);
  const { mutate, isSuccess, isPending } = usePatchClient();
  const navigate = useNavigate();

  const onSubmit = (values: z.infer<typeof formSchemaClient>) => {
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
        items={[{ link: "/clients/all", name: "Clientes" }]}
        finalItem={`Modificar`}
      />

      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormClient
          onSubmit={onSubmit}
          isPending={isPending}
          defaultValues={{ ...data }}
        />
      </ScrollArea>
    </>
  );
};
