import { getUser } from "src/case/engage/login";

const loginUser = async (parent, args, contextValue, info) => {
  const rdbConnection = contextValue.rdbConnection;
  const loginUser = contextValue.session.loginUser;
  return await getUser(rdbConnection, loginUser.id);
};

export const engage = {
  loginUser,
}
