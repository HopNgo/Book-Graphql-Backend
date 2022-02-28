import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genre: { type: String, required: true },
    authorId: { type: String, required: true },
    imageUrl: { type: String, required: true }
}, { timestamps: true });

export const bookModel = mongoose.model('book', bookSchema);