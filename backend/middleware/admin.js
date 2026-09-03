import jwt from 'jsonwebtoken';

export default function requireAdmin(req, res, next) {
    const token = req.cookies?.token;
    if (!token) return res.status(200).json({ message: 'Unauthorized' })
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next();
    } catch {
        res.status(403).json({ message: 'Unauthorized' })
        console.log('not access')
    }
}