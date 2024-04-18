import { GraphQLResolveInfo } from 'graphql';
import { DeepPartial } from 'utility-types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AnonymousUser = {
  __typename?: 'AnonymousUser';
  email: Scalars['String']['output'];
  register_session_id?: Maybe<Scalars['Int']['output']>;
};

export type AuthenticationError = {
  __typename?: 'AuthenticationError';
  message: Scalars['String']['output'];
  userKey: Scalars['String']['output'];
};

export type Email = {
  __typename?: 'Email';
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

export type MailSendError = {
  __typename?: 'MailSendError';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeEmail?: Maybe<EmailChangeReturn>;
  changePassword?: Maybe<User>;
  changeUserInformation?: Maybe<User>;
  login?: Maybe<User>;
  register?: Maybe<RegisterReturn>;
  sendEmail?: Maybe<SendEmailReturn>;
  verifyEmail?: Maybe<VerifyEmailReturn>;
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
  input?: InputMaybe<LoginInput>;
};


export type MutationRegisterArgs = {
  input?: InputMaybe<RegisterInput>;
};


export type MutationSendEmailArgs = {
  input?: InputMaybe<SendEmailInput>;
};


export type MutationVerifyEmailArgs = {
  input?: InputMaybe<VerifyEmailInput>;
};

export type PasswordInput = {
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  loginUser?: Maybe<User>;
};

export type RecordAlreadyExistError = {
  __typename?: 'RecordAlreadyExistError';
  message: Scalars['String']['output'];
};

export type RecordNotFoundError = {
  __typename?: 'RecordNotFoundError';
  message: Scalars['String']['output'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  register_session_id?: InputMaybe<Scalars['Int']['input']>;
};

export type RegisterReturn = RecordNotFoundError | User;

export type SendEmailInput = {
  email: Scalars['String']['input'];
};

export type SendEmailReturn = AnonymousUser | MailSendError | RecordAlreadyExistError;

export type User = {
  __typename?: 'User';
  email_information: Email;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type UserInput = {
  name: Scalars['String']['input'];
};

export type VerifyEmailInput = {
  email: Scalars['String']['input'];
  email_pin: Scalars['Int']['input'];
  register_session_id?: InputMaybe<Scalars['Int']['input']>;
};

export type VerifyEmailReturn = Email | RecordNotFoundError;



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = {
  EmailChangeReturn: ( DeepPartial<RecordNotFoundError> ) | ( DeepPartial<User> );
  RegisterReturn: ( DeepPartial<RecordNotFoundError> ) | ( DeepPartial<User> );
  SendEmailReturn: ( DeepPartial<AnonymousUser> ) | ( DeepPartial<MailSendError> ) | ( DeepPartial<RecordAlreadyExistError> );
  VerifyEmailReturn: ( DeepPartial<Email> ) | ( DeepPartial<RecordNotFoundError> );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AnonymousUser: ResolverTypeWrapper<DeepPartial<AnonymousUser>>;
  AuthenticationError: ResolverTypeWrapper<DeepPartial<AuthenticationError>>;
  Boolean: ResolverTypeWrapper<DeepPartial<Scalars['Boolean']['output']>>;
  Email: ResolverTypeWrapper<DeepPartial<Email>>;
  EmailChangeReturn: DeepPartial<ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['EmailChangeReturn']>>;
  EmailInput: ResolverTypeWrapper<DeepPartial<EmailInput>>;
  ID: ResolverTypeWrapper<DeepPartial<Scalars['ID']['output']>>;
  Int: ResolverTypeWrapper<DeepPartial<Scalars['Int']['output']>>;
  LoginInput: ResolverTypeWrapper<DeepPartial<LoginInput>>;
  MailSendError: ResolverTypeWrapper<DeepPartial<MailSendError>>;
  Mutation: ResolverTypeWrapper<{}>;
  PasswordInput: ResolverTypeWrapper<DeepPartial<PasswordInput>>;
  Query: ResolverTypeWrapper<{}>;
  RecordAlreadyExistError: ResolverTypeWrapper<DeepPartial<RecordAlreadyExistError>>;
  RecordNotFoundError: ResolverTypeWrapper<DeepPartial<RecordNotFoundError>>;
  RegisterInput: ResolverTypeWrapper<DeepPartial<RegisterInput>>;
  RegisterReturn: DeepPartial<ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['RegisterReturn']>>;
  SendEmailInput: ResolverTypeWrapper<DeepPartial<SendEmailInput>>;
  SendEmailReturn: DeepPartial<ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SendEmailReturn']>>;
  String: ResolverTypeWrapper<DeepPartial<Scalars['String']['output']>>;
  User: ResolverTypeWrapper<DeepPartial<User>>;
  UserInput: ResolverTypeWrapper<DeepPartial<UserInput>>;
  VerifyEmailInput: ResolverTypeWrapper<DeepPartial<VerifyEmailInput>>;
  VerifyEmailReturn: DeepPartial<ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['VerifyEmailReturn']>>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AnonymousUser: DeepPartial<AnonymousUser>;
  AuthenticationError: DeepPartial<AuthenticationError>;
  Boolean: DeepPartial<Scalars['Boolean']['output']>;
  Email: DeepPartial<Email>;
  EmailChangeReturn: DeepPartial<ResolversUnionTypes<ResolversParentTypes>['EmailChangeReturn']>;
  EmailInput: DeepPartial<EmailInput>;
  ID: DeepPartial<Scalars['ID']['output']>;
  Int: DeepPartial<Scalars['Int']['output']>;
  LoginInput: DeepPartial<LoginInput>;
  MailSendError: DeepPartial<MailSendError>;
  Mutation: {};
  PasswordInput: DeepPartial<PasswordInput>;
  Query: {};
  RecordAlreadyExistError: DeepPartial<RecordAlreadyExistError>;
  RecordNotFoundError: DeepPartial<RecordNotFoundError>;
  RegisterInput: DeepPartial<RegisterInput>;
  RegisterReturn: DeepPartial<ResolversUnionTypes<ResolversParentTypes>['RegisterReturn']>;
  SendEmailInput: DeepPartial<SendEmailInput>;
  SendEmailReturn: DeepPartial<ResolversUnionTypes<ResolversParentTypes>['SendEmailReturn']>;
  String: DeepPartial<Scalars['String']['output']>;
  User: DeepPartial<User>;
  UserInput: DeepPartial<UserInput>;
  VerifyEmailInput: DeepPartial<VerifyEmailInput>;
  VerifyEmailReturn: DeepPartial<ResolversUnionTypes<ResolversParentTypes>['VerifyEmailReturn']>;
};

export type AnonymousUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnonymousUser'] = ResolversParentTypes['AnonymousUser']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  register_session_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthenticationErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthenticationError'] = ResolversParentTypes['AuthenticationError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmailResolvers<ContextType = any, ParentType extends ResolversParentTypes['Email'] = ResolversParentTypes['Email']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmailChangeReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['EmailChangeReturn'] = ResolversParentTypes['EmailChangeReturn']> = {
  __resolveType: TypeResolveFn<'RecordNotFoundError' | 'User', ParentType, ContextType>;
};

export type MailSendErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['MailSendError'] = ResolversParentTypes['MailSendError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  changeEmail?: Resolver<Maybe<ResolversTypes['EmailChangeReturn']>, ParentType, ContextType, RequireFields<MutationChangeEmailArgs, 'input'>>;
  changePassword?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'input'>>;
  changeUserInformation?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationChangeUserInformationArgs, 'input'>>;
  login?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationLoginArgs>>;
  register?: Resolver<Maybe<ResolversTypes['RegisterReturn']>, ParentType, ContextType, Partial<MutationRegisterArgs>>;
  sendEmail?: Resolver<Maybe<ResolversTypes['SendEmailReturn']>, ParentType, ContextType, Partial<MutationSendEmailArgs>>;
  verifyEmail?: Resolver<Maybe<ResolversTypes['VerifyEmailReturn']>, ParentType, ContextType, Partial<MutationVerifyEmailArgs>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  loginUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type RecordAlreadyExistErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecordAlreadyExistError'] = ResolversParentTypes['RecordAlreadyExistError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecordNotFoundErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecordNotFoundError'] = ResolversParentTypes['RecordNotFoundError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisterReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterReturn'] = ResolversParentTypes['RegisterReturn']> = {
  __resolveType: TypeResolveFn<'RecordNotFoundError' | 'User', ParentType, ContextType>;
};

export type SendEmailReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendEmailReturn'] = ResolversParentTypes['SendEmailReturn']> = {
  __resolveType: TypeResolveFn<'AnonymousUser' | 'MailSendError' | 'RecordAlreadyExistError', ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email_information?: Resolver<ResolversTypes['Email'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifyEmailReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyEmailReturn'] = ResolversParentTypes['VerifyEmailReturn']> = {
  __resolveType: TypeResolveFn<'Email' | 'RecordNotFoundError', ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AnonymousUser?: AnonymousUserResolvers<ContextType>;
  AuthenticationError?: AuthenticationErrorResolvers<ContextType>;
  Email?: EmailResolvers<ContextType>;
  EmailChangeReturn?: EmailChangeReturnResolvers<ContextType>;
  MailSendError?: MailSendErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RecordAlreadyExistError?: RecordAlreadyExistErrorResolvers<ContextType>;
  RecordNotFoundError?: RecordNotFoundErrorResolvers<ContextType>;
  RegisterReturn?: RegisterReturnResolvers<ContextType>;
  SendEmailReturn?: SendEmailReturnResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  VerifyEmailReturn?: VerifyEmailReturnResolvers<ContextType>;
};

