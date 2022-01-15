import { ManufacturerType } from './ManufacturerType';

export type ProductType = {
  pk: number;
  name: string;
  price: number;
  weight: number;
  imgSrc: string;
  quantity: number;
  description?: string;
  id_manufacturer: number;
  manufacturer?: ManufacturerType;
};
