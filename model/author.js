import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: {type: String, required: true}
}, { timestamps: true });

export const authorModel = mongoose.model('author', authorSchema);