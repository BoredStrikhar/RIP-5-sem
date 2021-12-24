import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getProductById } from 'api';
import { ProductType } from 'api/types';

import { Card } from 'components/Card/Card';
import { Navbar } from 'components/Navbar/Navbar';

export const PageProduct = (): JSX.Element => {
  const [product, setproduct] = useState<ProductType>();
  const { id } = useParams();

  useEffect(() => {
    getProductById(parseInt(id || '0')).then((data) => {
      setproduct(data);
    });
  }, [id]);

  if (product) {
    return (
      <>
        <Navbar />
        <Card data={product} />
      </>
    );
  }
  return <></>;
};
