import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: String,
    refName: String,
    email: String,
    password: String,
    gender: Boolean
    // age: Number,
    // address: [String],
    // birthday: Date
});

let User = mongoose.model('User', userSchema);

export default User;