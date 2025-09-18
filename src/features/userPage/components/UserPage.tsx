import React, { useState } from 'react';
import UserTable from './UserTable';
import { Menu, MenuItem } from '@mui/material';
import { UserRow } from '@/entity/user';

const UserPage: React.FC<{ users: UserRow[] }> = ({ users }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    user: UserRow,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      console.log(`Deleting user: ${selectedUser.name}`);
      // ユーザー削除のロジックをここに追加
      handleCloseMenu();
    }
  };

  return (
    <div>
      <h1>ユーザ管理</h1>
      <UserTable rows={users} onOpenMenu={handleOpenMenu} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleDeleteUser} sx={{ color: 'red' }}>
          削除する
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserPage;
