import { Schema, model } from 'mongoose';

const education = new Schema({
    school: {type: String, required: true},
    city: {type: String, required: true},
    title: {type: String, required: true},
    startYear: {type: Number, required: true},
    endYear: {type: Number, required: true},
    description: {type: String, required: true},
});

const Education = model('education', education);
export default Education;