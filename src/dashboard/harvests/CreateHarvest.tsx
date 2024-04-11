import { ScrollArea } from '@/components/ui/scroll-area';
import { FormHarvest } from './FormHarvest';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export const CreateHarvest = () => {
  return (
    <>
      <Label className="text-2xl">Registro de cosecha</Label>
      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        <FormHarvest />
      </ScrollArea>
    </>
  );
};
