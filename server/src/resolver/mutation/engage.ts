import * as engage from "src/case/engage";

const sendEmail = async (parent, args, contextValue, info) => {
  const rdbConnection = contextValue.rdbConnection;
  const mailer = contextValue.mailer;
  const { email } = input;
  const loginUser = contextValue.session.loginUser;

  return await engage.sendEmail(rdbConnection, mailer, loginUser, email);
}

const verifyEmail = async (parent, args, contextValue, info) => {
  const rdbConnection = contextValue.rdbConnection;
  const {
    register_session_id,
    email,
    email_pin,
  } = input;
  const loginUser = contextValue.session.loginUser;

  if (!register_session_id && !loginUser) {
    return ''; // TODO error
  }

  return await engage.verifyEmail(rdbConnection, loginUser, register_session_id, email, email_pin);
}

const register = async (parent, args, contextValue, info) => {
  const rdbConnection = contextValue.rdbConnection;
  const {
    register_session_id,
    name,
    email,
    password,
  } = input;

  return await engage.register(rdbConnection, register_session_id, name, email, password);
}

const login = async (parent, args, contextValue, info) => {
  const rdbConnection = contextValue.rdbConnection;
  const { email, password } = args;
  const user = await engage.login(rdbConnection, email, password);

  if (!user) {
    console.log('who are you!?');
    return null;
  }
  contextValue.session.loginUser = user;

  return user;
};

const changeUserInformation = async (parent, args, contextValue, info) => {
  const rdbConnection = contextValue.rdbConnection;
  const { name } = input;
  const loginUser = contextValue.session.loginUser;
  if (!loginUser) {
    return ''; //TODO error
  }
  return await engage.changeUserInformation(rdbConnection, loginUser, name);
}

const changePassword = async (parent, args, contextValue, info) => {
  const rdbConnection = contextValue.rdbConnection;
  const { password } = input;
  const loginUser = contextValue.session.loginUser;
  if (!loginUser) {
    return ''; //TODO error
  }
  return await engage.changePassword(rdbConnection, loginUser, password);
}

const changeEmail = async (parent, args, contextValue, info) => {
  const rdbConnection = contextValue.rdbConnection;
  const { email } = input;
  const loginUser = contextValue.session.loginUser;
  if (!loginUser) {
    return ''; //TODO error
  }
  return await engage.changeEmail(rdbConnection, loginUser, email);
}

export const engage = {
  sendEmail,
  verifyEmail,
  register,
  login,
  changeUserInformation,
  changePassword,
  changeEmail,
}
