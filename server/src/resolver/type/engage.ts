import {
  SendEmailReturnResolvers,
  VerifyEmailReturnResolvers,
  RegisterReturnResolvers,
  EmailChangeReturnResolvers,
} from 'src/generated/graphql/resolver.js';
import { User } from 'src/entity/user.js';
import { UserEmail } from 'src/entity/userEmail.js';
import { RecordNotFoundError, RecordAlreadyExistError } from 'src/infra/rdb.js';
import { MailSendError } from 'src/infra/mail.js';
import { AnonymousUser, isAnonymousUser } from 'src/case/engage/sendEmail.js';

export const SendEmailReturn: SendEmailReturnResolvers = {
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

export const VerifyEmailReturn: VerifyEmailReturnResolvers = {
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

export const RegisterReturn: RegisterReturnResolvers = {
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

export const EmailChangeReturn: EmailChangeReturnResolvers = {
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
