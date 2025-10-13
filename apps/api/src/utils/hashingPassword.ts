import bcryptjs from "bcryptjs";

export const hashPassword = async (password: string) => {
  const hashed = await bcryptjs.hash(password, 12);
  return hashed;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const compare = await bcryptjs.compare(password, hashedPassword);
  return compare;
};
