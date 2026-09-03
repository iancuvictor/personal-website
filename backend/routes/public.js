import express from 'express';
import AboutDescription from '../schemas/aboutDescription';

const routes = express.Router();

routes.get('/about', async (req, res) => {
    const data = {};

    let aboutDescription = await AboutDescription.find();
    
    console.log(aboutDescription);
    res.status(200).json({message: 'Success'})
})

export default routes;