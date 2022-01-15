import { ProductType } from 'api/types';

export const updateProductById = async (
  id: number,
  values: Partial<ProductType>,
) => {
  const body = new FormData();
  for (const [key, value] of Object.entries(values)) {
    if (value) {
      body.append(key, value.toString());
    }
  }
  const data = await fetch(`http://127.0.0.1:8000/product/${id}`, {
    method: 'PUT',
    body: body,
  });
  if (data.ok) {
    return true;
  } else {
    return false;
  }
};
