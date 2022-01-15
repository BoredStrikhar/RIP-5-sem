import React, { useCallback, useEffect, useState } from 'react';
import { getManufacturer, getProducts } from 'api';
import { ManufacturerType } from 'api/types';

import { CountryCard } from 'components/ManufacturerCard';
import { Navbar } from 'components/Navbar/Navbar';

import { PageMainWrapper } from './PageManufacturers.styles';

export const PageCountries = (): JSX.Element => {
  const [manfs, setManf] = useState<ManufacturerType[]>();

  useEffect(() => {
    getManufacturer().then((data) => {
      getProducts().then((products) => {
        const parsedData = data?.filter(
          (elem) =>
            products?.filter((product) => product.id_manufacturer === elem.pk)
              .length,
        );
        setManf(parsedData);
      });
    });
  }, []);

  const onRemoveClick = useCallback((id: number) => {
    setManf((prev) => prev?.filter((value) => value.pk !== id));
  }, []);

  return (
    <PageMainWrapper>
      <Navbar />
      {manfs?.map((manf) => (
        <CountryCard
          key={manf.pk}
          data={manf}
          onRemove={() => onRemoveClick(manf.pk)}
        />
      ))}
    </PageMainWrapper>
  );
};
