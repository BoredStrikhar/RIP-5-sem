import { ProductType } from 'api/types';

export type CardProps = {
  data: ProductType;
  onRemove?: () => void;
  detailed?: boolean;
};
