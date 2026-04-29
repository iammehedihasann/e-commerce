import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma.js";
import { env } from "../../config/env.js";
import { HttpError } from "../../utils/httpError.js";
import { signAccessToken, signRefreshToken } from "../../utils/tokens.js";

const publicUserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
  phone: true,
  createdAt: true
};

function toAuthResponse(user) {
  return {
    user,
    accessToken: signAccessToken(user),
    refreshToken: signRefreshToken(user)
  };
}

export async function registerUser(input) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });

  if (existing) {
    throw new HttpError(409, "Email is already registered");
  }

  const passwordHash = await bcrypt.hash(input.password, env.BCRYPT_SALT_ROUNDS);
  const user = await prisma.user.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      passwordHash
    },
    select: publicUserSelect
  });

  return toAuthResponse(user);
}

export async function loginUser(input) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email: input.email }
  });

  if (!userWithPassword) {
    throw new HttpError(401, "Invalid email or password");
  }

  const isValid = await bcrypt.compare(input.password, userWithPassword.passwordHash);

  if (!isValid) {
    throw new HttpError(401, "Invalid email or password");
  }

  const { passwordHash: _passwordHash, ...user } = userWithPassword;
  return toAuthResponse(user);
}
