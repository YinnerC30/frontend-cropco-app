import { ErrorLoading } from '@/components/common/ErrorLoading';
import { Loading } from '@/components/common/Loading';
import { Button } from '@/components/ui/button';
import { getCropById } from '@/services/cropcoAPI';
import { zodResolver } from '@hookform/resolvers/zod';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { defaultValues, formSchema } from './ElementsCropForm';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

export const ViewCrop = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, data: dataCrop } = useQuery({
    queryKey: ['crops', id],
    queryFn: () => getCropById({ id }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (dataCrop) {
      form.reset({
        ...dataCrop,
        date_of_creation: new Date(
          `${dataCrop.date_of_creation}T00:00:00-05:00`,
        ),
        date_of_termination: new Date(
          `${dataCrop.date_of_termination}T00:00:00-05:00`,
        ),
      });
    }
  }, [dataCrop]);

  if (isLoading) return <Loading />;

  if (!dataCrop) return <ErrorLoading />;

  return (
    <div className="grid w-full h-full grid-cols-10 grid-rows-10">
      <div className="grid grid-cols-3 col-span-10 row-span-5 mx-5">
        <div className="flex flex-col">
          <div>
            <Label>Nombre:</Label>
            <Input value={dataCrop.name} className="w-40" />
          </div>
          <div>
            <Label>Descripción:</Label>
            <Input value={dataCrop.description} className="w-40" />
          </div>
          <div>
            <Label>N° Unidades:</Label>
            <Input value={dataCrop.units} className="w-40" />
          </div>
          <div>
            <Label>Localización:</Label>
            <Input value={dataCrop.location} className="w-52" />
          </div>
          <div>
            <Label>Fecha de creación:</Label>
            <Input
              value={format(dataCrop.date_of_creation, 'PPP', {
                locale: es,
              })}
              className="w-40"
            />
          </div>
          <div>
            <Label>Fecha de terminación:</Label>
            <Input
              value={format(dataCrop.date_of_termination, 'PPP', {
                locale: es,
              })}
              className="w-40"
            />
          </div>
          {/* <div>
            <Label className="mr-2">Cantidad por vender:</Label>
            {dataCrop.harvests_stock === null ? (
              <Badge>{0}</Badge>
            ) : (
              <Badge>{dataCrop.harvests_stock.total}</Badge>
            )}
          </div>
          <div>
            <Label className="mr-2">Cantidad cosechada:</Label>
            {dataCrop.harvests.length === 0 ? (
              <Badge>{0}</Badge>
            ) : (
              <Badge>{dataCrop.harvests[0].total}</Badge>
            )}
          </div> */}
        </div>
      </div>
      <div className="flex justify-between w-48 col-span-10 ml-5 row-start-10">
        <Button onClick={() => navigate(-1)}>Volver</Button>
      </div>
    </div>
  );
};
