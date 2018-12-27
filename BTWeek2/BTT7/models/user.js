import mongoose from 'mongoose';

const Schema = mongoose.Schema;


let userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is required field!'],
        maxlength: [255, 'firstName is too long!'],
        //trim: true,
        //UpperCase: true
    },
    refName: {
        type: String,
        required: [true, 'refName is required field!'],
        maxlength: [255, 'refName is too long!'],
    },
    email: {
        type: String,
        required: [true, 'email is required field!'],
        maxlength: [255, 'email is too long!'],
        minlength: [6, 'email is too short!']
    },
    password: {
        type: String,
        required: [true, 'password is required field!'],
        maxlength: [255, 'password is too long!'],
        minlength: [6, 'password is too short!']
    },
    gender: Boolean,
    isDelete: {
        type: Boolean,
        default: false
    }
    // age: Number,
    // address: [String],
    // birthday: Date
});

let User = mongoose.model('User', userSchema);

userSchema.pre('find', function () {
    const query = this.getQuery();
    query['$or'] = [
        {
            isDelete: false
        },
        {
            isDelete: null
        }
    ]
});

userSchema.pre('findOne', function () {
    const query = this.getQuery();
    query['$or'] = [
        {
            isDelete: false
        },
        {
            isDelete: null
        }
    ]
});
export default User;