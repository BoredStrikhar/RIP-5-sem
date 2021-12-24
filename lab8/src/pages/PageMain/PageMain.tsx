import React, { useCallback, useEffect, useState } from 'react';
import { getProducts } from 'api';
import { ProductType } from 'api/types';

import { Card } from 'components/Card/Card';
import { Navbar } from 'components/Navbar/Navbar';

import { PageMainWrapper } from './PageMain.styles';

export const PageMain = (): JSX.Element => {
  const [products, setProducts] = useState<ProductType[]>();

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  const onRemoveClick = useCallback((id: number) => {
    setProducts((prev) => prev?.filter((value) => value.pk !== id));
  }, []);

  return (
    <PageMainWrapper>
      <Navbar productCb={setProducts} />
      {products?.map((product) => (
        <Card key={product.pk} data={product} hasButton onRemove={() => onRemoveClick(product.pk)} />
      ))}
    </PageMainWrapper>
  );
};
