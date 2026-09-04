import { Schema, model } from 'mongoose';

const aboutDescription = new Schema({
    text: {type: String, required: true}
});

const AboutDescription = model('aboutDescription', aboutDescription);
export default AboutDescription;