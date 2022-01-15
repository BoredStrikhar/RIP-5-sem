import { Colors } from 'constants/colors';

import React, { useCallback, useEffect, useState } from 'react';
import { getProducts, removeManufacturerById } from 'api';
import { ProductType } from 'api/types';
import { ReactComponent as IcClose } from 'assets/icons/close.svg';

import { Button } from 'components/Button';
import { StyledLink } from 'components/StyledLink/StyledLink.style';
import { Text } from 'components/Text';

import { CardNavbar } from './CardNavbar';
import { CardWrapper } from './ManufacturerCard.styles';
import { CountryCardProps } from './ManufacturerCard.types';
import { SmallCard } from './SmallCard';

export const CountryCard = ({
  data,
  onRemove,
  detailed,
}: CountryCardProps): JSX.Element => {
  const handleRemoveCard = useCallback(async () => {
    await removeManufacturerById(data.pk);
    if (onRemove) {
      onRemove();
    }
  }, []);

  const [products, setProducts] = useState<ProductType[]>();

  useEffect(() => {
    getProducts().then((value) => {
      if (value) {
        const parsedValue = value.filter(
          (element) => element.id_manufacturer === data.pk,
        );
        setProducts(parsedValue);
      }
    });
  }, []);

  return (
    <CardWrapper>
      <CardNavbar>
        <Button round onClick={handleRemoveCard}>
          <IcClose width={16} height={16} />
        </Button>
      </CardNavbar>
      <Text bold>{data.name}</Text>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {products && products.map((product) => <SmallCard data={product} />)}
      </div>
      {!detailed ? (
        <StyledLink to={`/manufacturer/${data.pk}`}>
          <Button
            backgroundColor={Colors.MAIN}
            backgroundHoverColor={Colors.MAIN_HOVERED}
          >
            Открыть
          </Button>
        </StyledLink>
      ) : (
        <StyledLink to={`/manufacturer/${data.pk}/edit`}>
          <Button
            backgroundColor={Colors.MAIN}
            backgroundHoverColor={Colors.MAIN_HOVERED}
          >
            Редактировать
          </Button>
        </StyledLink>
      )}
    </CardWrapper>
  );
};
