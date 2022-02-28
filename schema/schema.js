
import { gql } from "apollo-server-express";

const typeDefs = gql`
    scalar Upload
	type Book {
		id: ID
		name: String
		genre: String
        imageUrl: String
		author: Author
	}
    type File {
        url: String
    }
	type Author {
		id: ID!
		name: String
		age: Int
		books: [Book]
	}
	# ROOT TYPE
	type Query {
		books: [Book]
		book(id: ID): Book
		authors: [Author]
		author(id: ID): Author
	}
	type Mutation {
		createAuthor(name: String, age: Int): Author
		createBook(name: String, genre: String, imageUrl: String, authorId: ID!): Book
		deleteBook(id: ID!): Book
		editBook(id: ID!, name: String, genre: String, imageUrl: String, authorId: ID!): Book
        singleUploadFile(file: Upload!): File
	}
`

export default typeDefs;