import { describe, test, expect } from 'vitest';
import { getRoleName, Role } from './user';

describe('getRoleName', () => {
  test('アプリ管理者', () => {
    expect(getRoleName(Role.AppAdmin)).toBe('アプリ管理者');
  });

  test('管理者', () => {
    expect(getRoleName(Role.OrgAdmin)).toBe('管理者');
  });

  test('メンバ', () => {
    expect(getRoleName(Role.Member)).toBe('メンバ');
  });

  test('"不明な役割', () => {
    // @ts-expect-error: 999 で良い
    expect(getRoleName(999)).toBe('不明な役割');
  });
});
