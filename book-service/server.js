const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
//define the queries and schema - you can use a schema.graphql as well
const typeDefs = gql `
  type Query {
    library: [Book]
  }
type Book @key(fields: "id") {
    id: ID!
    title: String
    author: String
    stock: Stock
  }
extend type Stock @key(fields: "bookId") {
    bookId: ID! @external
  }
`;
//mocked response
const mockedResponse = [{
  id: "1",
  title: "Harry Potter and the Sorcerer's stone",
  author: "J.K. Rowling"
 },
 {
  id: "2",
  title: "Game of Thrones",
  author: "George R. R. Martin"
 }
];
//resolvers to return the response, based on the previous defined query and to resolve references from third party calls
const resolvers = {
 Query: {
  library() {
   return mockedResponse;
  }
 },
 Book: {
  stock(book) {
   return {
    __typename: "Stock",
    bookId: book.id
   };
  }
 }
};
//defining Apollo Server
const server = new ApolloServer({
 schema: buildFederatedSchema([{
  typeDefs,
  resolvers
 }])
});
//Running the server on port 9001
server.listen(9001).then(({
 url
}) => {
 console.log(`🚀 Server ready at ${url}`);
});