// // src/utils/formUtils.ts

// // Basic validation functions; expand as needed.
// export const validateCellSection = (data: any): string | true => {
//   if (!data.ratType) return "RAT Type is required.";
//   // Add more validations as needed.
//   return true;
// };

// export const validateSubscriberSection = (data: any): string | true => {
//   if (data.totalUEs <= 0) return "Total UEs must be greater than zero.";
//   return true;
// };

// // Add further validators for other sections...



// ===================adding new code========

// src/utils/formUtils.ts

export const validateCellSection = (data: any): true | string => {
  if (!data.ratType) return "RAT Type is required.";
  if (!data.cellType) return "Cell Type is required.";
  if (!data.duplexMode) return "Duplex Mode is required.";
  if (!data.band) return "Band is required.";
  if (!data.dlEarfcn || data.dlEarfcn <= 0) return "DL EARFCN must be a positive number.";
  if (!data.ulEarfcn || data.ulEarfcn <= 0) return "UL EARFCN must be a positive number.";
  return true;
};

export const validateSubscriberSection = (data: any): true | string => {
  if (data.totalUEs <= 0) return "Total UEs must be greater than zero.";
  if (!data.startingSupi) return "Starting SUPI is required.";
  return true;
};

// You can add similar validators for userPlane, traffic, mobility, and settings.
