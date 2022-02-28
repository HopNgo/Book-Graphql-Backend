import { bookModel } from "../model/book.js";
import { authorModel } from "../model/author.js";

const mongoDataMethods = {
    getAllBooks: async () => await bookModel.find(),
    getAllAuthors: async () => await authorModel.find(),
    getBookById: async (id) => await bookModel.findById(id),
    getAuthorById: async (id) => await authorModel.findById(id),
    getBooksByAuthorId: async (authorId) => await bookModel.find({ authorId: authorId }),
    createBook: async args => {
        const newBook = new bookModel(args);
        return await newBook.save();
    },
    createAuthor: async args => {
        const newAuthor = new authorModel(args);
        return await newAuthor.save();
    },
    deleteBook: async id => await bookModel.findOneAndDelete({_id: id}),
    editBook: async args => await bookModel.findOneAndUpdate({_id: args.id}, args, {new: true})
}

export default mongoDataMethods;