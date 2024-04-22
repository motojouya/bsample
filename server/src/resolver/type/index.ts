import { User } from 'src/resolver/type/user.js';
import { Email } from 'src/resolver/type/userEmail.js';
import { EngageTypeResolvers } from 'src/resolver/type/engage.js';

export const types = {
  User,
  Email,
  ...EngageTypeResolvers,
};
