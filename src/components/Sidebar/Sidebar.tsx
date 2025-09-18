import { FC } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, Box } from '@mui/material';
import { useRouter } from 'next/router';
import {
  Home as HomeIcon,
  // People as PeopleIcon,
  MailOutline as MailOutlineIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { BaseModal } from '@/components/BaseModal';
import { userPool } from '@/infra/aws/cognito';
import { useAuth } from '@/providers/AuthProvider';
import { useStyles } from '@/styles/style';
import { Role } from '@/entity/user';

export const Sidebar: FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const { role } = useAuth();
  const logout = () => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
      router.replace('/login');
    }
  };

  const sidebarList = () => (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          borderRight: '1px solid #e0e0e0',
          backgroundColor: '#f0f0f0',
        }}
      >
        <List>
          <Link href='/' passHref>
            <ListItemButton key='home'>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
            </ListItemButton>
          </Link>
          {/* <Link href='/user' passHref>
            <ListItemButton key='user'>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
            </ListItemButton>
          </Link> */}
          <Link href='/inquiry' passHref>
            <ListItemButton key='inquiry'>
              <ListItemIcon>
                <MailOutlineIcon />
              </ListItemIcon>
            </ListItemButton>
          </Link>
          {role === Role.OrgAdmin ? (
            <Link href='/settings' passHref>
              <ListItemButton key='settings'>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
              </ListItemButton>
            </Link>
          ) : null}
        </List>
        <Box sx={{ marginTop: 'auto' }}>
          <List>
            <BaseModal
              clickContent={
                <ListItemButton key='logout'>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                </ListItemButton>
              }
              modalText='ログアウトしますか？'
              executeButtonText='ログアウト'
              executeButtonColor='error'
              handleExecute={logout}
            />
          </List>
        </Box>
      </Box>
    </>
  );

  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{ paper: classes.drawerPaper }}
    >
      {sidebarList()}
    </Drawer>
  );
};
