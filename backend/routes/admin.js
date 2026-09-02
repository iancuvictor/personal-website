import express from 'express';

const routes = express.Router();

routes.get('/', async (req, res) => {
    res.status(200).json({message: 'Success'})
    console.log('route hit');
})

export default routes;