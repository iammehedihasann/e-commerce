import { prisma } from "../config/prisma.js";
import { verifyAccessToken } from "../utils/tokens.js";

export async function optionalAuth(req, _res, next) {
  try {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return next();
    }

    const payload = verifyAccessToken(token);
    req.user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true
      }
    });

    return next();
  } catch {
    return next();
  }
}
