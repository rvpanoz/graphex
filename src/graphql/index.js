import mongoose from 'mongoose'
import { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLList, 
    GraphQLEnumType
} from 'graphql';
import { Record } from '../models'
import { buildSchema } from 'graphql';

const GenreEnumType = new GraphQLEnumType({
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
        title: {
            type: GraphQLString
        },
        genre: {
            type: GenreEnumType,
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
        findRecord: {
            type: RecordType,
            args: {
                title: {
                    type: GraphQLString
                },
                genre: {
                    type: GenreEnumType
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
                title: {
                    type: GraphQLString
                },
                genre: {
                    type: GenreEnumType
                }
            },
            resolve: async (parent, args) => {
                const { title, genre } = args;
                const now = new Date();

                const record = new Record({
                    _id: new mongoose.Types.ObjectId(),
                    title,
                    genre,
                    createdAt: now.toString(),
                    updatedAt: now.toString()
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