import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getManufacturerById } from 'api';
import { ManufacturerType } from 'api/types';

import { CountryCard } from 'components/ManufacturerCard';
import { Navbar } from 'components/Navbar/Navbar';

import { PageCoutnryWrapper } from './PageManufacturer.styles';

export const PageCountry = (): JSX.Element => {
  const [man, setMan] = useState<ManufacturerType>();
  const { id } = useParams();

  useEffect(() => {
    getManufacturerById(parseInt(id || '0')).then((data) => {
      setMan(data);
    });
  }, [id]);

  if (man) {
    return (
      <PageCoutnryWrapper>
        <Navbar />
        <CountryCard data={man} detailed />
      </PageCoutnryWrapper>
    );
  }
  return <></>;
};
