import { GraphQLObjectType, GraphQLString, GraphQLSchema } from 'graphql';

const CoordType = new GraphQLObjectType({
    name: "Coord",
    fields: {
        uid: {
            type: GraphQLString
        },
        valueX: {
            type: GraphQLString
        },
        valueY: {
            type: GraphQLString
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        coord: {
            type: CoordType,
            args: {
                uid: {
                    type: GraphQLString
                }
            },
            resolve: (parent, args) => {
                // get data from mongoose api
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery
})