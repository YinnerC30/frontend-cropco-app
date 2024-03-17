import { useEffect, useState } from 'react';
import { Payment, columns } from './columns-components';
import { DataTable } from '@/components/data-table/DataTable';
// import { DataTable } from './data-table';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: '1m@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: '2m@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: '3m@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: '4m@example.com',
    },
    // ...
  ];
}

const DemoPage = () => {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    getData().then(fetchedData => {
      setData(fetchedData);
    });
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default DemoPage;
