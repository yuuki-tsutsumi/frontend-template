import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/tests/utils/setup.ts'],
    exclude: ['node_modules/**', 'e2e/**'],
    coverage: {
      provider: 'v8',
      include: [
        'src/components/**/*.tsx', // UIコンポーネント
        'src/entity/**/*.tsx', // エンティティ
        'src/features/**/*.tsx', // 各機能のコンポーネント
        'src/hooks/**/*.ts', // カスタムフック
      ],
      exclude: [
        'src/pages/**', // Next.jsのページ
        'src/styles/**', // スタイル関連
        'src/**/*.test.ts', // テストファイル
        'src/**/*.test.tsx', // テストファイル
        'e2e/**', // E2Eテスト関連
      ],
      reportsDirectory: './coverage',
      reporter: ['text', 'html'],
    },
    server: {
      deps: {
        inline: ['@mui/x-data-grid'],
      },
    },
  },
});
