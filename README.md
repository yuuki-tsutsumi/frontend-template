# frontend-template

- このプロジェクトは、bulletproof-reactのディレクトリ構成に準じています。

- Storybookを採用しています。src/components 配下でコンポーネントを作成した場合、stories.tsx を同ディレクトリに作成してください。試験的な運用のため、features 配下のコンポーネントやMUIのピュアコンポーネントで作成する必要はありません。

- MUI v6の仕様書は以下です。適宜参照してください。
  https://v6.mui.com/material-ui/getting-started/?_gl=1

# Next.js アプリの立ち上げ手順

このプロジェクトを実行するための手順は以下の通りです。

## 必要な環境

- Node.js（安定版: v20.19.2）
- Yarn（安定版: v1.12.12）

## 手順

1. **リポジトリのクローン**
   ```
   git clone https://github.com/yuuki-tsutsumi/frontend-template.git
   cd frontend-template
   ```
2. **.env.example を元に.env を作成**

   ```
   cp .env.example .env.local
   ```

3. **依存関係のインストール**
   ```
   yarn install
   ```
4. **開発サーバーの起動**

   ```
   yarn dev
   ```

## generate-api の実行手順

1. **backend-template リポジトリをクローン（初回のみ）**

   ```
   git clone https://github.com/yuuki-tsutsumi/backend-template.git
   cd backend-template
   ```

2. **セットアップ（初回のみ）**

   backend-template の README.md に従いセットアップを行う

3. **コンテナの立ち上げ**
   docker コンテナを立ち上げる

   ```
   make up
   ```

4. frontend-template で generate-api の実行

   ```
   yarn generate-api
   ```

## E2Eテストの実行手順

1. **環境変数の設定**
   .env.sampleを参考に記述してください。

2. **openapi.jsonの取得**
   backend-template のdockerコンテナを起動し, フロント側でスクリプトを実行

   ```
   # バックエンド
   make up
   ```

   ```
   # フロントエンド
   yarn get-openapi
   ```

3. **モックサーバーの起動**

   ```
   yarn mock-server
   ```

4. **E2Eテストの実行**

   ```
   yarn e2e:test
   ```
