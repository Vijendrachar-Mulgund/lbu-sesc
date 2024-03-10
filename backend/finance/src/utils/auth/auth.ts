import * as bcrypt from 'bcrypt';

// Hash Password
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, parseInt(process.env.PASSWORD_SALT_ROUNDS));
};

export const comparePassword = async (
  candidatePassword: string,
  userPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(candidatePassword, userPassword);
};
