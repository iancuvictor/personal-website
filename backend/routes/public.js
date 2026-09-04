import express from 'express';
import AboutDescription from '../schemas/aboutDescription.js';
import Project from '../schemas/project.js';

const routes = express.Router();

routes.get('/about', async (req, res) => {
    const data = {};

    let aboutDescription = await AboutDescription.find();
    
    console.log(aboutDescription);
    res.status(200).json({message: 'Success'})
})

routes.get('/projects', async (req, res) => {
    try{
        let data = await Project.find();
        res.status(200).json(data);
    } catch(err) {
        res.status(500).json({message: 'An error has occured'});
    }
})

routes.get('/project/:slug', async (req, res) => {
    let data = await Project.findOne({slug: req.params.slug})

    if(data === undefined) res.status(404).json({message: 'Project data not found'})
        
    res.status(200).json(data)
})

export default routes;