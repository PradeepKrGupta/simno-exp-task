// src/utils/formUtils.ts
export const validateSectionData = (sectionName: string, data: any): boolean | string => {
    switch (sectionName) {
      case 'Cell':
        if (!data.ratType || !data.cellData) return 'Missing Cell Data';
        return true;
      case 'Subscriber':
        if (data.totalUEs <= 0) return 'Total UEs must be greater than zero';
        return true;
      // You can add additional validations for other sections as needed.
      default:
        return true;
    }
  };
  