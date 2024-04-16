/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation Login($id: ID!, $password: String!) {\n    login(input: { id: $id, password: $password }) {\n      id\n      name\n      email {\n        email\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register($registerSessionId: ID!, $name: String!, $email: String!, $password: String!) {\n    register(input: { register_session_id: $registerSessionId, name: $name, email: $email, password: $password }) {\n      ... on User {\n        id\n        name\n        email {\n          email\n        }\n      }\n      ... on RecordNotFoundError {\n        table\n        keys\n        message\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation SendEmailRegisterSession($email: String!) {\n    sendEmail(input: { email: $email }) {\n      ... on AnonymousUser {\n        register_session_id\n        email\n      }\n      ... on RecordAlreadyExistError {\n        table\n        data\n        message\n      }\n    }\n  }\n": types.SendEmailRegisterSessionDocument,
    "\n  mutation VerifyEmailRegisterSession($registerSessionId: ID, $email: String!, $emailPin: String!) {\n    verifyEmail(input: { register_session_id: $registerSessionId, email: $email, email_pin: $emailPin }) {\n      ... on Email {\n        email\n        verified\n      }\n      ... on RecordNotFoundError {\n        table\n        keys\n        message\n      }\n    }\n  }\n": types.VerifyEmailRegisterSessionDocument,
    "\n  mutation ChangeEmail($email: String!) {\n    changeEmail(input: { email: $email }) {\n      ... on User {\n        id\n        name\n        email {\n          email\n        }\n      }\n      ... on RecordNotFoundError {\n        table\n        keys\n        message\n      }\n    }\n  }\n": types.ChangeEmailDocument,
    "\n  mutation SendEmailLogined($email: String!) {\n    sendEmail(input: { email: $email }) {\n      ... on AnonymousUser {\n        email\n      }\n      ... on RecordAlreadyExistError {\n        table\n        data\n        message\n      }\n    }\n  }\n": types.SendEmailLoginedDocument,
    "\n  mutation VerifyEmailLogined($email: String!, $emailPin: String!) {\n    verifyEmail(input: { register_session_id: null, email: $email, email_pin: $emailPin }) {\n      ... on Email {\n        email\n        verified\n      }\n      ... on RecordNotFoundError {\n        table\n        keys\n        message\n      }\n    }\n  }\n": types.VerifyEmailLoginedDocument,
    "\n  mutation ChangePassword($password: String!) {\n    changePassword(input: { password: $password }) {\n      id\n      name\n      email {\n        email\n      }\n    }\n  }\n": types.ChangePasswordDocument,
    "\n  mutation ChangeUserInformation($name: String!) {\n    changeUserInformation(input: { name: $name }) {\n      id\n      name\n      email {\n        email\n      }\n    }\n  }\n": types.ChangeUserInformationDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($id: ID!, $password: String!) {\n    login(input: { id: $id, password: $password }) {\n      id\n      name\n      email {\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($id: ID!, $password: String!) {\n    login(input: { id: $id, password: $password }) {\n      id\n      name\n      email {\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($registerSessionId: ID!, $name: String!, $email: String!, $password: String!) {\n    register(input: { register_session_id: $registerSessionId, name: $name, email: $email, password: $password }) {\n      ... on User {\n        id\n        name\n        email {\n          email\n        }\n      }\n      ... on RecordNotFoundError {\n        table\n        keys\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($registerSessionId: ID!, $name: String!, $email: String!, $password: String!) {\n    register(input: { register_session_id: $registerSessionId, name: $name, email: $email, password: $password }) {\n      ... on User {\n        id\n        name\n        email {\n          email\n        }\n      }\n      ... on RecordNotFoundError {\n        table\n        keys\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendEmailRegisterSession($email: String!) {\n    sendEmail(input: { email: $email }) {\n      ... on AnonymousUser {\n        register_session_id\n        email\n      }\n      ... on RecordAlreadyExistError {\n        table\n        data\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SendEmailRegisterSession($email: String!) {\n    sendEmail(input: { email: $email }) {\n      ... on AnonymousUser {\n        register_session_id\n        email\n      }\n      ... on RecordAlreadyExistError {\n        table\n        data\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VerifyEmailRegisterSession($registerSessionId: ID, $email: String!, $emailPin: String!) {\n    verifyEmail(input: { register_session_id: $registerSessionId, email: $email, email_pin: $emailPin }) {\n      ... on Email {\n        email\n        verified\n      }\n      ... on RecordNotFoundError {\n        table\n        keys\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyEmailRegisterSession($registerSessionId: ID, $email: String!, $emailPin: String!) {\n    verifyEmail(input: { register_session_id: $registerSessionId, email: $email, email_pin: $emailPin }) {\n      ... on Email {\n        email\n        verified\n      }\n      ... on RecordNotFoundError {\n        table\n        keys\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ChangeEmail($email: String!) {\n    changeEmail(input: { email: $email }) {\n      ... on User {\n        id\n        name\n        email {\n          email\n        }\n      }\n      ... on RecordNotFoundError {\n        table\n        keys\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ChangeEmail($email: String!) {\n    changeEmail(input: { email: $email }) {\n      ... on User {\n        id\n        name\n        email {\n          email\n        }\n      }\n      ... on RecordNotFoundError {\n        table\n        keys\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendEmailLogined($email: String!) {\n    sendEmail(input: { email: $email }) {\n      ... on AnonymousUser {\n        email\n      }\n      ... on RecordAlreadyExistError {\n        table\n        data\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SendEmailLogined($email: String!) {\n    sendEmail(input: { email: $email }) {\n      ... on AnonymousUser {\n        email\n      }\n      ... on RecordAlreadyExistError {\n        table\n        data\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VerifyEmailLogined($email: String!, $emailPin: String!) {\n    verifyEmail(input: { register_session_id: null, email: $email, email_pin: $emailPin }) {\n      ... on Email {\n        email\n        verified\n      }\n      ... on RecordNotFoundError {\n        table\n        keys\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyEmailLogined($email: String!, $emailPin: String!) {\n    verifyEmail(input: { register_session_id: null, email: $email, email_pin: $emailPin }) {\n      ... on Email {\n        email\n        verified\n      }\n      ... on RecordNotFoundError {\n        table\n        keys\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ChangePassword($password: String!) {\n    changePassword(input: { password: $password }) {\n      id\n      name\n      email {\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ChangePassword($password: String!) {\n    changePassword(input: { password: $password }) {\n      id\n      name\n      email {\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ChangeUserInformation($name: String!) {\n    changeUserInformation(input: { name: $name }) {\n      id\n      name\n      email {\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ChangeUserInformation($name: String!) {\n    changeUserInformation(input: { name: $name }) {\n      id\n      name\n      email {\n        email\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;