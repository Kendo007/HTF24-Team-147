import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        category: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        tags: {
            type: [String], // Array of strings
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
