import { ColumnDef } from '@tanstack/react-table';

import { User } from '../interfaces/User';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'first_name',
    header: 'nombre',
  },
  {
    accessorKey: 'last_name',
    header: 'apellido',
  },
  {
    accessorKey: 'email',
    header: 'correo electrónico',
  },
  {
    accessorKey: 'phone_number',
    header: 'número de teléfono',
  },
  {
    accessorKey: 'cell_phone_number',
    header: 'número celular',
  },
  {
    accessorKey: 'password',
    header: 'Contraseña',
  },
];

// export const columns2: ColumnDef<User>[] = [
//   {
//     header: 'Name',
//     footer: props => props.column.id,
//     columns: [
//       {
//         accessorKey: 'firstName',
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         accessorFn: row => row.lastName,
//         id: 'lastName',
//         cell: info => info.getValue(),
//         header: () => <span>Last Name</span>,
//         footer: props => props.column.id,
//       },
//     ],
//   },
//   {
//     header: 'Info',
//     footer: props => props.column.id,
//     columns: [
//       {
//         accessorKey: 'age',
//         header: () => 'Age',
//         footer: props => props.column.id,
//       },
//       {
//         header: 'More Info',
//         columns: [
//           {
//             accessorKey: 'visits',
//             header: () => <span>Visits</span>,
//             footer: props => props.column.id,
//           },
//           {
//             accessorKey: 'status',
//             header: 'Status',
//             footer: props => props.column.id,
//           },
//           {
//             accessorKey: 'progress',
//             header: 'Profile Progress',
//             footer: props => props.column.id,
//           },
//         ],
//       },
//     ],
//   },
// ];
