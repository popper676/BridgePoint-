import React from 'react';
import BaseIcon from '../BaseIcon';
import { mdiEye, mdiTrashCan, mdiPencilOutline } from '@mdi/js';
import axios from 'axios';
import {
  GridActionsCellItem,
  GridRowParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import ImageField from '../ImageField';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import DataGridMultiSelect from '../DataGridMultiSelect';
import ListActionsPopover from '../ListActionsPopover';

import { hasPermission } from '../../helpers/userPermissions';

type Params = (id: string) => void;

export const loadColumns = async (
  onDelete: Params,
  onView: Params,
  onEdit: Params,
  entityName: string,

  user,
) => {
  async function callOptionsApi(entityName: string) {
    if (!hasPermission(user, 'READ_' + entityName.toUpperCase())) return [];

    try {
      const data = await axios(`/${entityName}/autocomplete?limit=100`);
      return data.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const hasUpdatePermission = hasPermission(user, 'UPDATE_PROMOTIONS');

  return [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: hasUpdatePermission,
    },

    {
      field: 'details',
      headerName: 'Details',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: hasUpdatePermission,
    },

    {
      field: 'start_date',
      headerName: 'StartDate',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: hasUpdatePermission,

      type: 'dateTime',
      valueGetter: (params: GridValueGetterParams) =>
        new Date(params.row.start_date),
    },

    {
      field: 'end_date',
      headerName: 'EndDate',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',

      editable: hasUpdatePermission,

      type: 'dateTime',
      valueGetter: (params: GridValueGetterParams) =>
        new Date(params.row.end_date),
    },

    {
      field: 'actions',
      type: 'actions',
      minWidth: 30,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      getActions: (params: GridRowParams) => {
        return [
          <ListActionsPopover
            onDelete={onDelete}
            onView={onView}
            onEdit={onEdit}
            itemId={params?.row?.id}
            pathEdit={`/promotions/promotions-edit/?id=${params?.row?.id}`}
            pathView={`/promotions/promotions-view/?id=${params?.row?.id}`}
            key={1}
            hasUpdatePermission={hasUpdatePermission}
          />,
        ];
      },
    },
  ];
};
