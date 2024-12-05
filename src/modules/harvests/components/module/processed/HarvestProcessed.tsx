import { Button } from '@/components/ui/button';

import { Loading } from '@/modules/core/components';

import { Badge, Input, ScrollArea, Separator, Textarea } from '@/components';
import { CalendarIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { FormatNumber } from '@/modules/core/helpers/formatting/FormatNumber';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { useGetHarvest } from '@/modules/harvests/hooks';
import { formFieldsHarvest } from '@/modules/harvests/utils';
import { FormHarvestProcessed } from './FormHarvestProcessed';
import { HarvestProcessedBreadCrumb } from './HarvestProcessedBreadCrumb';
import HarvestProcessedDataTable from './HarvestProcessedDataTable';

export const HarvestProcessed = () => {
  console.log('HarvestProcessed');
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetHarvest(id!);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <HarvestProcessedBreadCrumb />

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

        <FormHarvestProcessed id={id!} />

        <HarvestProcessedDataTable id={id!} />

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

        <Button className="mt-2" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </ScrollArea>
    </>
  );
};
export default HarvestProcessed;
