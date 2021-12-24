import React, { ChangeEvent, useCallback } from 'react';
import { getProducts } from 'api';
import { ProductType } from 'api/types';

import { Button } from 'components/Button';
import { Image } from 'components/Image';
import { StyledLink } from 'components/StyledLink/StyledLink.style';

import { NavbarWrapper } from './Navbar.styles';

type NavbarProps = {
  productCb?: React.Dispatch<React.SetStateAction<ProductType[] | undefined>>;
};

export const Navbar = ({ productCb }: NavbarProps) => {
  const onFilter = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (productCb) {
      getProducts().then((data) => {
        productCb(data?.filter((value) => value.name.includes(event.target.value)));
      });
    }
  }, []);
  return (
    <NavbarWrapper>
      <StyledLink to="/">
        <Button>Главная</Button>
      </StyledLink>
      <Image src="http://abali.ru/wp-content/uploads/2013/03/Gerb_MGTU_imeni_Baumana.png"></Image>
      {productCb && (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginRight: '10px' }}>
          <input name="name" placeholder="Найти" onChange={onFilter}></input>
        </div>
      )}
    </NavbarWrapper>
  );
};
