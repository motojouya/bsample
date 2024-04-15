/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthenticationError = {
  message: Scalars['String']['output'];
  userKey: Scalars['String']['output'];
};

export type Email = {
  email: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type EmailChangeReturn = RecordNotFoundError | User;

export type EmailInput = {
  email: Scalars['String']['input'];
};

export type LoginInput = {
  id: Scalars['ID']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  changeEmail: Maybe<EmailChangeReturn>;
  changePassword: Maybe<User>;
  changeUserInformation: Maybe<User>;
  login: Maybe<User>;
  register: Maybe<RegisterReturn>;
  sendEmail: Maybe<SendEmailReturn>;
  verifyEmail: Maybe<VerifyEmailReturn>;
};


export type MutationChangeEmailArgs = {
  input: EmailInput;
};


export type MutationChangePasswordArgs = {
  input: PasswordInput;
};


export type MutationChangeUserInformationArgs = {
  input: UserInput;
};


export type MutationLoginArgs = {
  input: InputMaybe<LoginInput>;
};


export type MutationRegisterArgs = {
  input: InputMaybe<RegisterInput>;
};


export type MutationSendEmailArgs = {
  input: InputMaybe<SendEmailInput>;
};


export type MutationVerifyEmailArgs = {
  input: InputMaybe<VerifyEmailInput>;
};

export type PasswordInput = {
  password: Scalars['String']['input'];
};

export type Query = {
  loginUser: Maybe<User>;
};

export type RecordAlreadyExistError = {
  data: Scalars['String']['output'];
  message: Scalars['String']['output'];
  table: Scalars['String']['output'];
};

export type RecordNotFoundError = {
  keys: Scalars['String']['output'];
  message: Scalars['String']['output'];
  table: Scalars['String']['output'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  register_session_id: Scalars['ID']['input'];
};

export type RegisterReturn = RecordNotFoundError | User;

export type SendEmailInput = {
  email: Scalars['String']['input'];
};

export type SendEmailReturn = RecordAlreadyExistError | Scalars['String']['output'];

export type User = {
  email: Email;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type UserInput = {
  name: Scalars['String']['input'];
};

export type VerifyEmailInput = {
  email: Scalars['String']['input'];
  email_pin: Email;
  register_session_id?: InputMaybe<Scalars['ID']['input']>;
};

export type VerifyEmailReturn = Scalars['Boolean']['output'] | RecordNotFoundError;

export type LoginMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { login: { id: string, name: string, email: { email: string } } | null };

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { changePassword: { id: string, name: string, email: { email: string } } | null };

export type ChangeUserInformationMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type ChangeUserInformationMutation = { changeUserInformation: { id: string, name: string, email: { email: string } } | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangeUserInformationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeUserInformation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeUserInformation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<ChangeUserInformationMutation, ChangeUserInformationMutationVariables>;