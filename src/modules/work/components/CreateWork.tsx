import { ScrollArea, Separator } from "@/components";

import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { usePostWork } from "../hooks/usePostUser";
import { formSchemaWork } from "../utils/formSchemaWork";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";

import { WorkDetail } from "../interfaces/WorkDetail";
import { reset } from "../utils/workSlice";
import { FormWork } from "./form/FormWork";

export const CreateWork = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
  }, []);

  const { mutate, isSuccess, isPending } = usePostWork();

  const onSubmit = async (
    values: z.infer<typeof formSchemaWork>,
    total: number,
    details: WorkDetail[]
  ) => {
    mutate({
      ...values,
      total,
      details: details.map(({ id, ...rest }) => ({
        ...rest,
        employee: { id: rest.employee.id },
      })),
    });
  };

  if (isSuccess) {
    navigate("../view/all");
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/works/view/all", name: "Trabajos" }]}
        finalItem={`Registro`}
      />
      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormWork isSubmitting={isPending} onSubmit={onSubmit} />
      </ScrollArea>
    </>
  );
};
