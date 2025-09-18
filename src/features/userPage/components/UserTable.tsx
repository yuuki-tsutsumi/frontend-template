import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getRoleName, Role, UserRow } from '@/entity/user';
import Dropdown from './Dropdown';

type UserTableProps = {
  rows: UserRow[];
  onOpenMenu: (event: React.MouseEvent<HTMLElement>, user: UserRow) => void;
};

const UserTable: React.FC<UserTableProps> = ({ rows, onOpenMenu }) => {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'ユーザ名',
      width: 150,
      headerAlign: 'center',
    },
    { field: 'email', headerName: 'Email', width: 200, headerAlign: 'center' },
    {
      field: 'role',
      headerName: '役割',
      renderCell: (params) => (
        <Dropdown
          options={Object.values(Role)}
          getName={getRoleName}
          currentValue={params.row.role}
          onUpdate={async (newRole) => {
            console.log(`Updating role to ${newRole}`);
          }}
        />
      ),
      headerAlign: 'center',
    },
    {
      field: 'action',
      headerName: '',
      width: 50,
      headerAlign: 'center',
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <span
            style={{ cursor: 'pointer', color: 'black' }}
            onClick={(event) => onOpenMenu(event, params.row)}
          >
            •••
          </span>
        </div>
      ),
    },
  ];

  return <DataGrid rows={rows} columns={columns} checkboxSelection />;
};

export default UserTable;
