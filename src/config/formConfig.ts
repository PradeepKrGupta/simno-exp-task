// src/config/formConfig.ts
export const defaultCellValues = {
    '4G': {
      cellType: 'LTE',
      duplexMode: 'FDD',
      band: 'n1',
      dlEarfcn: 300,
      ulEarfcn: 18300,
    },
    '5G': {
      cellType: '5G',
      duplexMode: 'FDD',
      band: 'n1',
      dlEarfcn: 42800,
      ulEarfcn: 39000,
      ssbNrArfcn: 39000,
    },
    '5G:NSA': {
      cellType: ['LTE', '5G'],
      duplexMode: 'FDD',
      band: 'n1',
      dlEarfcn: { '4G': 300, '5G': 42800 },
      ulEarfcn: { '4G': 18300, '5G': 39000 },
      ssbNrArfcn: 39000,
    },
  };
  
  export const ratTypeOptions = [
    { label: '4G', value: '4G' },
    { label: '5G:SA', value: '5G' },
    { label: '5G:NSA', value: '5G:NSA' },
  ];
  
  export const mobilityOptions = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];
  