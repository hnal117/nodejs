import mongoose from 'mongoose';
import { runInNewContext } from 'vm';

const Schema = mongoose.Schema;


let userSchema = new Schema({
    fullName: {
        first: {
            type: String,
            //required: [true, 'firstName is required field!'],
            maxlength: [30, 'firstName is too long!'],
            //trim: true,
            //UpperCase: true
        },
        last: {
            type: String,
            //required: [true, 'firstName is required field!'],
            maxlength: [30, 'firstName is too long!'],
            //trim: true,
            //UpperCase: true
        }
    },
    // refName: {
    //     type: String,
    //     required: [true, 'refName is required field!'],
    //     maxlength: [255, 'refName is too long!'],
    // },
    email: {
        type: String,
        required: [true, 'email is required field!'],
        maxlength: [30, 'email is too long!'],
        //minlength: [6, 'email is too short!']
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required field!'],
        maxlength: [255, 'password is too long!'],
        //minlength: [6, 'password is too short!']
    },
    gender: Boolean,
    deletedAt: {
        type: Date,
        default: null
    }
    // age: Number,
    // address: [String],
    // birthday: Date
});

let User = mongoose.model('User', userSchema);

function checkDeleted(_this) {
    const query = _this.getQuery();
    query['$or'] = [
        {
            deletedAt: null
        }
    ]
}

userSchema.pre('find', function () {
    checkDeleted(this);
});

userSchema.pre('findOne', function () {
    checkDeleted(this);
});

userSchema.pre('findById', function () {
    checkDeleted(this);
});

// userSchema.pre('save', async function (next) {
//     let user = await User.find({ email: this.email });
//     if (user) {
//         return next(new Error('exist'));
//     }
// });


export default User;