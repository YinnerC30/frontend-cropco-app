export const shoppingTestData = {
  validShopping: {
    date: new Date().toISOString().split('T')[0],
    details: [
      {
        supplier: {
          id: 'test-supplier-id',
          full_name: 'Proveedor Test',
        },
        supply: {
          id: 'test-supply-id',
          name: 'Suministro Test',
          unit_of_measure: 'KG',
        },
        unit_of_measure: 'KG',
        amount: 10,
        value_pay: 1000,
      },
    ],
  },

  invalidShopping: {
    date: '',
    details: [],
  },

  suppliers: [
    {
      id: 'supplier-1',
      full_name: 'Proveedor ABC',
    },
    {
      id: 'supplier-2',
      full_name: 'Proveedor XYZ',
    },
  ],

  supplies: [
    {
      id: 'supply-1',
      name: 'Fertilizante NPK',
      unit_of_measure: 'KG',
    },
    {
      id: 'supply-2',
      name: 'Semillas de Maíz',
      unit_of_measure: 'KG',
    },
    {
      id: 'supply-3',
      name: 'Herbicida',
      unit_of_measure: 'L',
    },
  ],

  unitOfMeasures: {
    MASS: ['KG', 'G', 'LB'],
    VOLUME: ['L', 'ML', 'GAL'],
    LENGTH: ['M', 'CM', 'FT'],
  },
};
