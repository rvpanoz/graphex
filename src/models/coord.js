import mongoose from 'mongoose';

const coordSchema = new mongoose.Schema({
    valueX: String,
    valueY: String
});

export default mongoose.model('Coord', coordSchema);