// TODO..
const { buildSchema } = require('graphql');

const sdlSchema = `
  type Record {
    _id: String,
    genre: String
    title: String
  }
  type Query {
    getRecord(id: String!): Record
  }
`;

const graphqlSchema = buildSchema(sdlSchema);

export default graphqlSchema