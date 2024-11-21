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

import {
  update,
  fetch,
} from '../../stores/socialmediadata/socialmediadataSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditSocialmediadata = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    organization: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { socialmediadata } = useAppSelector((state) => state.socialmediadata);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { socialmediadataId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: socialmediadataId }));
  }, [socialmediadataId]);

  useEffect(() => {
    if (typeof socialmediadata === 'object') {
      setInitialValues(socialmediadata);
    }
  }, [socialmediadata]);

  useEffect(() => {
    if (typeof socialmediadata === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = socialmediadata[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [socialmediadata]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: socialmediadataId, data }));
    await router.push('/socialmediadata/socialmediadata-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit socialmediadata')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit socialmediadata'}
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
                  onClick={() =>
                    router.push('/socialmediadata/socialmediadata-list')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditSocialmediadata.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_SOCIALMEDIADATA'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditSocialmediadata;
