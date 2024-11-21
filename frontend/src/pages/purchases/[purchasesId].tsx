import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/purchases/purchasesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditPurchases = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    user: '',

    ticket: '',

    purchase_date: new Date(),

    redeemed: false,

    organization: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { purchases } = useAppSelector((state) => state.purchases);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { purchasesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: purchasesId }));
  }, [purchasesId]);

  useEffect(() => {
    if (typeof purchases === 'object') {
      setInitialValues(purchases);
    }
  }, [purchases]);

  useEffect(() => {
    if (typeof purchases === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = purchases[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [purchases]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: purchasesId, data }));
    await router.push('/purchases/purchases-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit purchases')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit purchases'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='User' labelFor='user'>
                <Field
                  name='user'
                  id='user'
                  component={SelectField}
                  options={initialValues.user}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='Ticket' labelFor='ticket'>
                <Field
                  name='ticket'
                  id='ticket'
                  component={SelectField}
                  options={initialValues.ticket}
                  itemRef={'tickets'}
                  showField={'event_name'}
                ></Field>
              </FormField>

              <FormField label='PurchaseDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.purchase_date
                      ? new Date(
                          dayjs(initialValues.purchase_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, purchase_date: date })
                  }
                />
              </FormField>

              <FormField label='Redeemed' labelFor='redeemed'>
                <Field
                  name='redeemed'
                  id='redeemed'
                  component={SwitchField}
                ></Field>
              </FormField>

              {hasPermission(currentUser, 'READ_ORGANIZATIONS') && (
                <FormField label='organization' labelFor='organization'>
                  <Field
                    name='organization'
                    id='organization'
                    component={SelectField}
                    options={initialValues.organization}
                    itemRef={'organizations'}
                    showField={'name'}
                  ></Field>
                </FormField>
              )}

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/purchases/purchases-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditPurchases.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_PURCHASES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditPurchases;
