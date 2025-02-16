import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig.js";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies?.access_token;
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. No hay token." });
  }
  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};
