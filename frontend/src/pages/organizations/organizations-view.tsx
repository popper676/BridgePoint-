import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/organizations/organizationsSlice';
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

const OrganizationsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { organizations } = useAppSelector((state) => state.organizations);

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
        <title>{getPageTitle('View organizations')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View organizations')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{organizations?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Users Organizations</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-Mail</th>

                      <th>Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.users_organization &&
                      Array.isArray(organizations.users_organization) &&
                      organizations.users_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.users_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Bookings organization</p>
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
                    {organizations.bookings_organization &&
                      Array.isArray(organizations.bookings_organization) &&
                      organizations.bookings_organization.map((item: any) => (
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
              {!organizations?.bookings_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Feedback organization</p>
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
                    {organizations.feedback_organization &&
                      Array.isArray(organizations.feedback_organization) &&
                      organizations.feedback_organization.map((item: any) => (
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
              {!organizations?.feedback_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Promotions organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>

                      <th>StartDate</th>

                      <th>EndDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.promotions_organization &&
                      Array.isArray(organizations.promotions_organization) &&
                      organizations.promotions_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/promotions/promotions-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='title'>{item.title}</td>

                          <td data-label='start_date'>
                            {dataFormatter.dateTimeFormatter(item.start_date)}
                          </td>

                          <td data-label='end_date'>
                            {dataFormatter.dateTimeFormatter(item.end_date)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.promotions_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Purchases organization</p>
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
                    {organizations.purchases_organization &&
                      Array.isArray(organizations.purchases_organization) &&
                      organizations.purchases_organization.map((item: any) => (
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
              {!organizations?.purchases_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Rooms organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>RoomName</th>

                      <th>Price</th>

                      <th>Capacity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.rooms_organization &&
                      Array.isArray(organizations.rooms_organization) &&
                      organizations.rooms_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/rooms/rooms-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='price'>{item.price}</td>

                          <td data-label='capacity'>{item.capacity}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.rooms_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Tickets organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>EventName</th>

                      <th>EventDate</th>

                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.tickets_organization &&
                      Array.isArray(organizations.tickets_organization) &&
                      organizations.tickets_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/tickets/tickets-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='event_name'>{item.event_name}</td>

                          <td data-label='event_date'>
                            {dataFormatter.dateTimeFormatter(item.event_date)}
                          </td>

                          <td data-label='price'>{item.price}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.tickets_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Socialmediadata organization
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    {organizations.socialmediadata_organization &&
                      Array.isArray(
                        organizations.socialmediadata_organization,
                      ) &&
                      organizations.socialmediadata_organization.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/socialmediadata/socialmediadata-view/?id=${item.id}`,
                              )
                            }
                          ></tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.socialmediadata_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Revenue organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    {organizations.revenue_organization &&
                      Array.isArray(organizations.revenue_organization) &&
                      organizations.revenue_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/revenue/revenue-view/?id=${item.id}`)
                          }
                        ></tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.revenue_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/organizations/organizations-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

OrganizationsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ORGANIZATIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default OrganizationsView;
