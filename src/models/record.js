import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cardioSchema = new Schema({
    _id: Schema.Types.ObjectId,
    duration: String,
    km: String,
});

const strengthSchema = new Schema({
    _id: Schema.Types.ObjectId,
    sets: Number,
    reps: Number
});

const workoutSchema = new Schema({
    _id: Schema.Types.ObjectId,
    cardioType: [{ type: Schema.Types.ObjectId, ref: 'Cardio' }],
    strengthType: [{ type: Schema.Types.ObjectId, ref: 'Strength' }]
})

const recordSchema = new Schema({
    uid: Schema.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
    workouts: [{ type: Schema.Types.ObjectId, ref: 'Workout' }]
});

export const CardioModel = new model('Cardio', cardioSchema);
export const StrengthModel = new model('Strength', strengthSchema);
export const WorkoutModel = new model('Workout', workoutSchema);
export const RecordModel = new model('Record', recordSchema);