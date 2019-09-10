import mongoose from 'mongoose'
import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLEnumType, GraphQLInt, GraphQLFloat } from 'graphql';
import { Record } from '../models'

const GenreType = new GraphQLEnumType({
    name: "GenreType",
    values: {
        house: { value: 'house' },
        deep_house: { value: 'deep house' },
        techno: { value: 'techno' },
    }
});

const RecordType = new GraphQLObjectType({
    name: "Record",
    fields: {
        _id: {
            type: GraphQLString
        },
        genre: {
            type: GenreType,
        },
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        record: {
            type: RecordType,
            args: {
                uid: {
                    type: GraphQLString
                }
            },
            resolve: async (parent, { uid }) => await Record.findOne({ uid }).exec()
        },
        allRecords: {
            type: new GraphQLList(RecordType),
            resolve: async () => await Record.find({}).exec()
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addRecord: {
            type: RecordType,
            args: {
                genre: {
                    type: GenreType
                }
            },
            resolve: async (parent, args) => {
                const { genre } = args;
                console.log(Record)
                const record = new Record({
                    _id: new mongoose.Types.ObjectId(),
                });

                return await record.save()
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})