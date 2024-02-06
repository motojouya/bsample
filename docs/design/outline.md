
# design doc

## システム目的
toBシステムにおいて、消費者がなんらかの注文をし、それを受け付けることができるシステム。
どんな注文かは想定しないので、その部分は適当だが、利用者を想定した画面や、権限管理などは比較的しっかり目に作る

## 利用者
- 出店者
- 店舗管理者
- 消費者

## フォームイメージ
以下の順番で遷移するが、URLは変わらない感じ。
中には、メールの送達確認みたいなのを挟むかも

1. フォーム
2. 確認
3. 完了

## 画面
### 共通
- ログイン
  - 機能
  ?login=true
- ユーザ登録
  - フォーム
  - フォームだが、メール認証がある
  /registor
- 設定トップ
  /setting
- 個人情報編集
  - フォーム
  /setting/information
- プラン変更
  - フォーム
  /setting/plan
- パスワード変更
  - フォーム
  /setting/password
- メールアドレス変更
  - フォーム
  /setting/email

### 消費者
- 検索
  窓と結果は同じ画面
  /?search=<word>
- 店舗
  - 商品選択フォーム
  /<store-name>
- 購入履歴一覧
  /order_histories
- 購入履歴詳細
  /order_histories/<>

### 店舗管理者
- 店舗一覧
  /stores
- 店舗管理トップ
  /stores/<store-name>
- メニュー一覧
  /stores/<store-name>/menus
- メニュー編集
  /stores/<store-name>/menus/<menu-name>
- メンバー一覧
  /stores/<store-name>/members
- 注文履歴一覧
  /stores/<store-name>/order_histories
- 注文履歴詳細
  /stores/<store-name>/order_histories/<order-id>
- メンバー承諾画面（ランダムなパス発行）
  /stores/<store-name>/members/verify/<token>

### 出店者（店舗管理者の権限を含む）
- 店舗編集
  /stores/<store-name>/edit
  - 作成
  - 削除
- メンバー編集
  /stores/<store-name>/members/<member-name>
  - 追加
  - 削除
  - 権限変更

### サイドメニュー
- 検索画面
- 設定トップ
- 店舗一覧

## schema

- user
  - user_id(emailと同じ)
  - name
  - created_date
  - updated_date
- user_email
  - user_id
  - email
  - email_token
  - email_verifid
  - created_date
  - verified_date
- user_password
  - user_id
  - password
  - created_date
  - updated_date
- user_plan
  - user_id
  - plan
  - created_date
  - updated_date
- store
  - store_id
  - name
  - created_date
  - updated_date
- store_user
  - store_id
  - user_id
  - authority(owner,staff)
  - created_date
  - updated_date
- menu
  - store_id
  - menu_id
  - name
  - price
  - created_date
  - updated_date
- order
  - order_id
  - store_id
  - user_id
  - created_date
- order_detail
  - order_id
  - store_id
  - menu_id
  - quantity






