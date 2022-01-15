import { ManufacturerType } from 'api/types';

export const getManufacturerById = async (id: number) => {
  const data = await fetch(`http://127.0.0.1:8000/manufacturer/${id}`, {
    headers: {
      'Content-Type': 'json/application',
    },
  });
  if (data.ok) {
    const parsedData: ManufacturerType = await data.json();
    return parsedData;
  } else {
    return undefined;
  }
};
