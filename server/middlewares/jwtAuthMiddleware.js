import jwt from 'jsonwebtoken';

function jwtauthMiddleware(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ error: "Token not found" });
    }
    const parts = authorization.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ error: "Invalid token format" });
    }

    const token = parts[1];
    if (!token) {
        return res.status(401).json({ error: "Invalid token format" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        res.status(401).json({ error: "Not Authenticated" });
    }
}

const generatetoken = (userdata) => {
    const secret_key = process.env.JWT_SECRET;
    return jwt.sign(userdata, secret_key, { expiresIn: "3000000" })
}


export { jwtauthMiddleware, generatetoken }