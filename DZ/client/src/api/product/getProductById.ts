import { ProductType } from 'api/types';

export const getProductById = async (id: number) => {
  const data = await fetch(`http://127.0.0.1:8000/product/${id}`, {
    headers: {
      'Content-Type': 'json/application',
    },
  });
  if (data.ok) {
    const parsedData: ProductType = await data.json();
    return parsedData;
  } else {
    return undefined;
  }
};
