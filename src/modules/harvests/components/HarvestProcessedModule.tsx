import {
  ErrorLoading,
  Loading,
  ToolTipTemplate,
} from "@/modules/core/components";

import { Button, Input, Label, Separator, Textarea } from "@/components";
import { PlusIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetHarvest } from "../hooks/useGetHarvest";
import { DataTableHarvestProcessed } from "./DataTableHarvestProcessed";
import columnsHarvestProcessed from "./ColumnsTableHarvestProcessed";
import { useState } from "react";

import { Harvest } from "../interfaces/Harvest";
import { CreateHarvestProcessed } from "./CreateHarvestProcessed";

export const HarvestProcessedModule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data = [], isLoading, isError } = useGetHarvest(id!);
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorLoading />;
  }

  console.log(data);
  return (
    <>
      <Label className="text-2xl">Inventario de la cosecha</Label>
      <Separator className="my-2" />
      <div className="flex gap-4">
        <div>
          <Label>Fecha:</Label>
          <Input className="w-40" value={data.date} readOnly />
        </div>
        <div>
          <Label>Cultivo:</Label>
          <Input className="w-40" value={data.crop.name} readOnly />
        </div>

        <div>
          <Label>Total:</Label>
          <Input className="w-40" value={data.total} readOnly />
        </div>
        <div>
          <Label>Valor a pagar:</Label>
          <Input className="w-40" value={data.value_pay} readOnly />
        </div>
        <div>
          <Label>Observación:</Label>
          <Textarea
            value={data.observation}
            className="resize-none w-80"
            rows={3}
            readOnly
          />
        </div>
      </div>
      <div className="flex items-start justify-between gap-2 w-[800px] p-1">
        <ToolTipTemplate content={"Agregar"}>
          <Button
            className="bg-blue-600 rounded-full hover:bg-blue-400"
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
            harvest={{ id: data.id }}
          />
        )}
      </div>
      <div className="w-[800px]">
        <DataTableHarvestProcessed
          data={
            data.processed
              ? [data.processed].map((item: Harvest) => {
                  return {
                    ...item,
                    crop: data.crop,
                    harvest: { id: data.id },
                  };
                })
              : []
          }
          columns={columnsHarvestProcessed}
        />
      </div>
      <div className="flex gap-2 my-6 ">
        <Button onClick={() => navigate(-1)}>Volver</Button>
      </div>
    </>
  );
};
export default HarvestProcessedModule;
