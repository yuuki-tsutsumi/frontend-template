// TODO : 権限ごとで異なるitemを表示できるようにする

import { Box, Button, List, ListItem, ListItemText } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC, useState } from 'react';

type ItemPath = {
  item: string;
  path: string;
};

const adminSettingItems: ItemPath[] = [
  { item: 'サンプル', path: '/settings/sample' },
];

export type SettingSideListProps = {
  sideBarWidth?: number;
  sideListWidth: number;
};

export const SettingSideList: FC<SettingSideListProps> = ({
  sideListWidth,
}) => {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState<string>(pathname);
  return (
    <Box
      sx={{
        width: sideListWidth,
        minWidth: sideListWidth,
      }}
    >
      <List>
        <React.Fragment key={'settings'}>
          <ListItem>
            <ListItemText
              primary={'管理者設定'}
              primaryTypographyProps={{ fontSize: 14 }}
            />
          </ListItem>
          {adminSettingItems.map((item) => (
            <Link href={item.path} key={item.item}>
              <Button
                onClick={() => {
                  setSelectedItem(item.path);
                }}
                className={selectedItem === item.path ? 'selected' : ''}
                sx={{
                  width: '100%',
                  color: 'black',
                  bgcolor:
                    selectedItem === item.path
                      ? 'rgba(234, 244, 255, 0.8)'
                      : '',
                }}
              >
                <ListItem sx={{ height: 40, pl: 4 }}>
                  <ListItemText
                    primary={item.item}
                    primaryTypographyProps={{ fontSize: 16 }}
                  />
                </ListItem>
              </Button>
            </Link>
          ))}
        </React.Fragment>
      </List>
    </Box>
  );
};
