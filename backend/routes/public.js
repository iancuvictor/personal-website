import express from 'express';

const routes = express.Router();

routes.get('/aboutData', async (req, res) => {
    console.log('route hit');
    res.status(200).json({message: 'Success'})
})

export default routes;