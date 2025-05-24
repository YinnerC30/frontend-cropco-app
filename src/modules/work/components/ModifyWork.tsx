import { useParams } from "react-router-dom";
import { z } from "zod";

import { formSchemaWork } from "../utils/formSchemaWork";

import { Loading } from "@/modules/core/components";

import { BreadCrumb } from "@/modules/core/components/";

import { usePatchWork } from "../hooks/mutations/usePatchWork";
import { useGetWork } from "../hooks/queries/useGetWork";
import { WorkDetail } from "../interfaces/WorkDetail";
import { MODULE_WORKS_PATHS } from "../routes/pathRoutes";
import FormWork from "./forms/work/FormWork";

export const ModifyWork: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetWork(id!);
  const { mutate, isPending } = usePatchWork(id!);

  const onSubmitWork = (values: z.infer<typeof formSchemaWork>) => {
    mutate({
      ...values,
      date: values.date.toISOString(),
      id,
      details: values.details.map(
        ({ payment_is_pending, ...rest }: WorkDetail) => ({
          ...rest,
          employee: { id: rest.employee.id },
        })
      ),
    });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_WORKS_PATHS.ViewAll, name: "Trabajos" }]}
        finalItem={`Modificar`}
      />

      <FormWork
        defaultValues={data}
        isSubmitting={isPending}
        onSubmit={onSubmitWork}
      />
    </>
  );
};
export default ModifyWork;
