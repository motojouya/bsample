import engage from "src/case/engage/index.js";

export class AuthenticationError extends Error {
  constructor(
    readonly userKey: string,
    readonly message: string,
  ) { super(); }
}

const sendEmail = async (parent, args, contextValue, info) => {
  const rdbSource = contextValue.rdbSource;
  const mailer = contextValue.mailer;
  const { input: { email } } = args;
  const loginUser = contextValue.session.loginUser;

  return await engage.sendEmail(rdbSource, mailer, loginUser, email);
}

const verifyEmail = async (parent, args, contextValue, info) => {
  const rdbSource = contextValue.rdbSource;
  const {
    input: {
      register_session_id,
      email,
      email_pin,
    }
  } = args;
  const loginUser = contextValue.session.loginUser;

  if (!register_session_id && !loginUser) {
    return new AuthenticationError(register_session_id, 'not authenticated');
  }

  return await engage.verifyEmail(rdbSource, loginUser, register_session_id, email, email_pin);
}

const register = async (parent, args, contextValue, info) => {
  const rdbSource = contextValue.rdbSource;
  const {
    input: {
      register_session_id,
      name,
      email,
      password,
    }
  } = args;

  return await engage.register(rdbSource, register_session_id, name, email, password);
}

const login = async (parent, args, contextValue, info) => {
  const rdbSource = contextValue.rdbSource;
  const { input: { email, password } } = args;
  const user = await engage.login(rdbSource, email, password);

  if (!user) {
    return new AuthenticationError(email, 'who are you!?');
  }
  contextValue.session.loginUser = user;

  return user;
};

const changeUserInformation = async (parent, args, contextValue, info) => {
  const rdbSource = contextValue.rdbSource;
  const { input: { name } } = args;
  const loginUser = contextValue.session.loginUser;
  if (!loginUser) {
    return new AuthenticationError(null, 'who are you!?');
  }
  return await engage.changeUserInformation(rdbSource, loginUser, name);
}

const changePassword = async (parent, args, contextValue, info) => {
  const rdbSource = contextValue.rdbSource;
  const { input: { password } } = args;
  const loginUser = contextValue.session.loginUser;
  if (!loginUser) {
    return new AuthenticationError(null, 'who are you!?');
  }
  return await engage.changePassword(rdbSource, loginUser, password);
}

const changeEmail = async (parent, args, contextValue, info) => {
  const rdbSource = contextValue.rdbSource;
  const { input: { email } } = args;
  const loginUser = contextValue.session.loginUser;
  if (!loginUser) {
    return new AuthenticationError(null, 'who are you!?');
  }
  return await engage.changeEmail(rdbSource, loginUser, email);
}

export default {
  sendEmail,
  verifyEmail,
  register,
  login,
  changeUserInformation,
  changePassword,
  changeEmail,
}
