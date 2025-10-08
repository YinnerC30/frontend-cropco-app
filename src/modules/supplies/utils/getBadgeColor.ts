import { CategoriesUnitOfMeasure } from '../interfaces/UnitOfMeasure';

export const getBadgeColor = (cat: CategoriesUnitOfMeasure): string | null => {
  switch (cat) {
    case 'MASS':
      return 'zinc';
    case 'VOLUME':
      return 'blue';
    case 'LENGTH':
      return 'orange';

    default:
      return null;
  }
};
