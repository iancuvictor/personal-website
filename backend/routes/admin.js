import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import requireAdmin from '../middleware/admin.js';
import AboutDescription from '../schemas/aboutDescription';

const routes = express.Router();


routes.get('/', requireAdmin, async (req, res) => {
    res.status(200).json({message: 'Authorized', isAdmin: true})
})

routes.post('/login', async (req, res) => {
    const {username, password} = req.body;
    let passwordCheck = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)
    if (process.env.ADMIN_USERNAME === username && passwordCheck) {
        let adminToken = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.cookie('token', adminToken, { httpOnly: true, secure: false, sameSite: 'lax' })
        res.status(200).json({ message: 'Logged in' })
    } else {
        console.log('denied access');
        res.status(403).json({ message: 'Unauthorised.' })
    }
})

routes.post('/logout', requireAdmin, async (req, res) => {
    try{
        res.clearCookie('token')
        res.status(200).json({message: 'Logged Out'})
    } catch(err) {
        res.status(403).json({message: 'Unauthorized'})
    }
})

routes.put('/updateAboutText', requireAdmin, async (req, res) => {
    let description = await AboutDescription.find()[0];
    try{

        if(description !== undefined){
            await AboutDescription.updateOne({_id: description[0]._id}, {$set: req.body})
            res.status(200).json({message: 'Text updated'})
        } else {
            await AboutDescription.create({text: req.body.text});
            res.status(200).json({message: 'Text updated'})
        }
    } catch(err) {
        res.json({message: 'An error has occured'});
        console.log(err);
    }
})

export default routes;