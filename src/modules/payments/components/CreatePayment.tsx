import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

import { Separator } from "@/components/ui/separator";
import { BreadCrumb } from "@/modules/core/components/";
import { z } from "zod";
import { usePostPayment } from "../hooks/usePostPayment";
import { formSchemaPayments } from "../utils";
import { FormPayment } from "./forms/FormPayment";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { resetAll } from "../utils/paymentSlice";

export const CreatePayment = () => {
  const navigate = useNavigate();

  const { isSuccess, isPending, mutate } = usePostPayment();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetAll());
  }, []);

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
    navigate("../view/all");
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/payments/view/all", name: "Pagos" }]}
        finalItem={`Registro`}
      />

      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormPayment onSubmit={onSubmit} isSubmitting={isPending} />
      </ScrollArea>
    </>
  );
};
