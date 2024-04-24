import {
  SendEmailReturnResolvers,
  VerifyEmailReturnResolvers,
  RegisterReturnResolvers,
  EmailChangeReturnResolvers,
  ResolversParentTypes,
} from 'src/generated/graphql/resolver.js';
import { User, isAnonymousUser } from 'src/entity/user.js';
import { UserEmail } from 'src/entity/userEmail.js';
import { RecordNotFoundError, RecordAlreadyExistError } from 'src/infra/rdb.js';
import { MailSendError } from 'src/infra/mail.js';
import { ApolloContext } from 'src/infra/apollo.js';

export const SendEmailReturn: SendEmailReturnResolvers<ApolloContext, ResolversParentTypes['SendEmailReturn']> = {
  __resolveType(obj, contextValue, info) {
    if (obj instanceof RecordAlreadyExistError) {
      return 'RecordAlreadyExistError';
    }
    if (obj instanceof MailSendError) {
      return 'MailSendError';
    }
    if (obj instanceof User) {
      return 'User';
    }
    if (isAnonymousUser(obj)) {
      return 'AnonymousUser';
    }
    return null;
  },
};

export const VerifyEmailReturn: VerifyEmailReturnResolvers<ApolloContext, ResolversParentTypes['VerifyEmailReturn']> = {
  __resolveType(obj, contextValue, info) {
    if (obj instanceof RecordNotFoundError) {
      return 'RecordNotFoundError';
    }
    if (obj instanceof UserEmail) {
      return 'Email';
    }
    return null;
  },
};

export const RegisterReturn: RegisterReturnResolvers<ApolloContext, ResolversParentTypes['RegisterReturn']> = {
  __resolveType(obj, contextValue, info) {
    if (obj instanceof RecordNotFoundError) {
      return 'RecordNotFoundError';
    }
    if (obj instanceof User) {
      return 'User';
    }
    return null;
  },
};

export const EmailChangeReturn: EmailChangeReturnResolvers<ApolloContext, ResolversParentTypes['EmailChangeReturn']> = {
  __resolveType(obj, contextValue, info) {
    if (obj instanceof RecordNotFoundError) {
      return 'RecordNotFoundError';
    }
    if (obj instanceof User) {
      return 'User';
    }
    return null;
  },
};

export const EngageTypeResolvers = {
  SendEmailReturn,
  VerifyEmailReturn,
  RegisterReturn,
  EmailChangeReturn,
};
