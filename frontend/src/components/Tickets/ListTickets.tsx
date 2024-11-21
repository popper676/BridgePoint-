import React from 'react';
import CardBox from '../CardBox';
import ImageField from '../ImageField';
import dataFormatter from '../../helpers/dataFormatter';
import { saveFile } from '../../helpers/fileSaver';
import ListActionsPopover from '../ListActionsPopover';
import { useAppSelector } from '../../stores/hooks';
import { Pagination } from '../Pagination';
import LoadingSpinner from '../LoadingSpinner';

import { hasPermission } from '../../helpers/userPermissions';

type Props = {
  tickets: any[];
  loading: boolean;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
};

const ListTickets = ({
  tickets,
  loading,
  onEdit,
  onView,
  onDelete,
  currentPage,
  numPages,
  onPageChange,
}: Props) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const hasUpdatePermission = hasPermission(currentUser, 'UPDATE_TICKETS');

  const corners = useAppSelector((state) => state.style.corners);
  const bgColor = useAppSelector((state) => state.style.cardsColor);

  return (
    <>
      <div className='relative overflow-x-auto p-4 space-y-4'>
        {loading && <LoadingSpinner />}
        {!loading &&
          tickets.map((item) => (
            <CardBox
              hasTable
              isList
              key={item.id}
              className={'rounded shadow-none'}
            >
              <div
                className={`flex ${bgColor} ${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                }  dark:bg-dark-900  border  border-stone-300  items-center overflow-hidden`}
              >
                <div
                  className={
                    'flex-1 px-4 py-6 h-24 flex items-stretch divide-x-2  divide-stone-300   items-center overflow-hidden`}> dark:divide-dark-700 overflow-x-auto'
                  }
                  onClick={() => onView(item.id)}
                >
                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>EventName</p>
                    <p className={'line-clamp-2'}>{item.event_name}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>EventDate</p>
                    <p className={'line-clamp-2'}>
                      {dataFormatter.dateTimeFormatter(item.event_date)}
                    </p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>Price</p>
                    <p className={'line-clamp-2'}>{item.price}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs   text-gray-500 '}>Purchases</p>
                    <p className={'line-clamp-2'}>
                      {dataFormatter
                        .purchasesManyListFormatter(item.purchases)
                        .join(', ')}
                    </p>
                  </div>
                </div>
                <ListActionsPopover
                  onDelete={onDelete}
                  onView={onView}
                  onEdit={onEdit}
                  itemId={item.id}
                  pathEdit={`/tickets/tickets-edit/?id=${item.id}`}
                  pathView={`/tickets/tickets-view/?id=${item.id}`}
                  hasUpdatePermission={hasUpdatePermission}
                />
              </div>
            </CardBox>
          ))}
        {!loading && tickets.length === 0 && (
          <div className='col-span-full flex items-center justify-center h-40'>
            <p className=''>No data to display</p>
          </div>
        )}
      </div>
      <div className={'flex items-center justify-center my-6'}>
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          setCurrentPage={onPageChange}
        />
      </div>
    </>
  );
};

export default ListTickets;
