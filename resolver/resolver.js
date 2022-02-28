import fs from "fs";
import { GraphQLUpload } from "graphql-upload";
import path from "path";

const resolvers = {
    Upload : GraphQLUpload,
	// QUERY
	Query: {
		books: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllBooks(),
		book: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getBookById(id),

		authors: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllAuthors(),
		author: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getAuthorById(id)
	},

	Book: {
		author: async ({ authorId }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAuthorById(authorId)
	},

	Author: {
		books: async ({ id }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getBooksByAuthorId(id)
	},

	// MUTATION
	Mutation: {
		createAuthor: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.createAuthor(args),
		createBook: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.createBook(args),
		deleteBook: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.deleteBook(args.id),
		editBook: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.editBook(args),
        singleUploadFile: async (parent, {file}) => {
            const {createReadStream, filename } = await file;
            const stream = await createReadStream();
            const __dirname = path.resolve(path.dirname(''));
            const pathName = path.join(__dirname, `public/images/${filename}`);
            await stream.pipe(fs.createWriteStream(pathName));
            return {
                url: `${process.env.BASE_URL_DEPLOY}/images/${filename}`
            }
        }
	}
}

export default resolvers;