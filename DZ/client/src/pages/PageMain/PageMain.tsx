import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from 'api';
import { ProductType } from 'api/types';

import { Card } from 'components/Card/Card';
import { Navbar } from 'components/Navbar/Navbar';

import { PageMainWrapper } from './PageMain.styles';

export const PageMain = (): JSX.Element => {
  const [products, setProducts] = useState<ProductType[]>();
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    getProducts().then((data) => {
      if (params.get('manf')) {
        const parsedData = data?.filter((elem) => {
          if (params.get('manf')) {
            return (
              elem.id_manufacturer === parseInt(params.get('manf') || '-1')
            );
          } else {
            return true;
          }
        });
        setProducts(parsedData);
      } else {
        if (params.get('productName')) {
          const parsedData = data?.filter((elem) => {
            if (params.get('productName')) {
              return elem.name.includes(params.get('productName') || '');
            } else {
              return true;
            }
          });
          setProducts(parsedData);
        } else {
          setProducts(data);
        }
      }
    });
  }, [params]);

  const onRemoveClick = useCallback((id: number) => {
    setProducts((prev) => prev?.filter((value) => value.pk !== id));
  }, []);

  return (
    <PageMainWrapper>
      <Navbar detailed onChange={setParams} />
      {products?.map((product) => (
        <Card
          key={product.pk}
          data={product}
          onRemove={() => onRemoveClick(product.pk)}
        />
      ))}
    </PageMainWrapper>
  );
};
