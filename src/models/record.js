import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const recordSchema = new Schema({
    _id: Schema.Types.ObjectId,
    student_id: Number,
    scores: Object,
    class_id: Number
});

const Record = new model('Record', recordSchema);

export default Record;