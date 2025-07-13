import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function TabsEmployeeTables() {
  return (
    <Tabs defaultValue="harvests" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="harvests">Cosechas</TabsTrigger>
        <TabsTrigger value="works">Trabajos</TabsTrigger>
      </TabsList>
      <TabsContent value="harvests">{/* TODO: implementar */}</TabsContent>
      <TabsContent value="works">{/* TODO: implementar */}</TabsContent>
    </Tabs>
  );
}
