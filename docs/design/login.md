
# ログイン

## 対象機能
- ログイン
- ユーザ登録
- ユーザ設定

## メモ

## front
- header
  - top page link
  - 以下のどちらか
    - login page link
    - user setting link
- トップページ  
  /app/page.tsx  
  - 検索フォーム
    - 検索窓
    - 実行ボタン
  - 検索結果
    - 店舗へのリンク
- login  
  /app/login/page.tsx  
  - login form
    - email text
    - password text
    - submit botton
  - register link
- ユーザ登録  
  /app/register/page.tsx  
  - フォーム
    - email
    - email verify botton
    - password
    - name
    - submit botton
  - login link
- 設定トップ  
  /app/setting/page.tsx  
  client component  
  - top page link
  - name edit link
  - email edit link
  - password edit link
- 個人情報編集  
  /app/setting/information/page.tsx  
  client component  
  - フォーム
    - name
    - submit botton
  - user setting link
- password  
  /app/setting/password/page.tsx  
  client component  
  - フォーム
    - password
    - submit botton
  - user setting link
- email  
  /app/setting/email/page.tsx  
  client component  
  - フォーム
    - email
    - email verify botton
    - submit botton
  - user setting link

## api
```
type User {}
type Email {}
type Mutation {
  register
  login
  changeUserInformation
  changeEmail
  changePassword
}
type Query {
  loginUser
}
```

## server
- resolver
- schema
  - user
  - user_email

