import {
  ErrorLoading,
  Loading,
  ToolTipTemplate,
} from "@/modules/core/components";

import {
  Button,
  Input,
  Label,
  ScrollArea,
  Separator,
  Textarea,
} from "@/components";
import { PlusIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetHarvest } from "../hooks/useGetHarvest";
import { DataTableHarvestProcessed } from "./DataTableHarvestProcessed";
import columnsHarvestProcessed from "./columns/ColumnsTableHarvestProcessed";
import { useState } from "react";

import { Harvest } from "../interfaces/Harvest";
import { CreateHarvestProcessed } from "./CreateHarvestProcessed";
import { es } from "date-fns/locale";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FormatMoneyValue } from "@/modules/core/helpers/FormatMoneyValue";
import { ModifyHarvestProcessed } from "./ModifyHarvestProcessed";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";

export const HarvestProcessedModule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data = {}, isLoading, isError } = useGetHarvest(id!);
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);
  const [isOpenDialogFormModify, setIsOpenDialogFormModify] = useState(false);
  const [harvestProcessed, setHarvestProcessed] = useState({});

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorLoading />;
  }

  return (
    <>
      <BreadCrumb
        items={[
          { link: "/harvests/all", name: "Cosechas" },
          {
            link: `/harvests/all/${data.id}`,
            name: `${data.crop.name} | ${format(data.date, "PPP", {
              locale: es,
            })}`,
          },
        ]}
        finalItem={`Inventario`}
      />
      <Label className="text-2xl">Inventario de la cosecha</Label>
      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        <div className="flex flex-col gap-2 ml-1">
          <div>
            <Label className="block mb-1">Fecha de la cosecha:</Label>

            <Button
              variant={"outline"}
              className={cn(
                "w-[200px] pl-3 text-left font-normal",
                !data.date && "text-muted-foreground"
              )}
              disabled
            >
              {data.date ? (
                format(`${data.date}T00:00:00-05:00`, "PPP", { locale: es })
              ) : (
                <span>Selecciona una fecha</span>
              )}
              <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
            </Button>
          </div>
          <div>
            <Label>Cultivo:</Label>
            <Input
              className="w-40 text-neutral-500"
              value={data.crop.name}
              readOnly
            />
          </div>

          <div>
            <Label>Total:</Label>
            <Input
              className="w-40 text-neutral-500"
              value={data.total}
              readOnly
            />
          </div>
          <div>
            <Label>Valor a pagar:</Label>
            <Input
              className="w-40 text-neutral-500"
              value={FormatMoneyValue(data.value_pay)}
              readOnly
            />
          </div>
          <div>
            <Label>Observación:</Label>
            <Textarea
              value={data.observation}
              className="resize-none w-80 text-neutral-500"
              rows={3}
              readOnly
            />
          </div>
        </div>
        <Separator className="my-4" />
        <Label>
          A continuación registre de forma individual la cosecha procesada que
          ha salido hasta el momento:
        </Label>
        <div className="flex items-start justify-between gap-2 w-[800px] p-1">
          <ToolTipTemplate content={"Agregar"}>
            <Button
              className="mt-2 bg-blue-600 rounded-full hover:bg-blue-400"
              onClick={() => setIsOpenDialogForm(true)}
            >
              <PlusIcon className="w-4 h-4 mr-2" /> Agregar
            </Button>
          </ToolTipTemplate>
          {isOpenDialogForm && (
            <CreateHarvestProcessed
              isOpenDialogForm={isOpenDialogForm}
              setIsOpenDialogForm={setIsOpenDialogForm}
              crop={{ id: data.crop.id }}
              harvest={{ id: data.id, date: data.date }}
            />
          )}
        </div>

        <DataTableHarvestProcessed
          data={
            data.processed
              ? data.processed.map((item: Harvest) => {
                  return {
                    ...item,
                    crop: data.crop,
                    harvest: { id: data.id, date: data.date },
                  };
                })
              : []
          }
          columns={columnsHarvestProcessed}
          setHarvestProcessed={setHarvestProcessed}
          setIsOpenDialogModifyForm={setIsOpenDialogFormModify}
        />

        {isOpenDialogFormModify && (
          <ModifyHarvestProcessed
            isOpenDialogForm={isOpenDialogFormModify}
            setIsOpenDialogForm={setIsOpenDialogFormModify}
            defaultValues={harvestProcessed}
          />
        )}

        <Button onClick={() => navigate(-1)}>Volver</Button>
      </ScrollArea>
    </>
  );
};
export default HarvestProcessedModule;
