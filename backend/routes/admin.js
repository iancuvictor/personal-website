import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import requireAdmin from '../middleware/admin.js';

const routes = express.Router();



routes.post('/login', async (req, res) => {
    console.log('hit login route');
    const {username, password} = req.body;
    let passwordCheck = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)
    if (process.env.ADMIN_USERNAME === username && passwordCheck) {
        let adminToken = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.cookie('token', adminToken, { httpOnly: true, secure: false, sameSite: 'lax' })
        console.log('logged in');
        res.status(200).json({ message: 'Logged in' })
    } else {
        console.log('denied access');
        res.status(403).json({ message: 'Unauthorised.' })
    }
})

routes.get('/', requireAdmin, async (req, res) => {
    res.status(200).json({message: 'Authorized', isAdmin: true})
})

export default routes;