import { mergeResolvers } from 'merge-graphql-schemas';
import record from './record'

const resolvers = [
    record
];

export default mergeResolvers(resolvers)