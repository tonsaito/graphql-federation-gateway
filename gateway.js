const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require("@apollo/gateway");
// Initialize an ApolloGateway instance and pass it an array of implementing
// service names and URLs
const gateway = new ApolloGateway({
 serviceList: [{
   name: 'book',
   url: 'http://localhost:9001'
  },
  {
   name: 'stock',
   url: 'http://localhost:9002'
  },
  // more services
 ],
});
// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
 gateway,
 // Disable subscriptions (not currently supported with ApolloGateway)
 subscriptions: false,
});
server.listen(9000).then(({
 url
}) => {
 console.log(`🚀 Server ready at ${url}`);
});