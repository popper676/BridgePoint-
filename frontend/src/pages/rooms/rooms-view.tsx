import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/rooms/roomsSlice';
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

const RoomsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { rooms } = useAppSelector((state) => state.rooms);

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
        <title>{getPageTitle('View rooms')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View rooms')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>RoomName</p>
            <p>{rooms?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Description</p>
            {rooms.description ? (
              <p dangerouslySetInnerHTML={{ __html: rooms.description }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Price</p>
            <p>{rooms?.price || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Capacity</p>
            <p>{rooms?.capacity || 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Bookings</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Check-InDate</th>

                      <th>Check-OutDate</th>

                      <th>Confirmed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.bookings &&
                      Array.isArray(rooms.bookings) &&
                      rooms.bookings.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/bookings/bookings-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='check_in'>
                            {dataFormatter.dateTimeFormatter(item.check_in)}
                          </td>

                          <td data-label='check_out'>
                            {dataFormatter.dateTimeFormatter(item.check_out)}
                          </td>

                          <td data-label='confirmed'>
                            {dataFormatter.booleanFormatter(item.confirmed)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!rooms?.bookings?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          {hasPermission(currentUser, 'READ_ORGANIZATIONS') && (
            <div className={'mb-4'}>
              <p className={'block font-bold mb-2'}>organization</p>

              <p>{rooms?.organization?.name ?? 'No data'}</p>
            </div>
          )}

          <>
            <p className={'block font-bold mb-2'}>Bookings Room</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Check-InDate</th>

                      <th>Check-OutDate</th>

                      <th>Confirmed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.bookings_room &&
                      Array.isArray(rooms.bookings_room) &&
                      rooms.bookings_room.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/bookings/bookings-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='check_in'>
                            {dataFormatter.dateTimeFormatter(item.check_in)}
                          </td>

                          <td data-label='check_out'>
                            {dataFormatter.dateTimeFormatter(item.check_out)}
                          </td>

                          <td data-label='confirmed'>
                            {dataFormatter.booleanFormatter(item.confirmed)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!rooms?.bookings_room?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/rooms/rooms-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

RoomsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ROOMS'}>{page}</LayoutAuthenticated>
  );
};

export default RoomsView;
