import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/users/usersSlice';
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

const UsersView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

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
        <title>{getPageTitle('View users')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View users')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>First Name</p>
            <p>{users?.firstName}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Last Name</p>
            <p>{users?.lastName}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Phone Number</p>
            <p>{users?.phoneNumber}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>E-Mail</p>
            <p>{users?.email}</p>
          </div>

          <FormField label='Disabled'>
            <SwitchField
              field={{ name: 'disabled', value: users?.disabled }}
              form={{ setFieldValue: () => null }}
              disabled
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Avatar</p>
            {users?.avatar?.length ? (
              <ImageField
                name={'avatar'}
                image={users?.avatar}
                className='w-20 h-20'
              />
            ) : (
              <p>No Avatar</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>App Role</p>

            <p>{users?.app_role?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Custom Permissions</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.custom_permissions &&
                      Array.isArray(users.custom_permissions) &&
                      users.custom_permissions.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/permissions/permissions-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='name'>{item.name}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!users?.custom_permissions?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          {hasPermission(currentUser, 'READ_ORGANIZATIONS') && (
            <div className={'mb-4'}>
              <p className={'block font-bold mb-2'}>Organizations</p>

              <p>{users?.organization?.name ?? 'No data'}</p>
            </div>
          )}

          <>
            <p className={'block font-bold mb-2'}>Bookings User</p>
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
                    {users.bookings_user &&
                      Array.isArray(users.bookings_user) &&
                      users.bookings_user.map((item: any) => (
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
              {!users?.bookings_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Feedback User</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Rating</th>

                      <th>Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.feedback_user &&
                      Array.isArray(users.feedback_user) &&
                      users.feedback_user.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/feedback/feedback-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='rating'>{item.rating}</td>

                          <td data-label='comments'>{item.comments}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!users?.feedback_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Purchases User</p>
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
                    {users.purchases_user &&
                      Array.isArray(users.purchases_user) &&
                      users.purchases_user.map((item: any) => (
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
              {!users?.purchases_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/users/users-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

UsersView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_USERS'}>{page}</LayoutAuthenticated>
  );
};

export default UsersView;
