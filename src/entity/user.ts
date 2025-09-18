export type User = {
  email: string;
  name: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  version: number;
};

export type UserRow = {
  id: number;
  name: string;
  email: string;
  role: string;
};

// 役割
export const Role = {
  AppAdmin: 'app_admin', // アプリ管理者
  OrgAdmin: 'org_admin', // 管理者(組織単位)
  Member: 'member', // メンバ
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export function getRoleName(role: Role): string {
  switch (role) {
    case Role.AppAdmin:
      return 'アプリ管理者';
    case Role.OrgAdmin:
      return '管理者';
    case Role.Member:
      return 'メンバ';
    default:
      return '不明な役割';
  }
}

export type RoleName = ReturnType<typeof getRoleName>;
