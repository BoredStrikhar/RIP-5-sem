import { Colors } from 'constants/colors';

import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { removeProductById } from 'api';
import { ReactComponent as IcClose } from 'assets/icons/close.svg';

import { Button } from 'components/Button';
import { Image } from 'components/Image';
import { StyledLink } from 'components/StyledLink/StyledLink.style';
import { Text } from 'components/Text';

import { CardWrapper } from './Card.styles';
import { CardProps } from './Card.types';
import { CardNavbar } from './CardNavbar';

export const Card = ({ data, onRemove, detailed }: CardProps): JSX.Element => {
  const handleRemoveCard = useCallback(async () => {
    await removeProductById(data.pk);
    if (onRemove) {
      onRemove();
    }
  }, []);

  const navigator = useNavigate();

  const handleManfClick = useCallback(() => {
    const params = new URLSearchParams();
    params.append('manf', data.id_manufacturer.toString());
    navigator({ search: params.toString() });
  }, []);

  return (
    <CardWrapper>
      <CardNavbar>
        <Button round onClick={handleRemoveCard}>
          <IcClose width={16} height={16} />
        </Button>
      </CardNavbar>
      <Image src={data.imgSrc}></Image>
      <Text bold>{data.name}</Text>
      <Text>Количество: {data.quantity} шт.</Text>
      <Text>Стоимость: {data.price} руб.</Text>
      <Text>Вес: {data.weight} гр.</Text>
      {detailed && (
      <Text>Описание: {data.description}</Text>
      )}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Text style={{ paddingRight: '10px' }}>
          Показать: {data.manufacturer?.name}
        </Text>
        <Button
          backgroundColor={Colors.MAIN}
          backgroundHoverColor={Colors.MAIN_HOVERED}
          onClick={handleManfClick}
        >
          Перейти
        </Button>
      </div>
      {!detailed ? (
        <StyledLink to={`/product/${data.pk}`}>
          <Button
            backgroundColor={Colors.MAIN}
            backgroundHoverColor={Colors.MAIN_HOVERED}
          >
            Открыть
          </Button>
        </StyledLink>
      ) : (
        <StyledLink to={`/product/${data.pk}/edit`}>
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
