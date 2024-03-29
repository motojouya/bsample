import * as engage from "src/case/engage";

const sendEmail = async (parent, args, contextValue, info) => {
  const rdbSource = contextValue.rdbSource;
  const mailer = contextValue.mailer;
  const { email } = input;
  const loginUser = contextValue.session.loginUser;

  return await engage.sendEmail(rdbSource, mailer, loginUser, email);
}

const verifyEmail = async (parent, args, contextValue, info) => {
  const rdbSource = contextValue.rdbSource;
  const {
    register_session_id,
    email,
    email_pin,
  } = input;
  const loginUser = contextValue.session.loginUser;

  if (!register_session_id && !loginUser) {
    return ''; // TODO error
  }

  return await engage.verifyEmail(rdbSource, loginUser, register_session_id, email, email_pin);
}

const register = async (parent, args, contextValue, info) => {
  const rdbSource = contextValue.rdbSource;
  const {
    register_session_id,
    name,
    email,
    password,
  } = input;

  return await engage.register(rdbSource, register_session_id, name, email, password);
}

const login = async (parent, args, contextValue, info) => {
  const rdbSource = contextValue.rdbSource;
  const { email, password } = args;
  const user = await engage.login(rdbSource, email, password);

  if (!user) {
    console.log('who are you!?');
    return null;
  }
  contextValue.session.loginUser = user;

  return user;
};

const changeUserInformation = async (parent, args, contextValue, info) => {
  const rdbSource = contextValue.rdbSource;
  const { name } = input;
  const loginUser = contextValue.session.loginUser;
  if (!loginUser) {
    return ''; //TODO error
  }
  return await engage.changeUserInformation(rdbSource, loginUser, name);
}

const changePassword = async (parent, args, contextValue, info) => {
  const rdbSource = contextValue.rdbSource;
  const { password } = input;
  const loginUser = contextValue.session.loginUser;
  if (!loginUser) {
    return ''; //TODO error
  }
  return await engage.changePassword(rdbSource, loginUser, password);
}

const changeEmail = async (parent, args, contextValue, info) => {
  const rdbSource = contextValue.rdbSource;
  const { email } = input;
  const loginUser = contextValue.session.loginUser;
  if (!loginUser) {
    return ''; //TODO error
  }
  return await engage.changeEmail(rdbSource, loginUser, email);
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
