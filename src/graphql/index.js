import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } from 'graphql';
import { Coord } from '../models'

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
            resolve: async (parent, args) => {
                const { uid } = args

                return await Coord.findOne({ uid }).exec()
            }
        },
        allCoords: {
            type: new GraphQLList(CoordType),

            resolve: async () => await Coord.find({}).exec()
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addCoord: {
            type: CoordType,
            args: {
                uid: {
                    type: GraphQLString
                },
                valueX: {
                    type: GraphQLString
                },
                valueY: {
                    type: GraphQLString
                }
            },
            resolve: async (parent, args) => {
                const { uid, valueX, valueY } = args;
                const newCoord = new Coord({
                    uid,
                    valueX,
                    valueY
                });

                return await newCoord.save()
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})