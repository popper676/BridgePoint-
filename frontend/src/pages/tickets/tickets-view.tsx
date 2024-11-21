import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/tickets/ticketsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

import { hasPermission } from '../../helpers/userPermissions';

const TicketsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { tickets } = useAppSelector((state) => state.tickets);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View tickets')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View tickets')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>EventName</p>
            <p>{tickets?.event_name}</p>
          </div>

          <FormField label='EventDate'>
            {tickets.event_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  tickets.event_date
                    ? new Date(
                        dayjs(tickets.event_date).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No EventDate</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Price</p>
            <p>{tickets?.price || 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Purchases</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>PurchaseDate</th>

                      <th>Redeemed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.purchases &&
                      Array.isArray(tickets.purchases) &&
                      tickets.purchases.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/purchases/purchases-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='purchase_date'>
                            {dataFormatter.dateTimeFormatter(
                              item.purchase_date,
                            )}
                          </td>

                          <td data-label='redeemed'>
                            {dataFormatter.booleanFormatter(item.redeemed)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!tickets?.purchases?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          {hasPermission(currentUser, 'READ_ORGANIZATIONS') && (
            <div className={'mb-4'}>
              <p className={'block font-bold mb-2'}>organization</p>

              <p>{tickets?.organization?.name ?? 'No data'}</p>
            </div>
          )}

          <>
            <p className={'block font-bold mb-2'}>Purchases Ticket</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>PurchaseDate</th>

                      <th>Redeemed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.purchases_ticket &&
                      Array.isArray(tickets.purchases_ticket) &&
                      tickets.purchases_ticket.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/purchases/purchases-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='purchase_date'>
                            {dataFormatter.dateTimeFormatter(
                              item.purchase_date,
                            )}
                          </td>

                          <td data-label='redeemed'>
                            {dataFormatter.booleanFormatter(item.redeemed)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!tickets?.purchases_ticket?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/tickets/tickets-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

TicketsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_TICKETS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default TicketsView;
