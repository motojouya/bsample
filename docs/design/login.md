
# ログイン

## 対象機能
- ログイン
- ユーザ登録
- ユーザ設定

## メモ

## front
- トップページ  
  /app/page.tsx  
- ユーザ登録  
  /app/register/page.tsx
- 設定トップ  
  /app/setting/page.tsx  
  client component
- 個人情報編集
  /app/setting/information/page.tsx  
  client component
- password
  /app/setting/password/page.tsx  
  client component
- email
  /app/setting/email/page.tsx  
  client component
- login
  /app/login/page.tsx  

## api
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

## server
- resolver
- schema
  - user
  - user_email

