import { getUserById } from "case/engage/user";

const loginUser = async (parent, args, contextValue, info) => {
  const loginUser = contextValue.session.loginUser;
  if (!loginUser) {
    return null;
  }
  return await getUserById(contextValue.rdbSource)(loginUser.user_id);
};

export default {
  loginUser,
}
