import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLEnumType, GraphQLInt } from 'graphql';
import { Record } from '../models'

const WorkoutEnumType = new GraphQLEnumType({
    name: "WorkoutEnumType",
    values: {
        CARDIO: { value: 1 },
        STRENGTH: { value: 2 }
    }
});

const WorkoutType = new GraphQLObjectType({
    name: 'Workout',
    fields: {
        workoutType: {
            type: WorkoutEnumType
        },
        duration: {
            type: GraphQLString
        }
    }
})

const RecordType = new GraphQLObjectType({
    name: "Record",
    fields: {
        uid: {
            type: GraphQLString
        },
        workouts: new GraphQLList(WorkoutType),
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
                uid: {
                    type: GraphQLString
                },
                workoutType: {
                    type: GraphQLInt
                },
            },
            resolve: async (parent, args) => {
                const { uid, workoutType } = args;
                const createdAt = new Date();
                const updatedAt = new Date();

                const newRecord = new Record({
                    uid,
                    workoutType,
                    createdAt,
                    updatedAt
                });

                return await newRecord.save()
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})