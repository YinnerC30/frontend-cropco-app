import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

import { Separator } from "@/components/ui/separator";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { z } from "zod";
import { usePostPayment } from "../hooks/usePostPayment";
import { formSchemaPayments } from "../utils";
import { FormPayment } from "./forms/FormPayment";

export const CreatePayment = () => {
  const navigate = useNavigate();

  const { isSuccess, isPending, mutate } = usePostPayment();

  const onSubmit = async (
    values: z.infer<typeof formSchemaPayments>,
    harvests: any,
    works: any,
    totalToPay: any
  ) => {
    mutate({
      ...values,
      total: totalToPay,
      categories: {
        harvests,
        works,
      },
    });
  };

  if (isSuccess) {
    navigate("../all");
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/payments/all", name: "Pagos" }]}
        finalItem={`Registro`}
      />

      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormPayment onSubmit={onSubmit} isPending={isPending} />
      </ScrollArea>
    </>
  );
};
