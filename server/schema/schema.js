const graphql = require("graphql");
const _ = require("lodash");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

// Dummy Data
let books = [
    {
        name: "abc",
        genre: "abc",
        id: "1",
        authorID: "1"
    },
    {
        name: "def",
        genre: "sdsd",
        id: "2",
        authorID: "2"
    },
    {
        name: "sadfd",
        genre: "fdfdsf",
        id: "3",
        authorID: "3"
    }
];

let authors = [
    {
        name: "viraj",
        age: 22,
        id: "1"
    },
    {
        name: "biswa",
        age: 22,
        id: "2"
    },
    {
        name: "test",
        age: 123,
        id: "3"
    }
];

// data type
const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);

                return _.find(authors, { id: parent.authorID });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorID: parent.id });
            }
        }
    })
});

// End points
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                // get data from source or DB

                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
