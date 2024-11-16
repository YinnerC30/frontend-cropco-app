import {
  ErrorLoading,
  Loading,
  ToolTipTemplate,
} from '@/modules/core/components';

import {
  Badge,
  Button,
  Input,
  Label,
  ScrollArea,
  Separator,
  Textarea,
} from '@/components';
import { CalendarIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetHarvest } from '../hooks/useGetHarvest';
import { DataTableHarvestProcessed } from './DataTableHarvestProcessed';
import columnsHarvestProcessed from './columns/ColumnsTableHarvestProcessed';

import { cn } from '@/lib/utils';
import { BreadCrumb } from '@/modules/core/components/BreadCrumb';
import { ConvertStringToDate } from '@/modules/core/helpers/conversion/ConvertStringToDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { FormatNumber } from '@/modules/core/helpers/formatting/FormatNumber';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Harvest } from '../interfaces/Harvest';
import { CreateHarvestProcessed } from './CreateHarvestProcessed';
import { ModifyHarvestProcessed } from './ModifyHarvestProcessed';
import { formFieldsHarvest } from '../utils';

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
          { link: '/harvests/view/all', name: 'Cosechas' },
          {
            link: `/harvests/view/${data.id}`,
            name: `${data.crop.name} | ${format(
              ConvertStringToDate(data.date),
              'PPP',
              {
                locale: es,
              }
            )}`,
          },
        ]}
        finalItem={`Inventario`}
      />

      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        <div className="flex flex-col gap-2 ml-1">
          <div>
            <h3 className="block mb-1">Fecha de la cosecha:</h3>

            <Button
              variant={'outline'}
              className={cn(
                'mt-2 w-[200px] pl-3 text-left font-normal',
                !data.date && 'text-muted-foreground'
              )}
              disabled
            >
              {data.date ? (
                format(`${data.date}T00:00:00-05:00`, 'PPP', { locale: es })
              ) : (
                <span>Selecciona una fecha</span>
              )}
              <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
            </Button>
            <p className="text-[0.8rem] text-muted-foreground">
              {formFieldsHarvest.date.description}
            </p>
          </div>
          <div>
            <h3>Cultivo:</h3>
            <Input
              className="w-40 mt-2 text-neutral-500"
              value={data.crop.name}
              readOnly
            />
            <p className="text-[0.8rem] text-muted-foreground">
              {formFieldsHarvest.crop.description}
            </p>
          </div>

          <div>
            <h3>Total:</h3>
            <Input
              className="w-40 mt-2 text-neutral-500"
              value={FormatNumber(data.total)}
              readOnly
            />
            <p className="text-[0.8rem] text-muted-foreground">
              {formFieldsHarvest.total.description}
            </p>
          </div>
          <div>
            <h3>Valor a pagar:</h3>
            <Input
              className="w-40 mt-2 text-neutral-500"
              value={FormatMoneyValue(data.value_pay)}
              readOnly
            />
            <p className="text-[0.8rem] text-muted-foreground">
              {formFieldsHarvest.value_pay.description}
            </p>
          </div>
          <div>
            <h3>Observación:</h3>
            <Textarea
              value={data.observation}
              className="resize-none w-80 text-neutral-500"
              placeholder="Ninguna"
              rows={3}
              readOnly
            />
            <p className="text-[0.8rem] text-muted-foreground">
              {formFieldsHarvest.observation.description}
            </p>
          </div>
        </div>

        <Separator className="my-4" />
        <h3>
          A continuación registre de forma individual la cosecha procesada que
          ha salido hasta el momento:
        </h3>
        <div className="flex items-start justify-between gap-2 w-[800px] p-1">
          <ToolTipTemplate content={'Agregar'}>
            <Button
              className="mt-2 bg-blue-600 rounded-full hover:bg-blue-400"
              onClick={() => setIsOpenDialogForm(true)}
              // disabled={data.total <= data.total_processed ? true : false}
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

        <div>
          <h3>Total de cosecha procesada:</h3>
          <Badge
            className="block h-8 text-base text-center w-28"
            variant={'cyan'}
          >
            {FormatNumber(data.total_processed)}
          </Badge>
          <p className="text-[0.8rem] text-muted-foreground">
            {formFieldsHarvest.total_processed.description}
          </p>
        </div>

        {isOpenDialogFormModify && (
          <ModifyHarvestProcessed
            isOpenDialogForm={isOpenDialogFormModify}
            setIsOpenDialogForm={setIsOpenDialogFormModify}
            defaultValues={harvestProcessed}
            harvest={{ id: data.id, date: data.date }}
          />
        )}

        <Button className="mt-2" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </ScrollArea>
    </>
  );
};
export default HarvestProcessedModule;
