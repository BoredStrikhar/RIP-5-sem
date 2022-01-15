import { ManufacturerType } from 'api/types';

export const addManufacturer = async (values: Partial<ManufacturerType>) => {
  const body = new FormData();
  for (const [key, value] of Object.entries(values)) {
    body.append(key, value.toString());
  }
  const data = await fetch('http://127.0.0.1:8000/manufacturer/', {
    method: 'POST',
    body: body,
  });
  if (data.ok) {
    return true;
  } else {
    return false;
  }
};
