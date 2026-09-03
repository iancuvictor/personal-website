import { Schema, model } from 'mongoose';

const project = new Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true, unique: true, lowercase: true},
    url: {type: String, required: false},
    github: {type: String, required: false},
    publishedAt: {type: Date, required: false},
    description: {type: String, required: true},
    highlighted: {type: Boolean, required: false, default: false},
    techStack: {type: [String], default: []},
    photos: [
        {
            path: {type: String, required: false}
        }
    ]
});

const Project = model('project', project);
export default Project;