export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Acceso denegado. No hay token." });
    }
    const decoded = admin.auth().verifyIdToken(token);
    if (decoded) {
      next();
    }

    return res.status(200).json({ message: "Auth verificado" });
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};
