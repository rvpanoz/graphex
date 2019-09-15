import { buildSchema } from 'graphql';

// Construct a schema, using GraphQL schema language using SDL
var schema = buildSchema(`
  type Query {
    getRecord: String
  }
`);

export default schema;