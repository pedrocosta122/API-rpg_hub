import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({ error: 'Acesso negado. Nenhum token foi fornecido' });
    }

    const parts = authHeader.split(' ');

    if(parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Token mal formatado.' });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch(error) {
        return res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
};

export default authMiddleware;