import { ManufacturerType } from 'api/types';

export type CountryCardProps = {
  data: ManufacturerType;
  onRemove?: () => void;
  detailed?: boolean;
};
