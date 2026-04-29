import { prisma } from "../config/prisma.js";
import { HttpError } from "../utils/httpError.js";
import { verifyAccessToken } from "../utils/tokens.js";

export async function requireAuth(req, _res, next) {
  try {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      throw new HttpError(401, "Authentication required");
    }

    const payload = verifyAccessToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true
      }
    });

    if (!user) {
      throw new HttpError(401, "Invalid authentication token");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error.statusCode ? error : new HttpError(401, "Invalid authentication token"));
  }
}

export function requireAdmin(req, _res, next) {
  if (req.user?.role !== "ADMIN") {
    return next(new HttpError(403, "Admin access required"));
  }

  next();
}
