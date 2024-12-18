import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        projManager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        devRequirements: {
            type: String,
        },
        image: {
            type: String,
        },
        tags: {
            type: [String],
        },
        initialAmount: {
            type: Number,
            required: true,
        },
        currentAmount: {
            type: Number,
            required: true,
        },
        lastApplicationDate: {
            type: Date,
            required: true,
        },
        completionDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
