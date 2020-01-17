const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
//define the queries and schema - you can use a schema.graphql as well
const typeDefs = gql `
  type Query {
    stock: [Stock]
  }
type Stock @key(fields: "bookId") {
    bookId: ID!
    price: Float!
    inStock: Int!
  }
`;
//mocked response
const mockedResponse = [{
  bookId: 1,
  price: "29.99",
  inStock: 215
 },
 {
  bookId: 2,
  price: "19.99",
  inStock: 45
 }
];
//resolvers to return the response, based on the previous defined query and to resolve references from third party calls
const resolvers = {
 Query: {
  stock() {
   return mockedResponse;
  }
 },
 Stock: {
  __resolveReference(reference) {
   return mockedResponse.find(x => parseInt(x.bookId) === parseInt(reference.bookId));
  }
 }
};
//Defining ApolloServer
const server = new ApolloServer({
 schema: buildFederatedSchema([{
  typeDefs,
  resolvers
 }])
});
//Running the server on port 9002
server.listen(9002).then(({
 url
}) => {
 console.log(`🚀 Server ready at ${url}`);
});