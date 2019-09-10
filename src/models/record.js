import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const recordSchema = new Schema({
    _id: Schema.Types.ObjectId,
    genre: String,
    createdAt: Date,
    updatedAt: Date
});

const Record = new model('Record', recordSchema);

export default Record;