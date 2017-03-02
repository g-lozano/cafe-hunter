
import mongoose, { Schema } from 'mongoose';

const Cafe = new Schema({
    cafe_id: String,
    going_users_id: [String],
});

export default mongoose.model('Cafe', Cafe);