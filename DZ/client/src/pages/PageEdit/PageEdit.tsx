import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Form } from 'react-final-form';
import { TailSpin } from 'react-loader-spinner';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { getManufacturer, getProductById, updateProductById } from 'api';
import { ProductType } from 'api/types';

import { Button } from 'components/Button';
import { CustomField } from 'components/fields/CustomField';
import { CustomSelector } from 'components/fields/CustomSelector';
import { Option } from 'components/fields/CustomSelector/CustomSeletor.types';
import { Navbar } from 'components/Navbar/Navbar';
import { StyledForm } from 'components/StyledForm/StyledForm.styles';
import { sleep } from 'utils/sleep';

import { InputWrapper } from './PageEdit.styles';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const PageEdit = () => {
  const [loading, setLoading] = useState(false);
  const [manfs, setManfs] = useState<Option[] | undefined>(undefined);
  const [initialValue, setInitialValue] = useState<
    | Record<string, string | number | Record<string, number | string>>
    | undefined
  >(undefined);

  const initialManf = useMemo(
    () => initialValue?.manufacturer as Option,
    [initialValue],
  );

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    getManufacturer().then(async (values) => {
      if (values) {
        await sleep(200);
        const options = values.map((val) => ({
          value: val.pk,
          label: val.name,
        }));
        setManfs(options);

        getProductById(parseInt(id || '0')).then(async (data) => {
          if (data) {
            await sleep(200);
            const formData = data as Record<
              string,
              string | number | Record<string, number | string>
            >;
            formData['manufacturer'] = {
              value: data.manufacturer?.pk || -1,
              label: data.manufacturer?.name || '',
            };
            setInitialValue(formData);
          }
        });
      }
      setLoading(false);
    });
  }, [id]);

  const onSubmit = useCallback(
    async (
      values: Record<string, string | Record<string, string | number>>,
    ) => {
      setLoading(true);

      if (!values['name']) {
        return { error: 'error' };
      }

      const { manufacturer, ...valuesWithoutOption } = values;
      const manufacturerId = manufacturer as Record<string, string | number>;
      const newValues: Partial<ProductType> = {
        ...valuesWithoutOption,
        id_manufacturer: manufacturerId['value'] as number,
      };
      console.log(JSON.stringify(newValues));

      return updateProductById(parseInt(id || '0'), newValues).then(
        async (value) => {
          if (value) {
            await sleep(2000);
          } else {
            console.error('Error while PUT hotel fetch');
          }
          setLoading(false);
          navigate('/');
        },
      );
    },
    [],
  );

  return (
    <>
      <Navbar />
      <Form
        onSubmit={onSubmit}
        initialValues={initialValue}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          return errors;
        }}
        render={({ submitting, form, handleSubmit }) =>
          loading ? (
            <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
              <TailSpin arialLabel="loading-indicator" />
            </div>
          ) : (
            <StyledForm
              onSubmit={async (event) => {
                await handleSubmit(event);
                form.reset();
              }}
            >
              <InputWrapper>
                <label htmlFor="name">Название</label>
                <CustomField
                  name="name"
                  type="text"
                  component="input"
                  placeholder="Название"
                  required
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="price">Стоимость</label>
                <CustomField
                  name="price"
                  type="text"
                  component="input"
                  placeholder="Стоимость"
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="imgSrc">Ссылка на изображение</label>
                <CustomField
                  name="imgSrc"
                  type="text"
                  component="input"
                  placeholder="Ссылка"
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="manufacturer">Производитель</label>
                <CustomSelector
                  name="manufacturer"
                  placeholder="Выберите..."
                  component="input"
                  options={manfs}
                  initialValue={initialManf}
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="weight">Вес</label>
                <CustomField
                  name="weight"
                  type="text"
                  component="input"
                  placeholder="Вес"
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="description">Описание</label>
                <CustomField
                  name="description"
                  type="text"
                  component="textarea"
                  placeholder="Описание..."
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="quantity">Количество</label>
                <CustomField
                  name="quantity"
                  type="text"
                  component="input"
                  placeholder="Количество"
                />
              </InputWrapper>
              <Button type="submit" disabled={submitting}>
                Обновить
              </Button>
            </StyledForm>
          )
        }
      />
    </>
  );
};
